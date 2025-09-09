import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Camera, Gem, Scroll } from "lucide-react";

const Scan = () => {
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleStartCamera = () => {
    setIsScanning(true);
    // TODO: Implement camera QR code scanning
    setTimeout(() => setIsScanning(false), 3000);
  };

  const handleSubmitManualCode = () => {
    if (manualCode.trim()) {
      // TODO: Process manual code entry
      console.log("Processing code:", manualCode);
      setManualCode("");
    }
  };

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
          <div className="aspect-square max-w-md mx-auto bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center relative">
            <div className="text-center">
              <Camera className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
              <p className="text-muted-foreground mb-4" data-testid="text-camera-placeholder">
                Camera will appear here
              </p>
              <Button
                onClick={handleStartCamera}
                disabled={isScanning}
                data-testid="button-enable-camera"
              >
                {isScanning ? "Scanning..." : "Enable Camera"}
              </Button>
            </div>
            
            {/* Scanning overlay */}
            <div className="absolute inset-4 border-2 border-accent rounded-lg opacity-50 pointer-events-none" />
            {isScanning && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
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
