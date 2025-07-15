
import React from 'react';
import Navigation from '@/components/Navigation';
import CategoryCard from '@/components/CategoryCard';
import { 
  Search, 
  ArrowUpDown, 
  Repeat, 
  Zap,
  Binary,
  Calculator
} from 'lucide-react';

const Algorithms = () => {
  const algorithmCategories = [
    {
      title: 'Searching',
      description: 'Find elements efficiently with linear search, binary search, and advanced searching techniques.',
      icon: Search,
      algorithmCount: 8,
      difficulty: 'Beginner' as const,
      link: '/category/searching',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Sorting',
      description: 'Arrange elements with bubble sort, merge sort, quicksort, and other sorting algorithms.',
      icon: ArrowUpDown,
      algorithmCount: 12,
      difficulty: 'Intermediate' as const,
      link: '/category/sorting',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Recursion',
      description: 'Master recursive thinking with factorial, fibonacci, tower of hanoi, and backtracking.',
      icon: Repeat,
      algorithmCount: 8,
      difficulty: 'Intermediate' as const,
      link: '/category/recursion',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Dynamic Programming',
      description: 'Solve optimization problems with memoization, tabulation, and classic DP patterns.',
      icon: Zap,
      algorithmCount: 12,
      difficulty: 'Advanced' as const,
      link: '/category/dynamic-programming',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Divide & Conquer',
      description: 'Break down complex problems into smaller subproblems with merge sort, quicksort, and more.',
      icon: Binary,
      algorithmCount: 6,
      difficulty: 'Intermediate' as const,
      link: '/category/divide-conquer',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Mathematical',
      description: 'Explore number theory, prime algorithms, GCD, LCM, and mathematical computations.',
      icon: Calculator,
      algorithmCount: 10,
      difficulty: 'Beginner' as const,
      link: '/category/mathematical',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Algorithm Categories
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Explore fundamental algorithms that power computer science. From basic searching to advanced optimization techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="bg-muted px-3 py-1 rounded-full">Step-by-step visualizations</span>
            <span className="bg-muted px-3 py-1 rounded-full">Interactive learning</span>
            <span className="bg-muted px-3 py-1 rounded-full">Code examples</span>
          </div>
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Master Core Algorithms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each category contains multiple algorithms with detailed explanations, 
              time complexity analysis, and interactive visualizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithmCategories.map((category, index) => (
              <div
                key={category.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithm Complexity Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Understanding Algorithm Complexity
            </h3>
            <p className="text-lg text-muted-foreground">
              Learn how to analyze and compare algorithm performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">O(1)</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Constant Time</h4>
              <p className="text-muted-foreground">Best possible performance - execution time doesn't depend on input size</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">O(log n)</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Logarithmic Time</h4>
              <p className="text-muted-foreground">Efficient algorithms like binary search that divide the problem space</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">O(n²)</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Quadratic Time</h4>
              <p className="text-muted-foreground">Nested loops - performance degrades quickly with large inputs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Algorithms;
