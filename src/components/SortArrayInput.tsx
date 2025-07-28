
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, Plus } from 'lucide-react';

interface SortArrayInputProps {
  array: number[];
  onArrayChange: (array: number[]) => void;
  onGenerateArray: () => void;
}

const SortArrayInput: React.FC<SortArrayInputProps> = ({
  array,
  onArrayChange,
  onGenerateArray
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleArrayInput = (value: string) => {
    const numbers = value.split(',')
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n));
    onArrayChange(numbers);
  };

  const addElement = () => {
    if (inputValue && !isNaN(parseInt(inputValue))) {
      const newArray = [...array, parseInt(inputValue)];
      onArrayChange(newArray);
      setInputValue('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Array Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Array Display */}
        <div>
          <Label className="text-sm font-medium">Current Array</Label>
          <div className="mt-2 p-3 bg-muted rounded-lg">
            <div className="flex flex-wrap gap-1">
              {array.length > 0 ? (
                array.map((num, index) => (
                  <span
                    key={index}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm"
                  >
                    {num}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">No elements</span>
              )}
            </div>
          </div>
        </div>

        {/* Array Input */}
        <div className="space-y-2">
          <Label htmlFor="array-input">Enter Array (comma-separated)</Label>
          <Input
            id="array-input"
            placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
            onChange={(e) => handleArrayInput(e.target.value)}
          />
        </div>

        {/* Add Single Element */}
        <div className="flex gap-2">
          <Input
            placeholder="Add element"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addElement()}
          />
          <Button onClick={addElement} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Generate Random Array */}
        <Button onClick={onGenerateArray} variant="outline" className="w-full">
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Random Array
        </Button>
      </CardContent>
    </Card>
  );
};

export default SortArrayInput;
