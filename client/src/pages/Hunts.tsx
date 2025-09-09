import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Trophy, Clock, Plus, Crown, MapPin, CheckCircle, Play } from "lucide-react";
import { hunts, getHuntProgress, startHunt, HuntProgress } from "@/data/hunts";

const Hunts = () => {
  const [huntProgresses, setHuntProgresses] = useState<{ [huntId: string]: HuntProgress }>({});

  useEffect(() => {
    // Load hunt progress from localStorage
    const progresses: { [huntId: string]: HuntProgress } = {};
    hunts.forEach(hunt => {
      const progress = getHuntProgress(hunt.id);
      if (progress) {
        progresses[hunt.id] = progress;
      }
    });
    setHuntProgresses(progresses);
  }, []);

  const handleStartHunt = (huntId: string) => {
    const progress = startHunt(huntId);
    setHuntProgresses(prev => ({ ...prev, [huntId]: progress }));
  };

  const calculateProgress = (huntId: string): number => {
    const hunt = hunts.find(h => h.id === huntId);
    const progress = huntProgresses[huntId];
    if (!hunt || !progress) return 0;
    return (progress.completedSteps.length / hunt.steps.length) * 100;
  };

  const getCurrentClue = (huntId: string): string | null => {
    const hunt = hunts.find(h => h.id === huntId);
    const progress = huntProgresses[huntId];
    if (!hunt || !progress) return null;
    
    const currentStep = hunt.steps.find(step => step.order === progress.currentStep);
    return currentStep ? currentStep.clue : null;
  };

  const isHuntCompleted = (huntId: string): boolean => {
    const hunt = hunts.find(h => h.id === huntId);
    const progress = huntProgresses[huntId];
    if (!hunt || !progress) return false;
    return progress.completedSteps.length === hunt.steps.length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-hunts-title">
            Treasure Hunts
          </h1>
          <p className="text-muted-foreground" data-testid="text-hunts-subtitle">
            Follow clues and discover artifacts to complete exciting treasure hunts
          </p>
        </div>
      </div>

      {/* Available Hunts */}
      <div className="space-y-6">
        {hunts.map((hunt) => {
          const progress = huntProgresses[hunt.id];
          const progressPercentage = calculateProgress(hunt.id);
          const currentClue = getCurrentClue(hunt.id);
          const completed = isHuntCompleted(hunt.id);

          return (
            <Card key={hunt.id} className={completed ? "border-green-500 bg-green-50 dark:bg-green-950" : ""}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold" data-testid={`text-hunt-name-${hunt.id}`}>
                        {hunt.name}
                      </h3>
                      {completed && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </Badge>
                      )}
                      {progress && !completed && (
                        <Badge className="bg-blue-500 text-white">
                          <Play className="mr-1 h-3 w-3" />
                          In Progress
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-4" data-testid={`text-hunt-intro-${hunt.id}`}>
                      {hunt.introText}
                    </p>

                    {progress && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {progress.completedSteps.length} of {hunt.steps.length} steps completed
                          </span>
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className="h-2"
                          data-testid={`progress-hunt-${hunt.id}`}
                        />
                      </div>
                    )}

                    {currentClue && !completed && (
                      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800 mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                                Current Clue
                              </div>
                              <p className="text-blue-700 dark:text-blue-300" data-testid={`text-current-clue-${hunt.id}`}>
                                {currentClue}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {completed && (
                      <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <div>
                              <div className="font-medium text-green-900 dark:text-green-100">
                                Hunt Completed!
                              </div>
                              <p className="text-green-700 dark:text-green-300">
                                Congratulations! You've discovered all artifacts in this hunt.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="lg:w-48">
                    {!progress ? (
                      <Button 
                        onClick={() => handleStartHunt(hunt.id)}
                        className="w-full"
                        data-testid={`button-start-hunt-${hunt.id}`}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Hunt
                      </Button>
                    ) : completed ? (
                      <div className="text-center p-4">
                        <Trophy className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          Well Done!
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {progress.completedSteps.length}/{hunt.steps.length}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Steps Complete</p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Progress
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Hunts;
