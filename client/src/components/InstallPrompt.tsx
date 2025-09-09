import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user has dismissed the prompt recently
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (dismissed) {
      const dismissTime = parseInt(dismissed);
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
      if (Date.now() - dismissTime < oneWeek) {
        return;
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show our custom install prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
  };

  // Don't show if already installed or no prompt event
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50">
      <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Download className="h-5 w-5 mr-2" />
                <h3 className="font-semibold text-sm">Install Artifact Hunter</h3>
              </div>
              <p className="text-xs opacity-90 mb-3">
                Add to your home screen for quick access and offline browsing
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  variant="secondary"
                  className="text-xs"
                  data-testid="button-install-app"
                >
                  Install
                </Button>
                <Button
                  onClick={handleDismiss}
                  size="sm"
                  variant="outline"
                  className="text-xs border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                  data-testid="button-dismiss-install"
                >
                  Not now
                </Button>
              </div>
            </div>
            <Button
              onClick={handleDismiss}
              size="sm"
              variant="ghost"
              className="p-1 h-auto text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-close-install"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallPrompt;