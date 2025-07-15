
export interface SearchStep {
  index: number;
  comparison: boolean;
  found: boolean;
  description: string;
  currentElement?: number;
  left?: number;
  right?: number;
  mid?: number;
  jumpSize?: number;
}

export interface SearchAlgorithm {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  code: string;
  execute: (arr: number[], target: number) => SearchStep[];
}

// Linear Search Implementation
const linearSearchSteps = (arr: number[], target: number): SearchStep[] => {
  const steps: SearchStep[] = [];
  
  for (let i = 0; i < arr.length; i++) {
    steps.push({
      index: i,
      comparison: true,
      found: arr[i] === target,
      description: `Comparing element at index ${i} (${arr[i]}) with target ${target}`,
      currentElement: arr[i]
    });
    
    if (arr[i] === target) {
      steps.push({
        index: i,
        comparison: false,
        found: true,
        description: `Found target ${target} at index ${i}!`,
        currentElement: arr[i]
      });
      return steps;
    }
  }
  
  steps.push({
    index: -1,
    comparison: false,
    found: false,
    description: `Target ${target} not found in the array`,
  });
  
  return steps;
};

// Binary Search Implementation
const binarySearchSteps = (arr: number[], target: number): SearchStep[] => {
  arr.sort((a,b) => a-b);
  const steps: SearchStep[] = [];
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      index: mid,
      comparison: true,
      found: false,
      description: `Checking middle element at index ${mid} (${arr[mid]}) with target ${target}`,
      currentElement: arr[mid],
      left,
      right,
      mid
    });
    
    if (arr[mid] === target) {
      steps.push({
        index: mid,
        comparison: false,
        found: true,
        description: `Found target ${target} at index ${mid}!`,
        currentElement: arr[mid],
        left,
        right,
        mid
      });
      return steps;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        index: mid,
        comparison: false,
        found: false,
        description: `${arr[mid]} < ${target}, searching right half`,
        currentElement: arr[mid],
        left,
        right,
        mid
      });
    } else {
      right = mid - 1;
      steps.push({
        index: mid,
        comparison: false,
        found: false,
        description: `${arr[mid]} > ${target}, searching left half`,
        currentElement: arr[mid],
        left,
        right,
        mid
      });
    }
  }
  
  steps.push({
    index: -1,
    comparison: false,
    found: false,
    description: `Target ${target} not found in the array`,
    left,
    right
  });
  
  return steps;
};

// Jump Search Implementation
const jumpSearchSteps = (arr: number[], target: number): SearchStep[] => {
  const steps: SearchStep[] = [];
  const n = arr.length;
  const jumpSize = Math.floor(Math.sqrt(n));
  let prev = 0;
  let step = jumpSize;
  
  // Jump through blocks
  while (arr[Math.min(step, n) - 1] < target) {
    steps.push({
      index: Math.min(step, n) - 1,
      comparison: true,
      found: false,
      description: `Jumping: checking element at index ${Math.min(step, n) - 1} (${arr[Math.min(step, n) - 1]})`,
      currentElement: arr[Math.min(step, n) - 1],
      jumpSize
    });
    
    prev = step;
    step += jumpSize;
    
    if (prev >= n) {
      steps.push({
        index: -1,
        comparison: false,
        found: false,
        description: `Target ${target} not found in the array`,
        jumpSize
      });
      return steps;
    }
  }
  
  // Linear search in the identified block
  for (let i = prev; i < Math.min(step, n); i++) {
    steps.push({
      index: i,
      comparison: true,
      found: arr[i] === target,
      description: `Linear search in block: comparing element at index ${i} (${arr[i]}) with target ${target}`,
      currentElement: arr[i],
      jumpSize
    });
    
    if (arr[i] === target) {
      steps.push({
        index: i,
        comparison: false,
        found: true,
        description: `Found target ${target} at index ${i}!`,
        currentElement: arr[i],
        jumpSize
      });
      return steps;
    }
  }
  
  steps.push({
    index: -1,
    comparison: false,
    found: false,
    description: `Target ${target} not found in the array`,
    jumpSize
  });
  
  return steps;
};

// Exponential Search Implementation
const exponentialSearchSteps = (arr: number[], target: number): SearchStep[] => {
  const steps: SearchStep[] = [];
  
  if (arr[0] === target) {
    steps.push({
      index: 0,
      comparison: true,
      found: true,
      description: `Found target ${target} at index 0!`,
      currentElement: arr[0]
    });
    return steps;
  }
  
  // Find range for binary search
  let bound = 1;
  while (bound < arr.length && arr[bound] <= target) {
    steps.push({
      index: bound,
      comparison: true,
      found: false,
      description: `Exponential search: checking element at index ${bound} (${arr[bound]})`,
      currentElement: arr[bound]
    });
    bound *= 2;
  }
  
  // Binary search in the found range
  const left = Math.floor(bound / 2);
  const right = Math.min(bound, arr.length - 1);
  
  steps.push({
    index: -1,
    comparison: false,
    found: false,
    description: `Found range [${left}, ${right}], now performing binary search`,
    left,
    right
  });
  
  // Perform binary search in the range
  const binarySteps = binarySearchInRange(arr, target, left, right);
  return [...steps, ...binarySteps];
};

const binarySearchInRange = (arr: number[], target: number, left: number, right: number): SearchStep[] => {
  const steps: SearchStep[] = [];
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      index: mid,
      comparison: true,
      found: false,
      description: `Binary search: checking middle element at index ${mid} (${arr[mid]})`,
      currentElement: arr[mid],
      left,
      right,
      mid
    });
    
    if (arr[mid] === target) {
      steps.push({
        index: mid,
        comparison: false,
        found: true,
        description: `Found target ${target} at index ${mid}!`,
        currentElement: arr[mid],
        left,
        right,
        mid
      });
      return steps;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  steps.push({
    index: -1,
    comparison: false,
    found: false,
    description: `Target ${target} not found in the array`,
    left,
    right
  });
  
  return steps;
};

export const searchAlgorithms: Record<string, SearchAlgorithm> = {
  'linear': {
    name: 'Linear Search',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Linear search checks each element sequentially until the target is found or the array is exhausted.',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
    execute: linearSearchSteps
  },
  'binary': {
    name: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Binary search works only on sorted arrays by repeatedly dividing the search space in half.',
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
    execute: binarySearchSteps
  },
  'jump': {
    name: 'Jump Search',
    timeComplexity: 'O(√n)',
    spaceComplexity: 'O(1)',
    description: 'Jump search jumps through the array in fixed steps, then performs linear search in the identified block.',
    code: `function jumpSearch(arr, target) {
  const n = arr.length;
  const jumpSize = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  while (arr[Math.min(jumpSize, n) - 1] < target) {
    prev = jumpSize;
    jumpSize += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  for (let i = prev; i < Math.min(jumpSize, n); i++) {
    if (arr[i] === target) return i;
  }
  
  return -1;
}`,
    execute: jumpSearchSteps
  },
  'exponential': {
    name: 'Exponential Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Exponential search finds a range where the element might be present, then performs binary search.',
    code: `function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  
  let bound = 1;
  while (bound < arr.length && arr[bound] <= target) {
    bound *= 2;
  }
  
  return binarySearch(arr, target, 
    Math.floor(bound / 2), 
    Math.min(bound, arr.length - 1)
  );
}`,
    execute: exponentialSearchSteps
  }
};
