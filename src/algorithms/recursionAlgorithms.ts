
export interface RecursionStep {
  type: 'call' | 'return' | 'calculation';
  functionName: string;
  parameters: any[];
  stackDepth: number;
  currentValue?: any;
  returnValue?: any;
  description: string;
  treeNode?: {
    id: string;
    value: number;
    x: number;
    y: number;
    parentId?: string;
  };
  hanoiState?: {
    towers: number[][];
    from?: number;
    to?: number;
    disk?: number;
    moveCount: number;
  };
}

export interface RecursionAlgorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  execute: (input: any) => RecursionStep[];
}

const fibonacci = {
  name: 'Fibonacci Sequence',
  description: 'Calculate the nth Fibonacci number using recursion. Each call branches into two recursive calls, creating a binary tree structure. The visualization shows both the call stack and the recursive tree.',
  timeComplexity: 'O(2^n)',
  spaceComplexity: 'O(n)',
  code: `function fibonacci(n) {
  // Base cases
  if (n <= 1) {
    return n;
  }
  
  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  execute: (n: number): RecursionStep[] => {
    const steps: RecursionStep[] = [];
    const nodePositions = new Map<string, { x: number; y: number }>();
    let nodeIdCounter = 0;

    const calculateNodePositions = (n: number, depth: number = 0, position: number = 0): void => {
      const nodeId = `${n}-${depth}-${position}`;
      const x = position * 100 + 300;
      const y = depth * 80 + 50;
      nodePositions.set(nodeId, { x, y });

      if (n > 1) {
        calculateNodePositions(n - 1, depth + 1, position * 2);
        calculateNodePositions(n - 2, depth + 1, position * 2 + 1);
      }
    };

    if (n <= 10) {
      calculateNodePositions(n);
    }

    const fibHelper = (num: number, depth: number = 0, nodeId: string = '0'): number => {
      const currentNodeId = `${num}-${depth}-${nodeIdCounter++}`;
      const pos = nodePositions.get(currentNodeId) || { x: 300, y: depth * 80 + 50 };

      // Function call step
      steps.push({
        type: 'call',
        functionName: 'fibonacci',
        parameters: [num],
        stackDepth: depth,
        description: `Calling fibonacci(${num})`,
        treeNode: {
          id: currentNodeId,
          value: num,
          x: pos.x,
          y: pos.y,
          parentId: depth > 0 ? nodeId : undefined
        }
      });

      if (num <= 1) {
        // Base case return
        steps.push({
          type: 'return',
          functionName: 'fibonacci',
          parameters: [num],
          stackDepth: depth,
          currentValue: num,
          returnValue: num,
          description: `Base case: fibonacci(${num}) returns ${num}`,
          treeNode: {
            id: currentNodeId,
            value: num,
            x: pos.x,
            y: pos.y,
            parentId: depth > 0 ? nodeId : undefined
          }
        });
        return num;
      }

      // Recursive calls
      const left = fibHelper(num - 1, depth + 1, currentNodeId);
      const right = fibHelper(num - 2, depth + 1, currentNodeId);
      const result = left + right;

      // Calculation step
      steps.push({
        type: 'calculation',
        functionName: 'fibonacci',
        parameters: [num],
        stackDepth: depth,
        currentValue: result,
        returnValue: result,
        description: `fibonacci(${num}) = fibonacci(${num - 1}) + fibonacci(${num - 2}) = ${left} + ${right} = ${result}`,
        treeNode: {
          id: currentNodeId,
          value: num,
          x: pos.x,
          y: pos.y,
          parentId: depth > 0 ? nodeId : undefined
        }
      });

      return result;
    };

    fibHelper(n);
    return steps;
  }
};

const towerOfHanoi = {
  name: 'Tower of Hanoi',
  description: 'Solve the Tower of Hanoi puzzle by moving all disks from the first tower to the last tower. Only one disk can be moved at a time, and a larger disk cannot be placed on top of a smaller disk.',
  timeComplexity: 'O(2^n)',
  spaceComplexity: 'O(n)',
  code: `function hanoi(n, from, to, aux) {
  if (n === 1) {
    // Base case: move the disk directly
    moveDisk(from, to);
    return;
  }
  
  // Move n-1 disks to auxiliary tower
  hanoi(n - 1, from, aux, to);
  
  // Move the bottom disk to destination
  moveDisk(from, to);
  
  // Move n-1 disks from auxiliary to destination
  hanoi(n - 1, aux, to, from);
}`,
  execute: (n: number): RecursionStep[] => {
    const steps: RecursionStep[] = [];
    const towers: number[][] = [[], [], []];
    let moveCount = 0;

    // Initialize first tower with disks (largest to smallest)
    for (let i = n; i >= 1; i--) {
      towers[0].push(i);
    }

    // Add initial state
    steps.push({
      type: 'call',
      functionName: 'hanoi',
      parameters: [n, 0, 2, 1],
      stackDepth: 0,
      description: `Initial setup: Move ${n} disks from Tower A to Tower C using Tower B`,
      hanoiState: {
        towers: towers.map(tower => [...tower]),
        moveCount
      }
    });

    const hanoiHelper = (disks: number, from: number, to: number, aux: number, depth: number = 0): void => {
      if (disks === 1) {
        // Base case: move one disk
        const disk = towers[from].pop()!;
        towers[to].push(disk);
        moveCount++;

        steps.push({
          type: 'return',
          functionName: 'hanoi',
          parameters: [disks, from, to, aux],
          stackDepth: depth,
          description: `Base case: Move disk ${disk} from Tower ${String.fromCharCode(65 + from)} to Tower ${String.fromCharCode(65 + to)}`,
          hanoiState: {
            towers: towers.map(tower => [...tower]),
            from,
            to,
            disk,
            moveCount
          }
        });
        return;
      }

      // Step 1: Move n-1 disks from source to auxiliary
      steps.push({
        type: 'call',
        functionName: 'hanoi',
        parameters: [disks - 1, from, aux, to],
        stackDepth: depth + 1,
        description: `Step 1: Move ${disks - 1} disks from Tower ${String.fromCharCode(65 + from)} to Tower ${String.fromCharCode(65 + aux)}`,
        hanoiState: {
          towers: towers.map(tower => [...tower]),
          moveCount
        }
      });
      
      hanoiHelper(disks - 1, from, aux, to, depth + 1);

      // Step 2: Move the bottom disk from source to destination
      const disk = towers[from].pop()!;
      towers[to].push(disk);
      moveCount++;

      steps.push({
        type: 'calculation',
        functionName: 'hanoi',
        parameters: [disks, from, to, aux],
        stackDepth: depth,
        description: `Step 2: Move disk ${disk} from Tower ${String.fromCharCode(65 + from)} to Tower ${String.fromCharCode(65 + to)}`,
        hanoiState: {
          towers: towers.map(tower => [...tower]),
          from,
          to,
          disk,
          moveCount
        }
      });

      // Step 3: Move n-1 disks from auxiliary to destination
      steps.push({
        type: 'call',
        functionName: 'hanoi',
        parameters: [disks - 1, aux, to, from],
        stackDepth: depth + 1,
        description: `Step 3: Move ${disks - 1} disks from Tower ${String.fromCharCode(65 + aux)} to Tower ${String.fromCharCode(65 + to)}`,
        hanoiState: {
          towers: towers.map(tower => [...tower]),
          moveCount
        }
      });

      hanoiHelper(disks - 1, aux, to, from, depth + 1);
    };

    hanoiHelper(n, 0, 2, 1);
    return steps;
  }
};

export const recursionAlgorithms: Record<string, RecursionAlgorithm> = {
  fibonacci,
  hanoi: towerOfHanoi
};
