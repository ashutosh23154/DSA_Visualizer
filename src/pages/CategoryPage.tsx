import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import VisualizationControls from '@/components/VisualizationControls';
import CodePanel from '@/components/CodePanel';
import SearchVisualization from '@/components/SearchVisualization';
import SortVisualization from '@/components/SortVisualization';
import ArrayInput from '@/components/ArrayInput';
import SortArrayInput from '@/components/SortArrayInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play } from 'lucide-react';
import { searchAlgorithms, SearchStep } from '@/algorithms/searchAlgorithms';
import { sortAlgorithms, SortStep } from '@/algorithms/sortAlgorithms';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [array, setArray] = useState<number[]>([]);
  const [target, setTarget] = useState(7);
  const [searchSteps, setSearchSteps] = useState<SearchStep[]>([]);
  const [sortSteps, setSortSteps] = useState<SortStep[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Initialize default algorithm and array based on category
  useEffect(() => {
    if (category === 'searching') {
      setSelectedAlgorithm('linear');
      setArray([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
    } else if (category === 'sorting') {
      setSelectedAlgorithm('bubble');
      setArray([64, 34, 25, 12, 22, 11, 90]);
    }
  }, [category]);

  // Generate steps when algorithm, array, or target changes
  useEffect(() => {
    if (category === 'searching' && searchAlgorithms[selectedAlgorithm]) {
      const newSteps = searchAlgorithms[selectedAlgorithm].execute(array, target);
      setSearchSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    } else if (category === 'sorting' && sortAlgorithms[selectedAlgorithm]) {
      const newSteps = sortAlgorithms[selectedAlgorithm].execute(array);
      setSortSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  }, [selectedAlgorithm, array, target, category]);

  // Handle play/pause
  useEffect(() => {
    const totalSteps = category === 'searching' ? searchSteps.length : sortSteps.length;
    
    if (isPlaying && totalSteps > 0) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
      setIntervalId(interval);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, speed, searchSteps.length, sortSteps.length, category]);

  const categoryData = {
    'searching': {
      title: 'Searching Algorithms',
      description: 'Find elements efficiently in different data structures',
      algorithms: [
        { id: 'linear', name: 'Linear Search', difficulty: 'Beginner', timeComplexity: 'O(n)' },
        { id: 'binary', name: 'Binary Search', difficulty: 'Beginner', timeComplexity: 'O(log n)' },
        { id: 'jump', name: 'Jump Search', difficulty: 'Intermediate', timeComplexity: 'O(√n)' },
        { id: 'exponential', name: 'Exponential Search', difficulty: 'Advanced', timeComplexity: 'O(log n)' }
      ]
    },
    'sorting': {
      title: 'Sorting Algorithms',
      description: 'Arrange elements in a specific order',
      algorithms: [
        { id: 'bubble', name: 'Bubble Sort', difficulty: 'Beginner', timeComplexity: 'O(n²)' },
        { id: 'selection', name: 'Selection Sort', difficulty: 'Beginner', timeComplexity: 'O(n²)' },
        { id: 'insertion', name: 'Insertion Sort', difficulty: 'Beginner', timeComplexity: 'O(n²)' },
        { id: 'merge', name: 'Merge Sort', difficulty: 'Intermediate', timeComplexity: 'O(n log n)' },
        { id: 'quick', name: 'Quick Sort', difficulty: 'Intermediate', timeComplexity: 'O(n log n)' },
        { id: 'heap', name: 'Heap Sort', difficulty: 'Advanced', timeComplexity: 'O(n log n)' },
        { id: 'counting', name: 'Counting Sort', difficulty: 'Advanced', timeComplexity: 'O(n + k)' },
        { id: 'radix', name: 'Radix Sort', difficulty: 'Advanced', timeComplexity: 'O(d × n)' },
        { id: 'bucket', name: 'Bucket Sort', difficulty: 'Advanced', timeComplexity: 'O(n + k)' }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">The requested category doesn't exist.</p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const totalSteps = category === 'searching' ? searchSteps.length : sortSteps.length;
  const handleNext = () => setCurrentStep(Math.min(currentStep + 1, totalSteps - 1));
  const handlePrevious = () => setCurrentStep(Math.max(currentStep - 1, 0));
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const generateRandomArray = () => {
    const length = Math.floor(Math.random() * 8) + 6;
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
    
    // Sort array for search algorithms that require sorted input
    if (category === 'searching' && (selectedAlgorithm === 'binary' || selectedAlgorithm === 'jump' || selectedAlgorithm === 'exponential')) {
      newArray.sort((a, b) => a - b);
      setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    }
    
    setArray(newArray);
  };

  const handleArrayChange = (newArray: number[]) => {
    // Sort array for algorithms that require sorted input
    if (category === 'searching' && (selectedAlgorithm === 'binary' || selectedAlgorithm === 'jump' || selectedAlgorithm === 'exponential')) {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
  };

  const currentAlgorithm = category === 'searching' 
    ? searchAlgorithms[selectedAlgorithm] 
    : sortAlgorithms[selectedAlgorithm];

  const currentStepData = category === 'searching' 
    ? searchSteps[currentStep] 
    : sortSteps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="outline" className="mb-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">{currentCategory.title}</h1>
          <p className="text-xl text-muted-foreground">{currentCategory.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Algorithm List Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Algorithms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentCategory.algorithms.map((algorithm) => (
                  <Button
                    key={algorithm.id}
                    variant={algorithm.id === selectedAlgorithm ? "default" : "outline"}
                    className="w-full justify-start text-left"
                    size="sm"
                    onClick={() => setSelectedAlgorithm(algorithm.id)}
                  >
                    <Play className="w-4 h-4 mr-2 flex-shrink-0" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{algorithm.name}</span>
                      <span className="text-xs text-muted-foreground">{algorithm.timeComplexity}</span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Array Input Controls */}
            {category === 'searching' ? (
              <ArrayInput
                array={array}
                target={target}
                onArrayChange={handleArrayChange}
                onTargetChange={setTarget}
                onGenerateArray={generateRandomArray}
              />
            ) : (
              <SortArrayInput
                array={array}
                onArrayChange={handleArrayChange}
                onGenerateArray={generateRandomArray}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Visualization Area */}
            <Card>
              <CardHeader>
                <CardTitle>{currentAlgorithm?.name} Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                {category === 'searching' ? (
                  <SearchVisualization
                    array={array}
                    currentStep={currentStepData as SearchStep || null}
                    target={target}
                  />
                ) : category === 'sorting' ? (
                  <SortVisualization
                    array={array}
                    currentStep={currentStepData as SortStep || null}
                  />
                ) : (
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-4">
                      <div className="text-4xl">🔍</div>
                      <div className="text-lg font-medium">Visualization Area</div>
                      <div className="text-sm text-muted-foreground">
                        Interactive algorithm animation will appear here
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            <VisualizationControls
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onReset={handleReset}
              speed={speed}
              onSpeedChange={setSpeed}
              currentStep={currentStep}
              totalSteps={totalSteps}
              onStepChange={setCurrentStep}
            />

            {/* Code Panel */}
            {currentAlgorithm && (
              <CodePanel
                title={`${currentAlgorithm.name} Implementation`}
                code={currentAlgorithm.code}
                explanation={currentAlgorithm.description}
                timeComplexity={currentAlgorithm.timeComplexity.replace('O(', '').replace(')', '')}
                spaceComplexity={currentAlgorithm.spaceComplexity.replace('O(', '').replace(')', '')}
                currentLine={isPlaying ? (currentStep % 10) + 1 : undefined}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
