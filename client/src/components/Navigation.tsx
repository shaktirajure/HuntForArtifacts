import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Home, QrCode, Gem, MapPin, Settings, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/scan", label: "Scan", icon: QrCode },
    { path: "/artifacts", label: "Artifacts", icon: Gem },
    { path: "/hunts", label: "Hunts", icon: MapPin },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home-logo">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Gem className="text-primary-foreground text-sm" />
            </div>
            <span className="text-xl font-bold text-foreground">Artifact Hunter</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className="px-4 py-2 text-sm font-medium transition-colors duration-200"
                    data-testid={`button-nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              data-testid="button-theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-mobile-theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-2 mt-6">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} href={item.path}>
                        <Button
                          variant={isActive(item.path) ? "default" : "ghost"}
                          className="w-full justify-start text-base font-medium"
                          onClick={() => setIsOpen(false)}
                          data-testid={`button-mobile-nav-${item.label.toLowerCase()}`}
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
