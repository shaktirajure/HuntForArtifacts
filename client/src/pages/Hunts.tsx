import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, Clock, Plus, Crown } from "lucide-react";

const Hunts = () => {
  const huntCategories = [
    { id: "all", label: "All Hunts", active: true },
    { id: "active", label: "Active", active: false },
    { id: "completed", label: "Completed", active: false },
    { id: "featured", label: "Featured", active: false },
  ];

  const hunts = [
    {
      id: 1,
      title: "Roman Empire Quest",
      description: "Explore the remnants of the Roman Empire across Italy and Greece.",
      status: "Active",
      timeLeft: "3 days left",
      participants: 89,
      reward: "₹5,000",
      progress: 60,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Medieval Mysteries",
      description: "Uncover the secrets of medieval castles and monasteries across Europe.",
      status: "Active",
      timeLeft: "5 days left",
      participants: 156,
      reward: "₹8,500",
      progress: 75,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Asian Heritage Trail",
      description: "Journey through ancient temples and discover Oriental treasures.",
      status: "Starting Soon",
      timeLeft: "Starts in 2 days",
      participants: 23,
      reward: "₹12,000",
      progress: 25,
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=200&fit=crop",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-accent text-accent-foreground";
      case "Starting Soon": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-hunts-title">
            Treasure Hunts
          </h1>
          <p className="text-muted-foreground" data-testid="text-hunts-subtitle">
            Discover exciting hunts and compete with other treasure hunters
          </p>
        </div>
        <Button className="mt-4 md:mt-0" data-testid="button-create-hunt">
          <Plus className="mr-2 h-4 w-4" />
          Create Hunt
        </Button>
      </div>

      {/* Hunt Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {huntCategories.map((category) => (
          <Button
            key={category.id}
            variant={category.active ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            data-testid={`button-filter-${category.id}`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Featured Hunt */}
      <Card className="bg-gradient-to-r from-primary to-accent text-white mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="text-sm opacity-90 mb-2 flex items-center">
                <Trophy className="mr-1 h-4 w-4" />
                FEATURED HUNT
              </div>
              <h3 className="text-2xl font-bold mb-2" data-testid="text-featured-hunt-title">
                Lost Treasures of the Pharaohs
              </h3>
              <p className="opacity-90 mb-4" data-testid="text-featured-hunt-description">
                Embark on an epic journey to discover ancient Egyptian artifacts hidden across Cairo's most historic sites.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  247 hunters
                </span>
                <span className="flex items-center">
                  <Trophy className="mr-1 h-4 w-4" />
                  50,000 pts
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  7 days left
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 whitespace-nowrap"
              data-testid="button-join-featured-hunt"
            >
              Join Hunt
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Hunts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {hunts.map((hunt) => (
          <Card key={hunt.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-0">
              <img
                src={hunt.image}
                alt={hunt.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStatusColor(hunt.status)} data-testid={`badge-hunt-status-${hunt.id}`}>
                    {hunt.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground" data-testid={`text-hunt-time-${hunt.id}`}>
                    {hunt.timeLeft}
                  </span>
                </div>
                <h3 className="font-semibold mb-2" data-testid={`text-hunt-title-${hunt.id}`}>
                  {hunt.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3" data-testid={`text-hunt-description-${hunt.id}`}>
                  {hunt.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm flex items-center">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span data-testid={`text-hunt-participants-${hunt.id}`}>{hunt.participants}</span> hunters
                  </span>
                  <span className="text-sm font-medium text-primary" data-testid={`text-hunt-reward-${hunt.id}`}>
                    {hunt.reward}
                  </span>
                </div>
                <Progress value={hunt.progress} className="mb-3" />
                <Button className="w-full" data-testid={`button-join-hunt-${hunt.id}`}>
                  {hunt.status === "Starting Soon" ? "Register" : "Join Hunt"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Active Hunts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4" data-testid="text-my-active-hunts-title">
            My Active Hunts
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Crown className="text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium" data-testid="text-my-hunt-title">
                    Lost Treasures of the Pharaohs
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-testid="text-my-hunt-progress">3/7 artifacts found</span> • 
                    <span data-testid="text-my-hunt-rank"> Rank #12</span>
                  </div>
                </div>
              </div>
              <Button variant="secondary" data-testid="button-continue-hunt">
                Continue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Hunts;
