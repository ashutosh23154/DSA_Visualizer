
import React from 'react';
import { LinkedListStep, LinkedListNode } from '@/algorithms/linkedListAlgorithms';

interface LinkedListVisualizationProps {
  currentStep: LinkedListStep | null;
  listType: 'singly' | 'doubly' | 'circular';
}

const LinkedListVisualization: React.FC<LinkedListVisualizationProps> = ({
  currentStep,
  listType
}) => {
  if (!currentStep) {
    return (
      <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
        <div className="text-center space-y-4">
          <div className="text-4xl">🔗</div>
          <div className="text-lg font-medium">Linked List Visualization</div>
          <div className="text-sm text-muted-foreground">
            Choose an operation to see the linked list in action
          </div>
        </div>
      </div>
    );
  }

  const { nodes, head, tail, currentNode, newNode, targetNode, comparing, found, message } = currentStep;

  const getNodeColor = (nodeIndex: number) => {
    if (targetNode === nodeIndex) return 'bg-red-100 border-red-500';
    if (newNode === nodeIndex) return 'bg-green-100 border-green-500';
    if (currentNode === nodeIndex) return 'bg-blue-100 border-blue-500';
    if (comparing?.includes(nodeIndex)) return 'bg-yellow-100 border-yellow-500';
    if (found && comparing?.includes(nodeIndex)) return 'bg-green-100 border-green-500';
    return 'bg-white border-gray-300';
  };

  const getDataColor = (nodeIndex: number) => {
    if (targetNode === nodeIndex) return 'bg-red-200';
    if (newNode === nodeIndex) return 'bg-green-200';
    if (currentNode === nodeIndex) return 'bg-blue-200';
    if (comparing?.includes(nodeIndex)) return 'bg-yellow-200';
    if (found && comparing?.includes(nodeIndex)) return 'bg-green-200';
    return 'bg-green-100';
  };

  const renderNode = (node: LinkedListNode, index: number, position: { x: number, y: number }) => {
    const nodeColor = getNodeColor(index);
    const dataColor = getDataColor(index);
    const isHead = head === index;
    const isTail = tail === index;
    
    return (
      <div
        key={index}
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Head/Tail Labels */}
        {isHead && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-orange-200 text-orange-800 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
              Head
            </div>
            <div className="w-0.5 h-6 bg-gray-400 mx-auto mt-1"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-gray-400"></div>
          </div>
        )}
        
        {isTail && listType === 'doubly' && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-gray-400 mx-auto"></div>
            <div className="w-0.5 h-6 bg-gray-400 mx-auto"></div>
            <div className="bg-purple-200 text-purple-800 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
              Tail
            </div>
          </div>
        )}
        
        {/* Node Structure */}
        <div className={`flex border-2 rounded-lg shadow-lg ${nodeColor} transition-all duration-300`}>
          {/* Previous pointer for doubly linked list */}
          {listType === 'doubly' && (
            <div className="w-12 h-16 border-r-2 border-gray-300 bg-blue-50 flex items-center justify-center text-xs font-mono">
              Prev
            </div>
          )}
          
          {/* Data section */}
          <div className={`w-16 h-16 flex items-center justify-center font-bold text-lg ${dataColor} ${listType === 'doubly' ? 'border-r-2 border-gray-300' : ''}`}>
            {node.value}
          </div>
          
          {/* Next pointer section */}
          <div className="w-12 h-16 bg-blue-50 flex items-center justify-center text-xs font-mono">
            Next
          </div>
        </div>
        
        {/* Next pointer arrow */}
        {node.next !== null && (
          <div className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2">
            <div className="flex items-center">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-0 h-0 border-l-4 border-l-gray-600 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
            </div>
          </div>
        )}
        
        {/* Previous pointer arrow for doubly linked list */}
        {listType === 'doubly' && node.prev !== null && (
          <div className="absolute top-1/2 right-full transform -translate-y-1/2 mr-2">
            <div className="flex items-center">
              <div className="w-0 h-0 border-r-4 border-r-gray-600 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
            </div>
          </div>
        )}
        
        {/* Circular pointer back to head */}
        {listType === 'circular' && node.next === head && index !== head && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-green-600"></div>
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-green-600"></div>
              <div className="text-xs text-green-700 font-semibold mt-1">→ HEAD</div>
            </div>
          </div>
        )}
        
        {/* Self-loop for single node circular list */}
        {listType === 'circular' && node.next === index && (
          <div className="absolute -top-6 -right-6">
            <div className="w-12 h-12 border-2 border-green-600 rounded-full relative">
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-3 border-l-green-600 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
            </div>
            <div className="text-xs text-green-700 text-center mt-1">Self</div>
          </div>
        )}
      </div>
    );
  };

  const getNodePositions = () => {
    if (nodes.length === 0) return [];
    
    const positions: { x: number, y: number }[] = [];
    const centerY = 150;
    const nodeSpacing = listType === 'doubly' ? 160 : 140;
    const startX = listType === 'doubly' ? 120 : 100;
    
    if (listType === 'circular' && nodes.length > 4) {
      // Circular layout for circular linked list with many nodes
      const radius = Math.max(100, nodes.length * 20);
      const centerX = 300;
      
      nodes.forEach((_, index) => {
        const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
        positions.push({
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        });
      });
    } else {
      // Linear layout for singly/doubly linked list and small circular lists
      nodes.forEach((_, index) => {
        positions.push({
          x: startX + index * nodeSpacing,
          y: centerY
        });
      });
    }
    
    return positions;
  };

  const positions = getNodePositions();

  return (
    <div className="w-full bg-background rounded-lg border p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {listType.charAt(0).toUpperCase() + listType.slice(1)} Linked List
        </h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      
      <div className="relative h-80 overflow-auto bg-gradient-to-br from-blue-50 to-white rounded-lg border">
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl text-muted-foreground mb-2">Empty List</div>
              <p className="text-sm text-muted-foreground">No nodes to display</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full p-8">
            {nodes.map((node, index) => renderNode(node, index, positions[index]))}
          </div>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 rounded border border-blue-500"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 rounded border border-green-500"></div>
          <span>New/Found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-200 rounded border border-yellow-500"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 rounded border border-red-500"></div>
          <span>Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-200 rounded"></div>
          <span>Head</span>
        </div>
        {listType === 'doubly' && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-200 rounded"></div>
            <span>Tail</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualization;
