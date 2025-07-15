
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Clock, BarChart3 } from 'lucide-react';

interface CodePanelProps {
  title: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  currentLine?: number;
}

const CodePanel: React.FC<CodePanelProps> = ({
  title,
  code,
  explanation,
  timeComplexity,
  spaceComplexity,
  currentLine
}) => {
  const codeLines = code.split('\n');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code2 className="w-5 h-5" />
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              O({timeComplexity})
            </Badge>
            <Badge variant="outline" className="text-xs">
              <BarChart3 className="w-3 h-3 mr-1" />
              O({spaceComplexity})
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-6">
        {/* Code Block */}
        <div className="relative">
          <div className="code-editor overflow-x-auto">
            {codeLines.map((line, index) => (
              <div
                key={index}
                className={`flex ${
                  currentLine === index + 1 
                    ? 'bg-primary/20 border-l-4 border-primary' 
                    : ''
                }`}
              >
                <span className="text-gray-500 mr-4 select-none w-8 text-right">
                  {index + 1}
                </span>
                <span className="flex-1">{line || ' '}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">How it works:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Complexity Analysis */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-1">
            <div className="text-sm font-medium text-foreground">Time Complexity</div>
            <div className="text-lg font-mono text-primary">O({timeComplexity})</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-foreground">Space Complexity</div>
            <div className="text-lg font-mono text-secondary">O({spaceComplexity})</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodePanel;
