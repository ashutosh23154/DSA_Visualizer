export interface SortStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  description: string;
  left?: number;
  right?: number;
  mid?: number;
  buckets?: number[][];
  countArray?: number[];
  digit?: number;
  heapSize?: number;
}

export interface SortAlgorithm {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  code: string;
  execute: (arr: number[]) => SortStep[];
}

// Bubble Sort Implementation
const bubbleSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;
  
  steps.push({
    array: [...array],
    description: "Starting Bubble Sort - comparing adjacent elements",
  });
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        description: `Comparing elements at positions ${j} (${array[j]}) and ${j + 1} (${array[j + 1]})`,
      });
      
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        
        steps.push({
          array: [...array],
          swapping: [j, j + 1],
          description: `Swapping ${array[j + 1]} and ${array[j]} because ${array[j + 1]} < ${array[j]}`,
        });
      }
    }
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
      description: `Pass ${i + 1} complete. Element at position ${n - 1 - i} is in its final position`,
    });
    
    if (!swapped) break;
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: "Bubble Sort complete! Array is now sorted.",
  });
  
  return steps;
};

// Selection Sort Implementation
const selectionSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;
  
  steps.push({
    array: [...array],
    description: "Starting Selection Sort - finding minimum element in each pass",
  });
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    steps.push({
      array: [...array],
      comparing: [minIdx],
      description: `Pass ${i + 1}: Finding minimum element from position ${i} to ${n - 1}`,
    });
    
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        description: `Comparing current minimum ${array[minIdx]} with ${array[j]}`,
      });
      
      if (array[j] < array[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...array],
          comparing: [minIdx],
          description: `New minimum found: ${array[minIdx]} at position ${minIdx}`,
        });
      }
    }
    
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      steps.push({
        array: [...array],
        swapping: [i, minIdx],
        description: `Swapping ${array[i]} with ${array[minIdx]} to place minimum at position ${i}`,
      });
    }
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `Element at position ${i} is now in its final sorted position`,
    });
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: "Selection Sort complete! Array is now sorted.",
  });
  
  return steps;
};

// Insertion Sort Implementation
const insertionSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;
  
  steps.push({
    array: [...array],
    sorted: [0],
    description: "Starting Insertion Sort - first element is considered sorted",
  });
  
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    
    steps.push({
      array: [...array],
      comparing: [i],
      sorted: Array.from({ length: i }, (_, idx) => idx),
      description: `Inserting element ${key} from position ${i} into sorted portion`,
    });
    
    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        description: `${array[j]} > ${key}, shifting ${array[j]} to the right`,
      });
      
      array[j + 1] = array[j];
      j--;
      
      steps.push({
        array: [...array],
        comparing: [j + 1, j + 2],
        description: `Shifted ${array[j + 1]} to position ${j + 1}`,
      });
    }
    
    array[j + 1] = key;
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `Inserted ${key} at position ${j + 1}. First ${i + 1} elements are now sorted`,
    });
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: "Insertion Sort complete! Array is now sorted.",
  });
  
  return steps;
};

// Quick Sort Implementation
const quickSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  
  steps.push({
    array: [...array],
    description: "Starting Quick Sort - dividing array using pivot elements",
  });
  
  const quickSort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  };
  
  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    
    steps.push({
      array: [...array],
      pivot: high,
      left: low,
      right: high,
      description: `Partitioning array from ${low} to ${high}. Pivot: ${pivot} at position ${high}`,
    });
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j],
        pivot: high,
        description: `Comparing ${array[j]} with pivot ${pivot}`,
      });
      
      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          steps.push({
            array: [...array],
            swapping: [i, j],
            pivot: high,
            description: `${array[i]} < ${pivot}, swapping positions ${i} and ${j}`,
          });
        }
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      array: [...array],
      swapping: [i + 1, high],
      description: `Placing pivot ${pivot} at its correct position ${i + 1}`,
    });
    
    return i + 1;
  };
  
  quickSort(0, array.length - 1);
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Quick Sort complete! Array is now sorted.",
  });
  
  return steps;
};

