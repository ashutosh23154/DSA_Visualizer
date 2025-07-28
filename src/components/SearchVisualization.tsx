
import React from 'react';
import { SearchStep } from '@/algorithms/searchAlgorithms';

interface SearchVisualizationProps {
  array: number[];
  currentStep: SearchStep | null;
  target: number;
}

const SearchVisualization: React.FC<SearchVisualizationProps> = ({
  array,
  currentStep,
  target
}) => {
  const getElementStyle = (index: number, value: number) => {
    if (!currentStep) return 'bg-blue-100 border-blue-300';
    
    // Highlight found element
    if (currentStep.found && currentStep.index === index) {
      return 'bg-green-500 text-white border-green-600 animate-pulse';
    }
    
    // Highlight current comparison
    if (currentStep.comparison && currentStep.index === index) {
      return 'bg-yellow-400 text-black border-yellow-500';
    }
    
    // Binary search range highlighting
    if (currentStep.left !== undefined && currentStep.right !== undefined) {
      if (index >= currentStep.left && index <= currentStep.right) {
        if (currentStep.mid === index) {
          return 'bg-orange-400 text-white border-orange-500';
        }
        return 'bg-blue-200 border-blue-400';
      } else {
        return 'bg-gray-200 border-gray-300 opacity-50';
      }
    }
    
    // Jump search highlighting
    if (currentStep.jumpSize && index % currentStep.jumpSize === currentStep.jumpSize - 1) {
      return 'bg-purple-200 border-purple-400';
    }
    
    // Target value highlighting
    if (value === target) {
      return 'bg-green-100 border-green-300';
    }
    
    return 'bg-blue-100 border-blue-300';
  };

  return (
    <div className="space-y-6">
      {/* Target Display */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg">
          <span className="font-medium">Target:</span>
          <span className="text-xl font-bold">{target}</span>
        </div>
      </div>
      
      {/* Array Visualization */}
      <div className="flex flex-wrap justify-center gap-2 p-4">
        {array.map((value, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-center justify-center
              w-16 h-16 rounded-lg border-2 font-semibold
              transition-all duration-300 ease-in-out
              ${getElementStyle(index, value)}
            `}
          >
            <div className="text-lg">{value}</div>
            <div className="text-xs opacity-70">{index}</div>
          </div>
        ))}
      </div>
      
      {/* Binary Search Pointers */}
      {currentStep?.left !== undefined && currentStep?.right !== undefined && (
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Left: {currentStep.left}</span>
          </div>
          {currentStep.mid !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Mid: {currentStep.mid}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Right: {currentStep.right}</span>
          </div>
        </div>
      )}
      
      {/* Jump Search Info */}
      {currentStep?.jumpSize && (
        <div className="text-center text-sm text-muted-foreground">
          Jump Size: √{array.length} = {currentStep.jumpSize}
        </div>
      )}
      
      {/* Step Description */}
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-center font-medium">
          {currentStep?.description || 'Click play to start the algorithm visualization'}
        </p>
      </div>
    </div>
  );
};

export default SearchVisualization;
