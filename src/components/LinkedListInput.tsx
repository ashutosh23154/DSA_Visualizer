
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LinkedListNode } from '@/algorithms/linkedListAlgorithms';

interface LinkedListInputProps {
  nodes: LinkedListNode[];
  onNodesChange: (nodes: LinkedListNode[]) => void;
  onOperationChange: (operation: 'insert' | 'search' | 'delete', value: number, position?: number) => void;
  listType: 'singly' | 'doubly' | 'circular';
  onListTypeChange: (type: 'singly' | 'doubly' | 'circular') => void;
  onReset: () => void;
}

const LinkedListInput: React.FC<LinkedListInputProps> = ({
  nodes,
  onNodesChange,
  onOperationChange,
  listType,
  onListTypeChange,
  onReset
}) => {
  const [operation, setOperation] = useState<'insert' | 'search' | 'delete'>('insert');
  const [value, setValue] = useState('');
  const [position, setPosition] = useState('0');
  const [newNodeValue, setNewNodeValue] = useState('');

  const handleExecuteOperation = () => {
    const numValue = parseInt(value);
    const posValue = parseInt(position);
    
    if (!isNaN(numValue)) {
      onOperationChange(operation, numValue, operation === 'insert' ? posValue : undefined);
    }
  };

  const handleAddNode = () => {
    const numValue = parseInt(newNodeValue);
    if (!isNaN(numValue)) {
      const newNode: LinkedListNode = {
        value: numValue,
        next: null,
        prev: listType === 'doubly' ? null : undefined
      };
      
      if (nodes.length === 0) {
        // First node
        if (listType === 'circular') {
          newNode.next = 0; // points to itself
        }
        onNodesChange([newNode]);
      } else {
        // Add to end
        const newNodes = [...nodes];
        const newIndex = newNodes.length;
        
        if (listType === 'doubly') {
          newNode.prev = newIndex - 1;
          newNodes[newIndex - 1].next = newIndex;
        } else if (listType === 'circular') {
          // Find the last node that points to head
          const lastIndex = newNodes.length - 1;
          newNodes[lastIndex].next = newIndex;
          newNode.next = 0; // new node points to head
        } else {
          // Singly linked list
          newNodes[newIndex - 1].next = newIndex;
        }
        
        newNodes.push(newNode);
        onNodesChange(newNodes);
      }
      
      setNewNodeValue('');
    }
  };

  const handleGenerateList = () => {
    const values = [1, 2, 3, 4, 5];
    const newNodes: LinkedListNode[] = values.map((val, index) => ({
      value: val,
      next: index < values.length - 1 ? index + 1 : null,
      prev: listType === 'doubly' ? (index > 0 ? index - 1 : null) : undefined
    }));
    
    // Set up connections based on list type
    if (listType === 'circular') {
      newNodes[newNodes.length - 1].next = 0; // last points to first
    }
    
    onNodesChange(newNodes);
  };

  const handleClearList = () => {
    onNodesChange([]);
  };

  return (
    <div className="space-y-4">
      {/* List Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">List Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={listType} onValueChange={(value: 'singly' | 'doubly' | 'circular') => onListTypeChange(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="singly">Singly Linked List</SelectItem>
              <SelectItem value="doubly">Doubly Linked List</SelectItem>
              <SelectItem value="circular">Circular Linked List</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* List Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Setup List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newNode">Add Node</Label>
              <Input
                id="newNode"
                type="number"
                value={newNodeValue}
                onChange={(e) => setNewNodeValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>
            <Button onClick={handleAddNode} className="mt-6">
              Add
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleGenerateList} variant="outline" size="sm">
              Generate Sample
            </Button>
            <Button onClick={handleClearList} variant="outline" size="sm">
              Clear All
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Current nodes: {nodes.length > 0 ? nodes.map(n => n.value).join(' → ') : 'Empty'}
          </div>
        </CardContent>
      </Card>

      {/* Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="operation">Operation</Label>
            <Select value={operation} onValueChange={(value: 'insert' | 'search' | 'delete') => setOperation(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="insert">Insert</SelectItem>
                <SelectItem value="search">Search</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          
          {operation === 'insert' && (
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position (0 for head)"
                min="0"
              />
            </div>
          )}
          
          <Button onClick={handleExecuteOperation} className="w-full">
            Execute {operation.charAt(0).toUpperCase() + operation.slice(1)}
          </Button>
          
          <Button onClick={onReset} variant="outline" className="w-full">
            Reset Visualization
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedListInput;
