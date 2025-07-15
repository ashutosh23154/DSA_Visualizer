
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecursionStep } from '@/algorithms/recursionAlgorithms';

interface RecursionVisualizationProps {
  currentStep: RecursionStep | null;
  algorithmType: 'fibonacci' | 'hanoi';
}

const RecursionVisualization: React.FC<RecursionVisualizationProps> = ({
  currentStep,
  algorithmType
}) => {
  if (!currentStep) {
    return (
      <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
        <div className="text-center space-y-4">
          <div className="text-4xl">🔄</div>
          <div className="text-lg font-medium">Recursion Visualization</div>
          <div className="text-sm text-muted-foreground">
            Start the visualization to see recursive calls
          </div>
        </div>
      </div>
    );
  }

  if (algorithmType === 'fibonacci') {
    return <FibonacciVisualization currentStep={currentStep} />;
  } else {
    return <HanoiVisualization currentStep={currentStep} />;
  }
};

const FibonacciVisualization: React.FC<{ currentStep: RecursionStep }> = ({ currentStep }) => {
  const { stackDepth, type, description, parameters, returnValue } = currentStep;

  // Create stack frames from bottom (depth 0) to top (current depth)
  const stackFrames = Array.from({ length: stackDepth + 1 }, (_, i) => {
    const depth = stackDepth - i; // Reverse order so current depth is at top
    const isCurrentFrame = depth === stackDepth;
    
    return {
      depth,
      isActive: isCurrentFrame,
      functionCall: `fibonacci(${parameters[0] - (stackDepth - depth)})`,
      status: isCurrentFrame ? 
        (type === 'return' ? 'Returning' : type === 'call' ? 'Calling' : 'Computing') : 
        'Waiting'
    };
  });

  return (
    <div className="space-y-6">
      {/* Call Stack Visualization */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 text-lg">Recursive Call Stack</h3>
          <div className="space-y-2">
            {stackFrames.map((frame, index) => (
              <div
                key={`frame-${frame.depth}-${index}`}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  frame.isActive 
                    ? 'bg-primary/20 border-primary shadow-md transform scale-105' 
                    : 'bg-muted/50 border-muted-foreground/20'
                }`}
                style={{
                  marginLeft: `${frame.depth * 8}px`, // Indent based on depth
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      frame.isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground/50'
                    }`} />
                    <span className="font-mono text-sm font-medium">
                      {frame.functionCall}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={frame.isActive ? "default" : "secondary"} 
                      className="text-xs"
                    >
                      {frame.status}
                    </Badge>
                    {frame.isActive && returnValue !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        → {returnValue}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 ml-6">
                  Stack Level: {frame.depth}
                </div>
              </div>
            ))}
          </div>
          
          {/* Stack Info */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Current Stack Depth:</span>
              <Badge variant="outline">{stackDepth + 1}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Description */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={
              type === 'call' ? "default" :
              type === 'return' ? "secondary" :
              "outline"
            }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Depth: {stackDepth}
            </span>
          </div>
          <p className="text-sm">{description}</p>
          {returnValue !== undefined && (
            <div className="mt-2 p-2 bg-secondary/20 rounded text-sm">
              <span className="font-medium">Return Value: </span>
              <span className="font-mono">{returnValue}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const HanoiVisualization: React.FC<{ currentStep: RecursionStep }> = ({ currentStep }) => {
  const { hanoiState, description, type, stackDepth } = currentStep;

  if (!hanoiState) return null;

  const { towers, from, to, disk, moveCount } = hanoiState;
  const towerNames = ['A', 'B', 'C'];
  const colors = [
    'hsl(var(--destructive))',
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(199, 89%, 58%)',
    'hsl(186, 77%, 57%)',
    'hsl(262, 52%, 57%)'
  ];

  return (
    <div className="space-y-6">
      {/* Towers Visualization */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Tower of Hanoi</h3>
            <Badge variant="outline">Moves: {moveCount}</Badge>
          </div>
          
          <div className="flex justify-around items-end h-64">
            {towers.map((tower, towerIndex) => (
              <div key={towerIndex} className="flex flex-col items-center">
                <div className="text-sm font-semibold mb-2">
                  Tower {towerNames[towerIndex]}
                </div>
                <div className="relative">
                  {/* Tower pole */}
                  <div className="w-1 h-48 bg-muted-foreground mx-auto mb-2"></div>
                  {/* Base */}
                  <div className="w-24 h-2 bg-muted-foreground"></div>
                  
                  {/* Disks */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col-reverse">
                    {tower.map((diskSize, diskIndex) => (
                      <div
                        key={`${towerIndex}-${diskIndex}`}
                        className={`h-6 rounded transition-all duration-500 mb-0.5 ${
                          from === towerIndex && disk === diskSize ? 'animate-pulse' : ''
                        }`}
                        style={{
                          width: `${diskSize * 16 + 32}px`,
                          backgroundColor: colors[diskSize - 1],
                          marginLeft: `${-(diskSize * 8)}px`
                        }}
                      >
                        <div className="flex items-center justify-center h-full text-white text-xs font-bold">
                          {diskSize}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call Stack */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Call Stack</h3>
          <div className="space-y-2">
            {Array.from({ length: stackDepth + 1 }, (_, i) => (
              <div
                key={i}
                className={`p-2 rounded border ${
                  i === stackDepth 
                    ? 'bg-primary/20 border-primary' 
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">
                    hanoi(n, {towerNames[0]}, {towerNames[2]}, {towerNames[1]})
                  </span>
                  <Badge variant={i === stackDepth ? "default" : "secondary"} className="text-xs">
                    Level {i}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Description */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={
              type === 'call' ? "default" :
              type === 'return' ? "secondary" :
              "outline"
            }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Stack Depth: {stackDepth}
            </span>
          </div>
          <p className="text-sm">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecursionVisualization;
