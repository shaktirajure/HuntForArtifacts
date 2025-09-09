import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List } from "lucide-react";

const Artifact = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("date");

  const artifacts = [
    {
      id: 1,
      name: "Ancient Egyptian Vase",
      description: "A ceremonial vase from the New Kingdom period with intricate hieroglyphic carvings.",
      rarity: "Rare",
      location: "Cairo Museum",
      points: 150,
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Illuminated Manuscript",
      description: "A beautifully decorated medieval text with gold leaf illuminations and ornate borders.",
      rarity: "Epic",
      location: "British Library",
      points: 300,
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Greek Marble Fragment",
      description: "A fragment from a classical Greek statue, showcasing the mastery of ancient sculptors.",
      rarity: "Common",
      location: "Acropolis Museum",
      points: 75,
      date: "3 days ago",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Jade Dragon Pendant",
      description: "A finely carved jade pendant from the Han Dynasty featuring a traditional dragon motif.",
      rarity: "Rare",
      location: "Forbidden City",
      points: 200,
      date: "5 days ago",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Epic": return "bg-primary text-primary-foreground";
      case "Rare": return "bg-accent text-accent-foreground";
      case "Common": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-artifacts-title">
            My Artifacts
          </h1>
          <p className="text-muted-foreground" data-testid="text-artifacts-subtitle">
            Your personal collection of discovered treasures
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40" data-testid="select-sort-by">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="rarity">Sort by Rarity</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border border-input rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
              data-testid="button-view-grid"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary" data-testid="text-stat-total">47</div>
            <div className="text-sm text-muted-foreground">Total Artifacts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent" data-testid="text-stat-rare">8</div>
            <div className="text-sm text-muted-foreground">Rare Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary" data-testid="text-stat-sets">3</div>
            <div className="text-sm text-muted-foreground">Complete Sets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary" data-testid="text-stat-value">₹15,420</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Artifact Grid */}
      <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {artifacts.map((artifact) => (
          <Card key={artifact.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardContent className="p-0">
              {viewMode === "grid" && (
                <img
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(artifact.rarity)}`}>
                    {artifact.rarity}
                  </span>
                  <span className="text-xs text-muted-foreground" data-testid={`text-artifact-date-${artifact.id}`}>
                    {artifact.date}
                  </span>
                </div>
                <h3 className="font-semibold mb-2" data-testid={`text-artifact-name-${artifact.id}`}>
                  {artifact.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`text-artifact-description-${artifact.id}`}>
                  {artifact.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" data-testid={`text-artifact-location-${artifact.id}`}>
                    {artifact.location}
                  </span>
                  <span className="text-lg font-bold text-primary" data-testid={`text-artifact-points-${artifact.id}`}>
                    +{artifact.points} pts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Artifact;
