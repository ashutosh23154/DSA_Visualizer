
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import { 
  Search, 
  ArrowUpDown, 
  Link as LinkIcon, 
  TreePine, 
  Network, 
  Repeat, 
  Zap 
} from 'lucide-react';

const Index = () => {
  const categories = [
    {
      title: 'Searching',
      description: 'Explore linear search, binary search, and advanced searching techniques with visual step-by-step breakdowns.',
      icon: Search,
      algorithmCount: 4,
      difficulty: 'Beginner' as const,
      link: '/category/searching',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Sorting',
      description: 'Master bubble sort, merge sort, quicksort, and other sorting algorithms through interactive animations.',
      icon: ArrowUpDown,
      algorithmCount: 12,
      difficulty: 'Intermediate' as const,
      link: '/category/sorting',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Linked Lists',
      description: 'Understand singly, doubly, and circular linked lists with dynamic memory visualization.',
      icon: LinkIcon,
      algorithmCount: 6,
      difficulty: 'Beginner' as const,
      link: '/category/not-found',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Trees',
      description: 'Visualize binary trees, AVL trees, red-black trees, and tree traversal algorithms.',
      icon: TreePine,
      algorithmCount: 10,
      difficulty: 'Intermediate' as const,
      link: '/category/trees',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Graphs',
      description: 'Learn graph representations, DFS, BFS, shortest path, and minimum spanning tree algorithms.',
      icon: Network,
      algorithmCount: 15,
      difficulty: 'Advanced' as const,
      link: '/category/graphs',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Recursion',
      description: 'Master recursive thinking with factorial, fibonacci, tower of hanoi, and backtracking problems.',
      icon: Repeat,
      algorithmCount: 8,
      difficulty: 'Intermediate' as const,
      link: '/category/not-found',
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Algorithm Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose a category to start your interactive learning journey. 
              Each section contains multiple algorithms with step-by-step visualizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
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

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Algorithms</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-secondary">7</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Interactive</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-green-600">Free</div>
              <div className="text-sm text-muted-foreground">Forever</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
