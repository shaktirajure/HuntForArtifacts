import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, QrCode, TrendingUp, Plus, Settings, BarChart3, UserPlus, Crown, Gem } from "lucide-react";

const Admin = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12% from last month",
      icon: Users,
      color: "bg-primary",
    },
    {
      title: "Active Hunts",
      value: "23",
      change: "+3 new this week",
      icon: MapPin,
      color: "bg-accent",
    },
    {
      title: "Artifacts Scanned",
      value: "8,934",
      change: "+145 today",
      icon: QrCode,
      color: "bg-secondary",
    },
    {
      title: "Revenue",
      value: "₹2,45,000",
      change: "+8% from last month",
      icon: TrendingUp,
      color: "bg-primary",
    },
  ];

  const artifactActions = [
    { label: "Add New Artifact", icon: Plus, color: "text-primary" },
    { label: "Manage Existing Artifacts", icon: Settings, color: "text-secondary" },
    { label: "Generate QR Codes", icon: QrCode, color: "text-accent" },
  ];

  const huntActions = [
    { label: "Create New Hunt", icon: Plus, color: "text-primary" },
    { label: "Manage Active Hunts", icon: Settings, color: "text-secondary" },
    { label: "View Hunt Reports", icon: BarChart3, color: "text-accent" },
  ];

  const recentActivity = [
    {
      id: 1,
      description: "New user registration: john.doe@email.com",
      timestamp: "2 minutes ago",
      icon: UserPlus,
      color: "bg-primary",
    },
    {
      id: 2,
      description: "Artifact scanned: Ancient Egyptian Vase",
      timestamp: "5 minutes ago",
      icon: QrCode,
      color: "bg-accent",
    },
    {
      id: 3,
      description: "Hunt completed: Roman Empire Quest",
      timestamp: "1 hour ago",
      icon: Crown,
      color: "bg-secondary",
    },
    {
      id: 4,
      description: "New artifact added: Viking Battle Axe",
      timestamp: "3 hours ago",
      icon: Gem,
      color: "bg-primary",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-admin-title">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground" data-testid="text-admin-subtitle">
          Manage artifacts, hunts, and system settings
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold" data-testid={`text-admin-stat-${index}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-accent">{stat.change}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Artifact Management */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-artifact-management-title">
              Artifact Management
            </h3>
            <div className="space-y-3">
              {artifactActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left p-3 h-auto"
                    data-testid={`button-artifact-${index}`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${action.color}`} />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Hunt Management */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" data-testid="text-hunt-management-title">
              Hunt Management
            </h3>
            <div className="space-y-3">
              {huntActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left p-3 h-auto"
                    data-testid={`button-hunt-${index}`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${action.color}`} />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4" data-testid="text-recent-activity-title">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className="text-white text-sm" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium" data-testid={`text-activity-description-${activity.id}`}>
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-activity-timestamp-${activity.id}`}>
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
