
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Heart, Code, Users, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Interactive Visualizations',
      description: 'Step-by-step animations that make complex algorithms easy to understand and follow.'
    },
    {
      icon: Zap,
      title: 'Real-time Controls',
      description: 'Play, pause, step through, and control the speed of algorithm execution.'
    },
    {
      icon: Target,
      title: 'Educational Focus',
      description: 'Designed specifically for learning with clear explanations and complexity analysis.'
    },
    {
      icon: Users,
      title: 'For Everyone',
      description: 'Whether you\'re a student, teacher, or developer, our tools adapt to your learning style.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">DSA Visualizer</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Making data structures and algorithms accessible through interactive visualizations 
            and comprehensive learning experiences.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="w-6 h-6 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We believe that understanding algorithms shouldn't be intimidating. DSA Visualizer was created 
              to bridge the gap between theoretical knowledge and practical understanding by providing 
              interactive, visual representations of how algorithms work step-by-step.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={feature.title} className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Code className="w-6 h-6 text-primary" />
              Built With Modern Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui'].map((tech) => (
                <div key={tech} className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="font-medium">{tech}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Source */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Github className="w-6 h-6" />
              Open Source & Community Driven
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              DSA Visualizer is open source and welcomes contributions from the community. 
              Whether you want to add new algorithms, improve existing visualizations, or fix bugs, 
              we'd love your help in making this tool better for everyone.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mb-6">
            Explore our collection of interactive algorithm visualizations and enhance your understanding 
            of data structures and algorithms.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary">
            <Link to="/">
              Start Exploring Algorithms
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
