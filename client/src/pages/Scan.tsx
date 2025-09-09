import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Gem, Scroll, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import jsQR from "jsqr";

const Scan = () => {
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>("");
  const [, setLocation] = useLocation();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number>();

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsScanning(false);
  }, []);

  const scanFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || !isScanning) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (qrCode) {
        const url = qrCode.data;
        try {
          const urlParts = url.split('/');
          const slug = urlParts[urlParts.length - 1];
          if (slug) {
            stopCamera();
            setLocation(`/artifacts/${slug}`);
            return;
          }
        } catch (err) {
          console.error('Error parsing QR code URL:', err);
        }
      }
    }
    
    animationRef.current = requestAnimationFrame(scanFrame);
  }, [isScanning, stopCamera, setLocation]);

  const handleStartCamera = async () => {
    setError("");
    setIsScanning(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanFrame();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setIsScanning(false);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError("Camera access denied. Please allow camera permissions and try again.");
        } else if (err.name === 'NotFoundError') {
          setError("No camera found on this device.");
        } else {
          setError("Failed to access camera. Please try again.");
        }
      } else {
        setError("Failed to access camera. Please try again.");
      }
    }
  };

  const handleRetry = () => {
    setError("");
    handleStartCamera();
  };

  const handleSubmitManualCode = () => {
    if (manualCode.trim()) {
      try {
        const urlParts = manualCode.trim().split('/');
        const slug = urlParts[urlParts.length - 1];
        if (slug) {
          setLocation(`/artifacts/${slug}`);
          setManualCode("");
        }
      } catch (err) {
        console.error('Error processing manual code:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const recentScans = [
    {
      id: 1,
      artifactName: "Ancient Vase",
      timestamp: "2 hours ago",
      icon: Gem,
    },
    {
      id: 2,
      artifactName: "Medieval Manuscript",
      timestamp: "1 day ago",
      icon: Scroll,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-scan-title">
          Scan Artifact
        </h1>
        <p className="text-muted-foreground" data-testid="text-scan-subtitle">
          Point your camera at a QR code to discover new artifacts
        </p>
      </div>

      {/* Scanner Interface */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="aspect-square max-w-md mx-auto bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden">
            {!isScanning && !error && (
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
                <p className="text-muted-foreground mb-4" data-testid="text-camera-placeholder">
                  Camera will appear here
                </p>
                <Button
                  onClick={handleStartCamera}
                  data-testid="button-enable-camera"
                >
                  Enable Camera
                </Button>
              </div>
            )}
            
            {error && (
              <div className="text-center p-4">
                <AlertCircle className="h-16 w-16 text-destructive mb-4 mx-auto" />
                <p className="text-destructive mb-4" data-testid="text-camera-error">
                  {error}
                </p>
                <Button
                  onClick={handleRetry}
                  variant="destructive"
                  data-testid="button-retry-camera"
                >
                  Tap to Retry
                </Button>
              </div>
            )}
            
            {isScanning && (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  autoPlay
                  playsInline
                  muted
                  data-testid="video-camera-feed"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                {/* Scanning overlay */}
                <div className="absolute inset-4 border-2 border-accent rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent"></div>
                </div>
                {/* Stop button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Button
                    onClick={stopCamera}
                    variant="secondary"
                    size="sm"
                    data-testid="button-stop-camera"
                  >
                    Stop Camera
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Manual Input Option */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4" data-testid="text-manual-entry-title">
            Manual Code Entry
          </h3>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter artifact code manually"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmitManualCode()}
              data-testid="input-manual-code"
            />
            <Button
              onClick={handleSubmitManualCode}
              variant="secondary"
              data-testid="button-submit-manual-code"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Scans */}
      <div>
        <h3 className="text-lg font-semibold mb-4" data-testid="text-recent-scans-title">
          Recent Scans
        </h3>
        <div className="grid gap-4">
          {recentScans.map((scan) => {
            const Icon = scan.icon;
            return (
              <Card key={scan.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                        <Icon className="text-accent-foreground" />
                      </div>
                      <div>
                        <div className="font-medium" data-testid={`text-scan-name-${scan.id}`}>
                          {scan.artifactName}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`text-scan-time-${scan.id}`}>
                          {scan.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="text-muted-foreground">→</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scan;
