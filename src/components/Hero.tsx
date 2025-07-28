
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Code2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Animated background shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse-slow delay-500" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Interactive Algorithm Learning
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-foreground">Master</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Searching
            </span>
            <span className="block text-foreground">& Sorting</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Visualize, understand, and master complex algorithms through 
            interactive step-by-step animations and comprehensive explanations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-4">
              <Link to="/algorithms">
                <Play className="w-5 h-5 mr-2" />
                Start Visualizing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 hover:bg-muted">
              <Link to="/about">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              'Step-by-step animations',
              'Interactive controls',
              'Code explanations',
              'Multiple algorithms',
              'Responsive design'
            ].map((feature, index) => (
              <div
                key={feature}
                className={`px-4 py-2 bg-card border border-border rounded-full text-muted-foreground animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code snippet decoration */}
      <div className="absolute bottom-10 left-10 hidden lg:block animate-fade-in">
        <div className="code-editor max-w-xs">
          <div className="flex items-center mb-2">
            <Code2 className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-green-400 text-xs">algorithm.js</span>
          </div>
          <div className="text-xs space-y-1">
            <div><span className="text-blue-400">function</span> <span className="text-yellow-400">quickSort</span>() {'{}'}</div>
            <div className="ml-2"><span className="text-purple-400">// Visualize step by step</span></div>
            <div className="ml-2"><span className="text-green-400">return</span> sorted;</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
