
import React from 'react';
import { SortStep } from '@/algorithms/sortAlgorithms';

interface SortVisualizationProps {
  array: number[];
  currentStep: SortStep | null;
}

const SortVisualization: React.FC<SortVisualizationProps> = ({
  array,
  currentStep
}) => {
  const maxValue = Math.max(...array);
  const stepArray = currentStep?.array || array;
  
  const getBarColor = (index: number) => {
    if (!currentStep) return 'bg-primary';
    
    if (currentStep.sorted?.includes(index)) {
      return 'bg-green-500';
    }
    
    if (currentStep.swapping?.includes(index)) {
      return 'bg-red-500 animate-pulse';
    }
    
    if (currentStep.comparing?.includes(index)) {
      return 'bg-yellow-500';
    }
    
    if (currentStep.pivot === index) {
      return 'bg-purple-500';
    }
    
    return 'bg-primary/70';
  };
  
  const getBarHeight = (value: number) => {
    const minHeight = 20;
    const maxHeight = 200;
    return minHeight + (value / maxValue) * (maxHeight - minHeight);
  };

  return (
    <div className="space-y-6">
      {/* Array Visualization */}
      <div className="bg-background border-2 border-border rounded-lg p-6">
        <div className="flex items-end justify-center gap-1 min-h-[250px]">
          {stepArray.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 transition-all duration-300"
            >
              <div
                className={`${getBarColor(index)} rounded-t transition-all duration-300 flex items-end justify-center text-white text-xs font-bold`}
                style={{ 
                  height: `${getBarHeight(value)}px`,
                  width: `${Math.max(30, 300 / stepArray.length)}px`,
                  minWidth: '25px'
                }}
              >
                <span className="mb-1">{value}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {index}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buckets Visualization (for Bucket Sort) */}
      {currentStep?.buckets && (
        <div className="bg-muted/20 rounded-lg p-4">
          <h4 className="font-medium mb-4">Buckets:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentStep.buckets.map((bucket, bucketIndex) => (
              <div key={bucketIndex} className="bg-background border rounded-lg p-3">
                <div className="text-sm font-medium mb-2">Bucket {bucketIndex}</div>
                <div className="flex flex-wrap gap-1">
                  {bucket.length > 0 ? (
                    bucket.map((value, valueIndex) => (
                      <span
                        key={valueIndex}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        {value}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-xs">Empty</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Count Array Visualization (for Counting Sort) */}
      {currentStep?.countArray && (
        <div className="bg-muted/20 rounded-lg p-4">
          <h4 className="font-medium mb-4">Count Array:</h4>
          <div className="flex flex-wrap gap-1">
            {currentStep.countArray.map((count, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold mb-1">
                  {count}
                </div>
                <div className="text-xs text-muted-foreground">{index}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Information */}
      {currentStep && (
        <div className="space-y-4">
          {/* Current Step Description */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Current Step:</h4>
            <p className="text-sm text-muted-foreground">
              {currentStep.description}
            </p>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary/70 rounded"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Pivot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Sorted</span>
            </div>
            {currentStep.heapSize !== undefined && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
                <span>Heap</span>
              </div>
            )}
          </div>

          {/* Additional Step Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(currentStep.left !== undefined || currentStep.right !== undefined) && (
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3">
                <div className="text-sm space-y-1">
                  {currentStep.left !== undefined && (
                    <div>
                      <span className="font-medium">Left boundary:</span> {currentStep.left}
                    </div>
                  )}
                  {currentStep.right !== undefined && (
                    <div>
                      <span className="font-medium">Right boundary:</span> {currentStep.right}
                    </div>
                  )}
                  {currentStep.mid !== undefined && (
                    <div>
                      <span className="font-medium">Mid point:</span> {currentStep.mid}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep.heapSize !== undefined && (
              <div className="bg-pink-50 dark:bg-pink-950/30 rounded-lg p-3">
                <div className="text-sm">
                  <span className="font-medium">Heap size:</span> {currentStep.heapSize}
                </div>
              </div>
            )}

            {currentStep.digit !== undefined && (
              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-3">
                <div className="text-sm">
                  <span className="font-medium">Current digit:</span> {currentStep.digit}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortVisualization;
