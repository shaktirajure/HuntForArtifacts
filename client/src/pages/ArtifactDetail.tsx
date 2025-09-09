import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Award, Share2, CheckCircle, XCircle, HelpCircle, Lightbulb, MapPin, Trophy } from "lucide-react";
import { Link, useParams } from "wouter";
import { getArtifactBySlug, TriviaQuestion } from "@/data/artifacts";
import { hunts, getHuntProgress, completeHuntStep, HuntProgress } from "@/data/hunts";

const ArtifactDetail = () => {
  const { slug } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [huntStepCompleted, setHuntStepCompleted] = useState<string | null>(null);
  const [nextClue, setNextClue] = useState<string | null>(null);

  const artifact = slug ? getArtifactBySlug(slug) : undefined;

  useEffect(() => {
    if (!artifact) return;

    // Check all active hunts to see if this artifact matches the current step
    hunts.forEach(hunt => {
      const progress = getHuntProgress(hunt.id);
      if (!progress) return;

      // Find the current step
      const currentStep = hunt.steps.find(step => step.order === progress.currentStep);
      if (currentStep && currentStep.artifactSlug === artifact.slug) {
        // This artifact matches the current hunt step!
        const updatedProgress = completeHuntStep(hunt.id, currentStep.order);
        if (updatedProgress) {
          setHuntStepCompleted(hunt.name);
          
          // Find the next clue
          const nextStep = hunt.steps.find(step => step.order === updatedProgress.currentStep);
          if (nextStep) {
            setNextClue(nextStep.clue);
          }
        }
      }
    });
  }, [artifact]);

  if (!artifact) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artifact Not Found</h1>
          <p className="text-muted-foreground mb-6">The artifact you're looking for doesn't exist.</p>
          <Link href="/artifacts">
            <Button>Back to Artifacts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    setShowAnswers(prev => ({ ...prev, [questionIndex]: true }));
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
            src={artifact.imageUrl}
            alt={artifact.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            data-testid="img-artifact-main"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-accent text-accent-foreground" data-testid="badge-artifact-discovered">
              Discovered
            </Badge>
            <div className="text-2xl font-bold text-primary" data-testid="text-artifact-points">
              +150 pts
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4" data-testid="text-artifact-title">
            {artifact.title}
          </h1>
          
          <p className="text-muted-foreground mb-6" data-testid="text-artifact-summary">
            {artifact.summary}
          </p>
          
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

      {/* Quick Facts */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4" data-testid="text-quick-facts-title">
            Quick Facts
          </h3>
          <ul className="space-y-2">
            {artifact.quickFacts.map((fact, index) => (
              <li key={index} className="flex items-start" data-testid={`text-quick-fact-${index}`}>
                <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-muted-foreground">{fact}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Trivia Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <Lightbulb className="mr-2 h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold" data-testid="text-trivia-title">
              Test Your Knowledge
            </h3>
          </div>
          
          <div className="space-y-6">
            {artifact.trivia.map((question, questionIndex) => (
              <div key={questionIndex} className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-4" data-testid={`text-trivia-question-${questionIndex}`}>
                  {question.question}
                </h4>
                
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswers[questionIndex] === optionIndex;
                    const isCorrect = optionIndex === question.answerIndex;
                    const showFeedback = showAnswers[questionIndex];
                    
                    let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
                    let icon = null;
                    
                    if (showFeedback) {
                      if (isSelected && isCorrect) {
                        buttonVariant = "default";
                        icon = <CheckCircle className="ml-2 h-4 w-4 text-green-600" />;
                      } else if (isSelected && !isCorrect) {
                        buttonVariant = "destructive";
                        icon = <XCircle className="ml-2 h-4 w-4" />;
                      } else if (!isSelected && isCorrect) {
                        buttonVariant = "secondary";
                        icon = <CheckCircle className="ml-2 h-4 w-4 text-green-600" />;
                      }
                    } else if (isSelected) {
                      buttonVariant = "default";
                    }
                    
                    return (
                      <Button
                        key={optionIndex}
                        variant={buttonVariant}
                        className="w-full justify-between text-left h-auto p-3"
                        onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                        disabled={showAnswers[questionIndex]}
                        data-testid={`button-trivia-option-${questionIndex}-${optionIndex}`}
                      >
                        <span>{option}</span>
                        {icon}
                      </Button>
                    );
                  })}
                </div>
                
                {showAnswers[questionIndex] && (
                  <div className="mt-4 p-3 bg-background rounded-lg">
                    {selectedAnswers[questionIndex] === question.answerIndex ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        <span className="font-medium">Correct!</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="mr-2 h-4 w-4" />
                        <span className="font-medium">
                          Incorrect. The correct answer is: {question.options[question.answerIndex]}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hunt Step Completion */}
      {huntStepCompleted && (
        <Card className="mb-8 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2" data-testid="text-hunt-step-completed">
                Hunt Step Completed!
              </h3>
              <p className="text-green-700 dark:text-green-300" data-testid="text-hunt-name-completed">
                Great job! You've completed a step in "{huntStepCompleted}".
              </p>
            </div>
            
            {nextClue && (
              <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Next Clue
                      </div>
                      <p className="text-blue-700 dark:text-blue-300" data-testid="text-next-hunt-clue">
                        {nextClue}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="text-center mt-4">
              <Link href="/hunts">
                <Button variant="outline" data-testid="button-view-hunt-progress">
                  View Hunt Progress
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      <Card className="bg-accent/10 border-accent">
        <CardContent className="p-6 text-center">
          <Award className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2" data-testid="text-scan-success-title">
            Artifact Successfully Scanned!
          </h3>
          <p className="text-muted-foreground" data-testid="text-scan-success-message">
            You've successfully discovered this artifact and earned 150 points. 
            The artifact has been added to your collection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtifactDetail;