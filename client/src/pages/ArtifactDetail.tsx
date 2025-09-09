import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Award, Share2 } from "lucide-react";
import { Link, useParams } from "wouter";

const ArtifactDetail = () => {
  const { slug } = useParams();

  // Mock artifact data - in a real app this would come from an API
  const artifact = {
    id: slug,
    name: "Ancient Egyptian Vase",
    description: "A ceremonial vase from the New Kingdom period with intricate hieroglyphic carvings depicting scenes from the Book of the Dead. This remarkable piece showcases the artistic mastery of ancient Egyptian craftsmen and provides valuable insights into their religious beliefs and burial practices.",
    rarity: "Rare",
    location: "Cairo Museum, Egypt",
    discoveryDate: "2024-01-15",
    points: 150,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    curator: "Dr. Sarah Johnson",
    period: "New Kingdom (1550-1077 BCE)",
    materials: ["Ceramic", "Gold Leaf", "Hieroglyphic Paint"],
    dimensions: "Height: 32cm, Diameter: 18cm",
    significance: "This vase represents one of the finest examples of New Kingdom ceremonial pottery, featuring rarely preserved original paint and gold leaf detailing.",
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Epic": return "bg-primary text-primary-foreground";
      case "Rare": return "bg-accent text-accent-foreground";
      case "Common": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/artifacts">
          <Button variant="ghost" className="mb-4" data-testid="button-back-artifacts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Artifacts
          </Button>
        </Link>
      </div>

      {/* Artifact Header */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={artifact.image}
            alt={artifact.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            data-testid="img-artifact-main"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge className={getRarityColor(artifact.rarity)} data-testid="badge-artifact-rarity">
              {artifact.rarity}
            </Badge>
            <div className="text-2xl font-bold text-primary" data-testid="text-artifact-points">
              +{artifact.points} pts
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4" data-testid="text-artifact-name">
            {artifact.name}
          </h1>
          
          <p className="text-muted-foreground mb-6" data-testid="text-artifact-description">
            {artifact.description}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
              <span data-testid="text-artifact-location">{artifact.location}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
              <span data-testid="text-artifact-discovery-date">
                Discovered: {new Date(artifact.discoveryDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-muted-foreground" />
              <span data-testid="text-artifact-period">{artifact.period}</span>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button className="flex-1" data-testid="button-collect-artifact">
              Collect Artifact
            </Button>
            <Button variant="outline" data-testid="button-share-artifact">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Artifact Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-details-title">
              Artifact Details
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Curator</div>
                <div data-testid="text-artifact-curator">{artifact.curator}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Materials</div>
                <div data-testid="text-artifact-materials">{artifact.materials.join(", ")}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Dimensions</div>
                <div data-testid="text-artifact-dimensions">{artifact.dimensions}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-significance-title">
              Historical Significance
            </h3>
            <p className="text-muted-foreground" data-testid="text-artifact-significance">
              {artifact.significance}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Success Message */}
      <Card className="mt-8 bg-accent/10 border-accent">
        <CardContent className="p-6 text-center">
          <Award className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2" data-testid="text-scan-success-title">
            Artifact Successfully Scanned!
          </h3>
          <p className="text-muted-foreground" data-testid="text-scan-success-message">
            You've successfully discovered this artifact and earned {artifact.points} points. 
            The artifact has been added to your collection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtifactDetail;