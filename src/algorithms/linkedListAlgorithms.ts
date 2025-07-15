
export interface LinkedListNode {
  value: number;
  next: number | null;
  prev?: number | null; // for doubly linked lists
}

export interface LinkedListStep {
  type: 'insert' | 'search' | 'delete' | 'traverse';
  operation: string;
  nodes: LinkedListNode[];
  head: number | null;
  tail?: number | null; // for doubly and circular lists
  currentNode: number | null;
  targetNode?: number | null;
  newNode?: number | null;
  message: string;
  comparing?: number[];
  found?: boolean;
  completed?: boolean;
}

export interface LinkedListAlgorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  execute: (initialNodes: LinkedListNode[], operation: 'insert' | 'search' | 'delete', value: number, position?: number) => LinkedListStep[];
}

// Helper function to create a deep copy of nodes
const cloneNodes = (nodes: LinkedListNode[]): LinkedListNode[] => {
  return nodes.map(node => ({ ...node }));
};

// Helper function to find next available index
const getNextIndex = (nodes: LinkedListNode[]): number => {
  return nodes.length;
};

// Singly Linked List Operations
const singlyLinkedList: LinkedListAlgorithm = {
  name: "Singly Linked List",
  description: "A linear data structure where each node contains data and a reference to the next node.",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(data, position = 0) {
    const newNode = new Node(data);
    
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      if (current.next) {
        current = current.next;
      }
    }
    
    newNode.next = current.next;
    current.next = newNode;
  }
  
  search(data) {
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.data === data) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }
  
  delete(data) {
    if (!this.head) return false;
    
    if (this.head.data === data) {
      this.head = this.head.next;
      return true;
    }
    
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    
    return false;
  }
}`,
  execute: (initialNodes: LinkedListNode[], operation: 'insert' | 'search' | 'delete', value: number, position = 0) => {
    const steps: LinkedListStep[] = [];
    let nodes = cloneNodes(initialNodes);
    let head = nodes.length > 0 ? 0 : null;

    // Find actual head
    if (nodes.length > 0) {
      head = 0;
      for (let i = 0; i < nodes.length; i++) {
        let isHead = true;
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].next === i) {
            isHead = false;
            break;
          }
        }
        if (isHead) {
          head = i;
          break;
        }
      }
    }

    steps.push({
      type: operation,
      operation: `Starting ${operation} operation`,
      nodes: cloneNodes(nodes),
      head,
      currentNode: null,
      message: `Initial state of singly linked list`
    });

    if (operation === 'insert') {
      const newIndex = getNextIndex(nodes);
      const newNode: LinkedListNode = { value, next: null };

      if (position === 0 || head === null) {
        // Insert at beginning
        newNode.next = head;
        nodes.push(newNode);
        head = newIndex;
        
        steps.push({
          type: 'insert',
          operation: 'Insert at head',
          nodes: cloneNodes(nodes),
          head,
          currentNode: newIndex,
          newNode: newIndex,
          message: `Inserted ${value} at the beginning`
        });
      } else {
        // Insert at specific position
        let current = head;
        let currentStep = 0;
        
        while (current !== null && currentStep < position - 1) {
          steps.push({
            type: 'insert',
            operation: 'Traverse to position',
            nodes: cloneNodes(nodes),
            head,
            currentNode: current,
            message: `Traversing to position ${position}, currently at step ${currentStep + 1}`
          });
          
          current = nodes[current].next;
          currentStep++;
        }
        
        if (current !== null) {
          newNode.next = nodes[current].next;
          nodes[current].next = newIndex;
          nodes.push(newNode);
          
          steps.push({
            type: 'insert',
            operation: 'Insert at position',
            nodes: cloneNodes(nodes),
            head,
            currentNode: current,
            newNode: newIndex,
            message: `Inserted ${value} at position ${position}`
          });
        }
      }
    } else if (operation === 'search') {
      let current = head;
      let position = 0;
      let found = false;
      
      while (current !== null) {
        const isMatch = nodes[current].value === value;
        
        steps.push({
          type: 'search',
          operation: 'Compare values',
          nodes: cloneNodes(nodes),
          head,
          currentNode: current,
          comparing: [current],
          found: isMatch,
          message: `Comparing ${nodes[current].value} with ${value} at position ${position}${isMatch ? ' - Found!' : ''}`
        });
        
        if (isMatch) {
          found = true;
          break;
        }
        
        current = nodes[current].next;
        position++;
      }
      
      steps.push({
        type: 'search',
        operation: 'Search complete',
        nodes: cloneNodes(nodes),
        head,
        currentNode: null,
        found,
        completed: true,
        message: found ? `Found ${value} at position ${position}` : `${value} not found in the list`
      });
    } else if (operation === 'delete') {
      let found = false;
      
      if (head !== null && nodes[head].value === value) {
        // Delete head
        steps.push({
          type: 'delete',
          operation: 'Delete head',
          nodes: cloneNodes(nodes),
          head,
          currentNode: head,
          targetNode: head,
          message: `Deleting head node with value ${value}`
        });
        
        head = nodes[head].next;
        nodes = nodes.filter((_, index) => index !== 0);
        
        // Adjust indices
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].next !== null && nodes[i].next > 0) {
            nodes[i].next = nodes[i].next - 1;
          }
        }
        if (head !== null && head > 0) {
          head = head - 1;
        }
        
        found = true;
      } else if (head !== null) {
        // Delete from middle or end
        let current = head;
        
        while (current !== null && nodes[current].next !== null) {
          steps.push({
            type: 'delete',
            operation: 'Search for node to delete',
            nodes: cloneNodes(nodes),
            head,
            currentNode: current,
            comparing: [nodes[current].next],
            message: `Checking if next node (${nodes[nodes[current].next!].value}) should be deleted`
          });
          
          if (nodes[nodes[current].next!].value === value) {
            const nodeToDelete = nodes[current].next!;
            
            steps.push({
              type: 'delete',
              operation: 'Delete node',
              nodes: cloneNodes(nodes),
              head,
              currentNode: current,
              targetNode: nodeToDelete,
              message: `Deleting node with value ${value}`
            });
            
            nodes[current].next = nodes[nodeToDelete].next;
            found = true;
            break;
          }
          
          current = nodes[current].next;
        }
      }
      
      steps.push({
        type: 'delete',
        operation: 'Delete complete',
        nodes: cloneNodes(nodes),
        head,
        currentNode: null,
        found,
        completed: true,
        message: found ? `Successfully deleted ${value}` : `${value} not found in the list`
      });
    }

    return steps;
  }
};

// Doubly Linked List Operations
const doublyLinkedList: LinkedListAlgorithm = {
  name: "Doubly Linked List",
  description: "A linear data structure where each node contains data and references to both next and previous nodes.",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  insert(data, position = 0) {
    const newNode = new Node(data);
    
    if (position === 0) {
      if (this.head) {
        newNode.next = this.head;
        this.head.prev = newNode;
      } else {
        this.tail = newNode;
      }
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      if (current.next) {
        current = current.next;
      }
    }
    
    newNode.next = current.next;
    newNode.prev = current;
    
    if (current.next) {
      current.next.prev = newNode;
    } else {
      this.tail = newNode;
    }
    
    current.next = newNode;
  }
  
  search(data) {
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.data === data) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }
  
  delete(data) {
    let current = this.head;
    
    while (current) {
      if (current.data === data) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        
        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        
        return true;
      }
      current = current.next;
    }
    
    return false;
  }
}`,
  execute: (initialNodes: LinkedListNode[], operation: 'insert' | 'search' | 'delete', value: number, position = 0) => {
    const steps: LinkedListStep[] = [];
    let nodes = cloneNodes(initialNodes);
    let head = nodes.length > 0 ? 0 : null;
    let tail = nodes.length > 0 ? nodes.length - 1 : null;

    // Find actual head and tail for doubly linked list
    if (nodes.length > 0) {
      head = null;
      tail = null;
      
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].prev === null || nodes[i].prev === undefined) {
          head = i;
        }
        if (nodes[i].next === null || nodes[i].next === undefined) {
          tail = i;
        }
      }
      
      if (head === null) head = 0;
      if (tail === null) tail = nodes.length - 1;
    }

    steps.push({
      type: operation,
      operation: `Starting ${operation} operation`,
      nodes: cloneNodes(nodes),
      head,
      tail,
      currentNode: null,
      message: `Initial state of doubly linked list`
    });

    if (operation === 'insert') {
      const newIndex = getNextIndex(nodes);
      const newNode: LinkedListNode = { value, next: null, prev: null };

      if (position === 0 || head === null) {
        // Insert at beginning
        if (head !== null) {
          newNode.next = head;
          nodes[head].prev = newIndex;
        } else {
          tail = newIndex;
        }
        head = newIndex;
        nodes.push(newNode);
        
        steps.push({
          type: 'insert',
          operation: 'Insert at head',
          nodes: cloneNodes(nodes),
          head,
          tail,
          currentNode: newIndex,
          newNode: newIndex,
          message: `Inserted ${value} at the beginning`
        });
      } else {
        // Insert at specific position
        let current = head;
        let currentStep = 0;
        
        while (current !== null && currentStep < position - 1) {
          steps.push({
            type: 'insert',
            operation: 'Traverse to position',
            nodes: cloneNodes(nodes),
            head,
            tail,
            currentNode: current,
            message: `Traversing to position ${position}, currently at step ${currentStep + 1}`
          });
          
          current = nodes[current].next;
          currentStep++;
        }
        
        if (current !== null) {
          newNode.next = nodes[current].next;
          newNode.prev = current;
          
          if (nodes[current].next !== null) {
            nodes[nodes[current].next].prev = newIndex;
          } else {
            tail = newIndex;
          }
          
          nodes[current].next = newIndex;
          nodes.push(newNode);
          
          steps.push({
            type: 'insert',
            operation: 'Insert at position',
            nodes: cloneNodes(nodes),
            head,
            tail,
            currentNode: current,
            newNode: newIndex,
            message: `Inserted ${value} at position ${position}`
          });
        }
      }
    } else if (operation === 'search') {
      let current = head;
      let position = 0;
      let found = false;
      
      while (current !== null) {
        const isMatch = nodes[current].value === value;
        
        steps.push({
          type: 'search',
          operation: 'Compare values',
          nodes: cloneNodes(nodes),
          head,
          tail,
          currentNode: current,
          comparing: [current],
          found: isMatch,
          message: `Comparing ${nodes[current].value} with ${value} at position ${position}${isMatch ? ' - Found!' : ''}`
        });
        
        if (isMatch) {
          found = true;
          break;
        }
        
        current = nodes[current].next;
        position++;
      }
      
      steps.push({
        type: 'search',
        operation: 'Search complete',
        nodes: cloneNodes(nodes),
        head,
        tail,
        currentNode: null,
        found,
        completed: true,
        message: found ? `Found ${value} at position ${position}` : `${value} not found in the list`
      });
    } else if (operation === 'delete') {
      let current = head;
      let found = false;
      
      while (current !== null) {
        steps.push({
          type: 'delete',
          operation: 'Search for node to delete',
          nodes: cloneNodes(nodes),
          head,
          tail,
          currentNode: current,
          comparing: [current],
          message: `Checking if node (${nodes[current].value}) should be deleted`
        });
        
        if (nodes[current].value === value) {
          steps.push({
            type: 'delete',
            operation: 'Delete node',
            nodes: cloneNodes(nodes),
            head,
            tail,
            currentNode: current,
            targetNode: current,
            message: `Deleting node with value ${value}`
          });
          
          // Update prev node
          if (nodes[current].prev !== null) {
            nodes[nodes[current].prev].next = nodes[current].next;
          } else {
            head = nodes[current].next;
          }
          
          // Update next node
          if (nodes[current].next !== null) {
            nodes[nodes[current].next].prev = nodes[current].prev;
          } else {
            tail = nodes[current].prev;
          }
          
          found = true;
          break;
        }
        
        current = nodes[current].next;
      }
      
      steps.push({
        type: 'delete',
        operation: 'Delete complete',
        nodes: cloneNodes(nodes),
        head,
        tail,
        currentNode: null,
        found,
        completed: true,
        message: found ? `Successfully deleted ${value}` : `${value} not found in the list`
      });
    }

    return steps;
  }
};

