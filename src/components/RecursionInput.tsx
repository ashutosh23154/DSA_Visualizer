
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shuffle, RotateCcw } from 'lucide-react';

interface RecursionInputProps {
  algorithmType: 'fibonacci' | 'hanoi';
  fibonacciN: number;
  hanoiN: number;
  onFibonacciNChange: (n: number) => void;
  onHanoiNChange: (n: number) => void;
  onReset: () => void;
}

const RecursionInput: React.FC<RecursionInputProps> = ({
  algorithmType,
  fibonacciN,
  hanoiN,
  onFibonacciNChange,
  onHanoiNChange,
  onReset
}) => {
  const generateRandomFibonacci = () => {
    const randomN = Math.floor(Math.random() * 8) + 3; // 3-10
    onFibonacciNChange(randomN);
  };

  const generateRandomHanoi = () => {
    const randomN = Math.floor(Math.random() * 4) + 3; // 3-6
    onHanoiNChange(randomN);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Input Parameters
          <Badge variant="outline" className="text-xs">
            {algorithmType === 'fibonacci' ? 'Fibonacci' : 'Tower of Hanoi'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {algorithmType === 'fibonacci' ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="fibonacci-n">Fibonacci Number (n)</Label>
              <Input
                id="fibonacci-n"
                type="number"
                min="0"
                max="10"
                value={fibonacciN}
                onChange={(e) => onFibonacciNChange(Math.max(0, Math.min(10, parseInt(e.target.value) || 0)))}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">
                Calculate the {fibonacciN}th Fibonacci number (max: 10 for performance)
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomFibonacci}
                className="flex-1"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Preview:</div>
              <div className="text-xs text-muted-foreground">
                fibonacci({fibonacciN}) will make ~{Math.pow(2, fibonacciN)} recursive calls
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="hanoi-n">Number of Disks</Label>
              <Input
                id="hanoi-n"
                type="number"
                min="1"
                max="6"
                value={hanoiN}
                onChange={(e) => onHanoiNChange(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground">
                Number of disks to move (max: 6 for performance)
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateRandomHanoi}
                className="flex-1"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Random
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Preview:</div>
              <div className="text-xs text-muted-foreground">
                Moving {hanoiN} disks requires {Math.pow(2, hanoiN) - 1} moves
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecursionInput;
