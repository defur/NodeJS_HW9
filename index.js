// Stack
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Queue 
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.shift();
    }
    peek() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

// Binary Tree
class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value, node = this.root) {
        if (!this.root) return this.root = { value, left: null, right: null };
        if (value < node.value) {
            if (!node.left) node.left = { value, left: null, right: null };
            else this.insert(value, node.left);
        } else {
            if (!node.right) node.right = { value, left: null, right: null };
            else this.insert(value, node.right);
        }
    }

    search(value, node = this.root) {
        if (!node) return false;
        if (node.value === value) return true;
        return value < node.value ? this.search(value, node.left) : this.search(value, node.right);
    }

    inOrder(node = this.root) {
        if (!node) return;
        this.inOrder(node.left);
        console.log(node.value);
        this.inOrder(node.right);
    }
}

// Graph
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1); 
    }

    DFS(start, visited = new Set()) {
        if (!start) return;
        console.log(start);
        visited.add(start);
        this.adjacencyList[start].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                this.DFS(neighbor, visited);
            }
        });
    }

    BFS(start) {
        const queue = [start];
        const visited = new Set([start]);

        while (queue.length) {
            const vertex = queue.shift();
            console.log(vertex);
            this.adjacencyList[vertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }
    }
}

// Linked List 
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    delete(value) {
        if (!this.head) return;
        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }
        let current = this.head;
        while (current.next && current.next.value !== value) {
            current = current.next;
        }
        if (current.next) {
            current.next = current.next.next;
        }
    }

    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;
        }
        return false;
    }
}

// Min/Max Stack
class MinMaxStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
        this.maxStack = [];
    }

    push(value) {
        this.stack.push(value);
        if (this.minStack.length === 0 || value <= this.getMin()) {
            this.minStack.push(value);
        }
        if (this.maxStack.length === 0 || value >= this.getMax()) {
            this.maxStack.push(value);
        }
    }

    pop() {
        const value = this.stack.pop();
        if (value === this.getMin()) this.minStack.pop();
        if (value === this.getMax()) this.maxStack.pop();
        return value;
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }

    getMax() {
        return this.maxStack[this.maxStack.length - 1];
    }
}

// BST check
function isBST(node, min = -Infinity, max = Infinity) {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return isBST(node.left, min, node.value) &&
           isBST(node.right, node.value, max);
}

// BFS Shortest Path
function bfsShortestPath(graph, start, end) {
    const queue = [[start]];
    const visited = new Set();

    while (queue.length) {
        const path = queue.shift();
        const vertex = path[path.length - 1];

        if (vertex === end) return path;
        if (!visited.has(vertex)) {
            visited.add(vertex);
            graph.adjacencyList[vertex].forEach(neighbor => {
                const newPath = [...path, neighbor];
                queue.push(newPath);
            });
        }
    }
    return null;
}

// Linked List Cycle Detection
function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// DEMO
const stack = new Stack();
stack.push(1);
stack.push(2);
console.log("Stack pop:", stack.pop()); // 2
console.log("Stack peek:", stack.peek()); // 1

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log("Queue dequeue:", queue.dequeue()); // 10

const tree = new BinaryTree();
tree.insert(5);
tree.insert(3);
tree.insert(7);
console.log("InOrder Tree:");
tree.inOrder();
console.log("Is BST?", isBST(tree.root)); // true

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("B", "C");
console.log("DFS Graph:");
graph.DFS("A");
console.log("Shortest path A->C:", bfsShortestPath(graph, "A", "C"));

const list = new LinkedList();
list.insert(1);
list.insert(2);
list.insert(3);
console.log("LinkedList search(2):", list.search(2));

const mmStack = new MinMaxStack();
mmStack.push(3);
mmStack.push(1);
mmStack.push(5);
console.log("Min in stack:", mmStack.getMin()); // 1
console.log("Max in stack:", mmStack.getMax()); // 5