// Merge Sort Implementation
const mergeSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  
  steps.push({
    array: [...array],
    description: "Starting Merge Sort - dividing array into smaller subarrays",
  });
  
  const mergeSort = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        array: [...array],
        left,
        right,
        mid,
        description: `Dividing array from ${left} to ${right}. Mid point: ${mid}`,
      });
      
      mergeSort(left, mid);
      mergeSort(mid + 1, right);
      merge(left, mid, right);
    }
  };
  
  const merge = (left: number, mid: number, right: number) => {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);
    
    steps.push({
      array: [...array],
      comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      description: `Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]`,
    });
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }
      
      steps.push({
        array: [...array],
        comparing: [k],
        description: `Placed ${array[k]} at position ${k}`,
      });
      
      k++;
    }
    
    while (i < leftArr.length) {
      array[k] = leftArr[i];
      steps.push({
        array: [...array],
        comparing: [k],
        description: `Copying remaining element ${array[k]} to position ${k}`,
      });
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      array[k] = rightArr[j];
      steps.push({
        array: [...array],
        comparing: [k],
        description: `Copying remaining element ${array[k]} to position ${k}`,
      });
      j++;
      k++;
    }
  };
  
  mergeSort(0, array.length - 1);
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Merge Sort complete! Array is now sorted.",
  });
  
  return steps;
};

// Heap Sort Implementation
const heapSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;
  
  steps.push({
    array: [...array],
    description: "Starting Heap Sort - building max heap from the array",
  });
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, steps);
  }
  
  steps.push({
    array: [...array],
    description: "Max heap built. Now extracting elements one by one",
  });
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    steps.push({
      array: [...array],
      swapping: [0, i],
      heapSize: i,
      description: `Moving maximum element ${array[i]} to position ${i}`,
    });
    
    heapify(array, i, 0, steps);
    
    steps.push({
      array: [...array],
      sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
      heapSize: i,
      description: `Element at position ${i} is now in its final position`,
    });
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: "Heap Sort complete! Array is now sorted.",
  });
  
  return steps;
};

const heapify = (array: number[], heapSize: number, rootIndex: number, steps: SortStep[]) => {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;
  
  steps.push({
    array: [...array],
    comparing: [rootIndex],
    heapSize,
    description: `Heapifying at root ${rootIndex}. Checking children at ${left} and ${right}`,
  });
  
  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }
  
  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }
  
  if (largest !== rootIndex) {
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
    steps.push({
      array: [...array],
      swapping: [rootIndex, largest],
      heapSize,
      description: `Swapping ${array[rootIndex]} with ${array[largest]} to maintain heap property`,
    });
    
    heapify(array, heapSize, largest, steps);
  }
};

// Counting Sort Implementation
const countingSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  
  steps.push({
    array: [...array],
    description: `Starting Counting Sort. Range: ${min} to ${max}`,
  });
  
  // Create count array
  const count = new Array(range).fill(0);
  
  // Count occurrences
  for (let i = 0; i < n; i++) {
    count[array[i] - min]++;
    steps.push({
      array: [...array],
      comparing: [i],
      countArray: [...count],
      description: `Counting element ${array[i]} at position ${i}`,
    });
  }
  
  steps.push({
    array: [...array],
    countArray: [...count],
    description: "Count array created. Now building the sorted array",
  });
  
  // Modify count array to store actual positions
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  const output = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min]--;
    
    steps.push({
      array: [...output],
      comparing: [count[array[i] - min]],
      description: `Placing ${array[i]} at position ${count[array[i] - min]}`,
    });
  }
  
  // Copy output array to original array
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: "Counting Sort complete! Array is now sorted.",
  });
  
  return steps;
};

// Radix Sort Implementation
const radixSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const max = Math.max(...array);
  
  steps.push({
    array: [...array],
    description: `Starting Radix Sort. Maximum number: ${max}`,
  });
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(array, exp, steps);
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Radix Sort complete! Array is now sorted.",
  });
  
  return steps;
};

const countingSortByDigit = (array: number[], exp: number, steps: SortStep[]) => {
  const n = array.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  const digit = Math.log10(exp);
  
  steps.push({
    array: [...array],
    digit,
    description: `Sorting by digit at position ${digit} (10^${Math.log10(exp)})`,
  });
  
  // Store count of occurrences
  for (let i = 0; i < n; i++) {
    const digitValue = Math.floor(array[i] / exp) % 10;
    count[digitValue]++;
    steps.push({
      array: [...array],
      comparing: [i],
      digit,
      description: `Counting digit ${digitValue} from number ${array[i]}`,
    });
  }
  
  // Change count[i] to actual position
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digitValue = Math.floor(array[i] / exp) % 10;
    output[count[digitValue] - 1] = array[i];
    count[digitValue]--;
  }
  
  // Copy output array to original
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
  }
  
  steps.push({
    array: [...array],
    digit,
    description: `Completed sorting by digit at position ${digit}`,
  });
};