// Circular Linked List Operations
const circularLinkedList: LinkedListAlgorithm = {
  name: "Circular Linked List",
  description: "A linked list where the last node points back to the first node, forming a circle.",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
  }
  
  insert(data, position = 0) {
    const newNode = new Node(data);
    
    if (!this.head) {
      newNode.next = newNode;
      this.head = newNode;
      return;
    }
    
    if (position === 0) {
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next;
      }
      newNode.next = this.head;
      current.next = newNode;
      this.head = newNode;
      return;
    }
    
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
      if (current === this.head) break;
    }
    
    newNode.next = current.next;
    current.next = newNode;
  }
  
  search(data) {
    if (!this.head) return -1;
    
    let current = this.head;
    let position = 0;
    
    do {
      if (current.data === data) {
        return position;
      }
      current = current.next;
      position++;
    } while (current !== this.head);
    
    return -1;
  }
  
  delete(data) {
    if (!this.head) return false;
    
    if (this.head.data === data) {
      if (this.head.next === this.head) {
        this.head = null;
      } else {
        let current = this.head;
        while (current.next !== this.head) {
          current = current.next;
        }
        current.next = this.head.next;
        this.head = this.head.next;
      }
      return true;
    }
    
    let current = this.head;
    do {
      if (current.next.data === data) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    } while (current !== this.head);
    
    return false;
  }
}`,
  execute: (initialNodes: LinkedListNode[], operation: 'insert' | 'search' | 'delete', value: number, position = 0) => {
    const steps: LinkedListStep[] = [];
    let nodes = cloneNodes(initialNodes);
    let head = nodes.length > 0 ? 0 : null;

    // Set up circular connections if nodes exist
    if (nodes.length > 0) {
      // Find head (first node)
      head = 0;
      // Ensure last node points to head for circular property
      if (nodes.length > 1) {
        const lastNodeIndex = nodes.length - 1;
        nodes[lastNodeIndex].next = head;
      } else {
        nodes[0].next = 0; // single node points to itself
      }
    }

    steps.push({
      type: operation,
      operation: `Starting ${operation} operation`,
      nodes: cloneNodes(nodes),
      head,
      currentNode: null,
      message: `Initial state of circular linked list`
    });

    if (operation === 'insert') {
      const newIndex = getNextIndex(nodes);
      const newNode: LinkedListNode = { value, next: null };

      if (head === null) {
        // First node in empty list
        newNode.next = newIndex; // points to itself
        nodes.push(newNode);
        head = newIndex;
        
        steps.push({
          type: 'insert',
          operation: 'Insert first node',
          nodes: cloneNodes(nodes),
          head,
          currentNode: newIndex,
          newNode: newIndex,
          message: `Inserted ${value} as the first node (points to itself)`
        });
      } else if (position === 0) {
        // Insert at beginning
        let current = head;
        while (nodes[current].next !== head) {
          current = nodes[current].next!;
        }
        
        newNode.next = head;
        nodes[current].next = newIndex;
        nodes.push(newNode);
        head = newIndex;
        
        steps.push({
          type: 'insert',
          operation: 'Insert at head',
          nodes: cloneNodes(nodes),
          head,
          currentNode: newIndex,
          newNode: newIndex,
          message: `Inserted ${value} at the beginning`
        });
      } else {
        // Insert at specific position
        let current = head;
        let currentStep = 0;
        
        while (currentStep < position - 1) {
          steps.push({
            type: 'insert',
            operation: 'Traverse to position',
            nodes: cloneNodes(nodes),
            head,
            currentNode: current,
            message: `Traversing to position ${position}, currently at step ${currentStep + 1}`
          });
          
          current = nodes[current].next!;
          if (current === head) break; // prevent infinite loop
          currentStep++;
        }
        
        newNode.next = nodes[current].next;
        nodes[current].next = newIndex;
        nodes.push(newNode);
        
        steps.push({
          type: 'insert',
          operation: 'Insert at position',
          nodes: cloneNodes(nodes),
          head,
          currentNode: current,
          newNode: newIndex,
          message: `Inserted ${value} at position ${position}`
        });
      }
    } else if (operation === 'search') {
      if (head === null) {
        steps.push({
          type: 'search',
          operation: 'Search complete',
          nodes: cloneNodes(nodes),
          head,
          currentNode: null,
          found: false,
          completed: true,
          message: `List is empty, ${value} not found`
        });
      } else {
        let current = head;
        let position = 0;
        let found = false;
        
        do {
          const isMatch = nodes[current].value === value;
          
          steps.push({
            type: 'search',
            operation: 'Compare values',
            nodes: cloneNodes(nodes),
            head,
            currentNode: current,
            comparing: [current],
            found: isMatch,
            message: `Comparing ${nodes[current].value} with ${value} at position ${position}${isMatch ? ' - Found!' : ''}`
          });
          
          if (isMatch) {
            found = true;
            break;
          }
          
          current = nodes[current].next!;
          position++;
        } while (current !== head);
        
        steps.push({
          type: 'search',
          operation: 'Search complete',
          nodes: cloneNodes(nodes),
          head,
          currentNode: null,
          found,
          completed: true,
          message: found ? `Found ${value} at position ${position}` : `${value} not found in the list`
        });
      }
    } else if (operation === 'delete') {
      let found = false;
      
      if (head === null) {
        steps.push({
          type: 'delete',
          operation: 'Delete complete',
          nodes: cloneNodes(nodes),
          head,
          currentNode: null,
          found: false,
          completed: true,
          message: `List is empty, nothing to delete`
        });
      } else if (nodes[head].value === value) {
        // Delete head
        steps.push({
          type: 'delete',
          operation: 'Delete head',
          nodes: cloneNodes(nodes),
          head,
          currentNode: head,
          targetNode: head,
          message: `Deleting head node with value ${value}`
        });
        
        if (nodes[head].next === head) {
          // Only one node
          head = null;
          nodes = [];
        } else {
          // Find the last node to update its next pointer
          let current = head;
          while (nodes[current].next !== head) {
            current = nodes[current].next!;
          }
          nodes[current].next = nodes[head].next;
          head = nodes[head].next;
        }
        
        found = true;
      } else {
        // Delete from middle or end
        let current = head;
        
        do {
          steps.push({
            type: 'delete',
            operation: 'Search for node to delete',
            nodes: cloneNodes(nodes),
            head,
            currentNode: current,
            comparing: [nodes[current].next!],
            message: `Checking if next node (${nodes[nodes[current].next!].value}) should be deleted`
          });
          
          if (nodes[nodes[current].next!].value === value) {
            const nodeToDelete = nodes[current].next!;
            
            steps.push({
              type: 'delete',
              operation: 'Delete node',
              nodes: cloneNodes(nodes),
              head,
              currentNode: current,
              targetNode: nodeToDelete,
              message: `Deleting node with value ${value}`
            });
            
            nodes[current].next = nodes[nodeToDelete].next;
            found = true;
            break;
          }
          
          current = nodes[current].next!;
        } while (current !== head);
      }
      
      steps.push({
        type: 'delete',
        operation: 'Delete complete',
        nodes: cloneNodes(nodes),
        head,
        currentNode: null,
        found,
        completed: true,
        message: found ? `Successfully deleted ${value}` : `${value} not found in the list`
      });
    }

    return steps;
  }
};

export const linkedListAlgorithms: Record<string, LinkedListAlgorithm> = {
  singly: singlyLinkedList,
  doubly: doublyLinkedList,
  circular: circularLinkedList,
};
