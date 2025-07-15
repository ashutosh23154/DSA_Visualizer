import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface VisualizationControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
}

const VisualizationControls: React.FC<VisualizationControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
  onStepChange
}) => {
  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Main Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={currentStep === 0}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={isPlaying ? onPause : onPlay}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={currentStep >= totalSteps - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            </div>
            <Slider
              value={[currentStep]}
              onValueChange={(value) => onStepChange(value[0])}
              min={0}
              max={totalSteps - 1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Animation Speed</span>
              <span>{speed}x</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              min={0.25}
              max={2}
              step={0.25}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationControls;