// Bucket Sort Implementation
const bucketSortSteps = (arr: number[]): SortStep[] => {
  const steps: SortStep[] = [];
  const array = [...arr];
  const n = array.length;
  
  if (n <= 0) return steps;
  
  const max = Math.max(...array);
  const min = Math.min(...array);
  const bucketCount = Math.floor(Math.sqrt(n));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);
  
  steps.push({
    array: [...array],
    description: `Starting Bucket Sort with ${bucketCount} buckets`,
  });
  
  // Create buckets
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
  
  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.floor((array[i] - min) / bucketSize);
    const safeBucketIndex = Math.min(bucketIndex, bucketCount - 1);
    buckets[safeBucketIndex].push(array[i]);
    
    steps.push({
      array: [...array],
      comparing: [i],
      buckets: buckets.map(bucket => [...bucket]),
      description: `Placing ${array[i]} into bucket ${safeBucketIndex}`,
    });
  }
  
  steps.push({
    array: [...array],
    buckets: buckets.map(bucket => [...bucket]),
    description: "All elements distributed into buckets. Now sorting individual buckets",
  });
  
  // Sort individual buckets and concatenate
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      buckets[i].sort((a, b) => a - b);
      
      for (let j = 0; j < buckets[i].length; j++) {
        array[index++] = buckets[i][j];
      }
      
      steps.push({
        array: [...array],
        buckets: buckets.map(bucket => [...bucket]),
        description: `Sorted bucket ${i} and merged back to array`,
      });
    }
  }
  
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: "Bucket Sort complete! Array is now sorted.",
  });
  
  return steps;
};

export const sortAlgorithms: Record<string, SortAlgorithm> = {
  'bubble': {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    execute: bubbleSortSteps
  },
  'selection': {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Selection sort finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
    code: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
    execute: selectionSortSteps
  },
  'insertion': {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Insertion sort builds the final sorted array one item at a time by inserting each element into its correct position.',
    code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    execute: insertionSortSteps
  },
  'quick': {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Quick sort uses divide-and-conquer by selecting a pivot element and partitioning the array around it.',
    code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    execute: quickSortSteps
  },
  'merge': {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Merge sort divides the array into halves, sorts them separately, and then merges the sorted halves.',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    execute: mergeSortSteps
  },
  'heap': {
    name: 'Heap Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Heap sort builds a max heap from the array and repeatedly extracts the maximum element.',
    code: `function heapSort(arr) {
  buildMaxHeap(arr);
  
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;
}

function buildMaxHeap(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
}

function heapify(arr, rootIndex, heapSize) {
  let largest = rootIndex;
  let left = 2 * rootIndex + 1;
  let right = 2 * rootIndex + 2;
  
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }
  
  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapify(arr, largest, heapSize);
  }
}`,
    execute: heapSortSteps
  },
  'counting': {
    name: 'Counting Sort',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    description: 'Counting sort counts the occurrences of each element and uses this information to place elements in sorted order.',
    code: `function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  // Modify count array
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  return output;
}`,
    execute: countingSortSteps
  },
  'radix': {
    name: 'Radix Sort',
    timeComplexity: 'O(d × n)',
    spaceComplexity: 'O(n + k)',
    description: 'Radix sort processes digits from least significant to most significant, using counting sort for each digit.',
    code: `function radixSort(arr) {
  const max = Math.max(...arr);
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }
  
  return arr;
}

function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Count occurrences of digits
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }
  
  // Change count[i] to actual position
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy output to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
    execute: radixSortSteps
  },
  'bucket': {
    name: 'Bucket Sort',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n × k)',
    description: 'Bucket sort distributes elements into buckets, sorts individual buckets, and concatenates them.',
    code: `function bucketSort(arr) {
  if (arr.length <= 0) return arr;
  
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);
  
  // Create buckets
  const buckets = Array.from({ length: bucketCount }, () => []);
  
  // Distribute elements into buckets
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
    const safeBucketIndex = Math.min(bucketIndex, bucketCount - 1);
    buckets[safeBucketIndex].push(arr[i]);
  }
  
  // Sort individual buckets and concatenate
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    buckets[i].sort((a, b) => a - b);
    for (let j = 0; j < buckets[i].length; j++) {
      arr[index++] = buckets[i][j];
    }
  }
  
  return arr;
}`,
    execute: bucketSortSteps
  }
};
