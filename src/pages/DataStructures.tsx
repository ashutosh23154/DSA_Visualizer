import React from 'react';
import Navigation from '@/components/Navigation';
import CategoryCard from '@/components/CategoryCard';
import { 
  Link as LinkIcon, 
  TreePine, 
  Network, 
  Layers,
  Database,
  Grid3X3,
  Hash
} from 'lucide-react';

const DataStructures = () => {
  const dataStructureCategories = [
    {
      title: 'Arrays & Lists',
      description: 'Master dynamic arrays, static arrays, and array manipulation techniques with visual examples.',
      icon: Grid3X3,
      algorithmCount: 8,
      difficulty: 'Beginner' as const,
      link: '/category/arrays',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Linked Lists',
      description: 'Understand singly, doubly, and circular linked lists with dynamic memory visualization.',
      icon: LinkIcon,
      algorithmCount: 6,
      difficulty: 'Beginner' as const,
      link: '/category/linked-lists',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Stacks & Queues',
      description: 'Learn LIFO and FIFO data structures with practical applications and implementations.',
      icon: Layers,
      algorithmCount: 7,
      difficulty: 'Beginner' as const,
      link: '/category/stacks-queues',
      color: 'from-green-500 to-green-600'
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
      title: 'Hash Tables',
      description: 'Explore hash functions, collision resolution, and the power of O(1) lookups.',
      icon: Hash,
      algorithmCount: 5,
      difficulty: 'Intermediate' as const,
      link: '/category/hash-tables',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Heaps',
      description: 'Master min-heaps, max-heaps, priority queues, and heap-based algorithms.',
      icon: Layers,
      algorithmCount: 6,
      difficulty: 'Intermediate' as const,
      link: '/category/heaps',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Advanced Structures',
      description: 'Explore tries, segment trees, fenwick trees, and other specialized data structures.',
      icon: Database,
      algorithmCount: 12,
      difficulty: 'Advanced' as const,
      link: '/category/advanced-structures',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Data Structures
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Master the building blocks of efficient programming. Understand how data is organized, stored, and accessed.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="bg-muted px-3 py-1 rounded-full">Memory visualization</span>
            <span className="bg-muted px-3 py-1 rounded-full">Operation animations</span>
            <span className="bg-muted px-3 py-1 rounded-full">Complexity analysis</span>
          </div>
        </div>
      </section>

      {/* Data Structure Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Essential Data Structures
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple arrays to complex trees and graphs. Each structure is designed 
              for specific use cases and performance characteristics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dataStructureCategories.map((category, index) => (
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

      {/* Performance Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Performance Characteristics
            </h3>
            <p className="text-lg text-muted-foreground">
              Understanding when to use each data structure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border text-center">
              <Grid3X3 className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Arrays</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Access: O(1)</div>
                <div>Search: O(n)</div>
                <div>Insert: O(n)</div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border text-center">
              <Hash className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Hash Tables</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Access: O(1)</div>
                <div>Search: O(1)</div>
                <div>Insert: O(1)</div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border text-center">
              <TreePine className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Binary Trees</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Access: O(log n)</div>
                <div>Search: O(log n)</div>
                <div>Insert: O(log n)</div>
              </div>
            </div>
            
            <div className="bg-card p-6 rounded-lg border text-center">
              <LinkIcon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">Linked Lists</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Access: O(n)</div>
                <div>Search: O(n)</div>
                <div>Insert: O(1)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataStructures;
