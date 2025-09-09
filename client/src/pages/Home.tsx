import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Gem, MapPin } from "lucide-react";
import { Link } from "wouter";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
              Discover Hidden Treasures
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90" data-testid="text-hero-subtitle">
              Scan, explore, and collect artifacts in the ultimate treasure hunting experience
            </p>
            <Link href="/hunts">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
                data-testid="button-start-hunt"
              >
                Start Your Hunt
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="text-features-title">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="text-2xl text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid="text-feature-scan-title">
                  QR Code Scanning
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-scan-description">
                  Quickly scan codes to discover artifacts and unlock new adventures
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem className="text-2xl text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid="text-feature-collection-title">
                  Artifact Collection
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-collection-description">
                  Build your personal collection of discovered treasures and rare finds
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-2xl text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid="text-feature-hunts-title">
                  Treasure Hunts
                </h3>
                <p className="text-muted-foreground" data-testid="text-feature-hunts-description">
                  Join exciting hunts and compete with other treasure hunters worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary" data-testid="text-stat-artifacts">
                1,247
              </div>
              <div className="text-muted-foreground">Artifacts Found</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent" data-testid="text-stat-hunts">
                23
              </div>
              <div className="text-muted-foreground">Active Hunts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary" data-testid="text-stat-hunters">
                892
              </div>
              <div className="text-muted-foreground">Hunters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary" data-testid="text-stat-locations">
                156
              </div>
              <div className="text-muted-foreground">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
