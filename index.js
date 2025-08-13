// =======================
// Part 1: Data Structures
// =======================

// Stack
// Methods: push(element), pop(), peek()
class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
}

// Queue
// Methods: enqueue(element), dequeue(), peek()
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }
    dequeue() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
}

// Binary Tree
// Methods: insert(value), search(value), inOrder(), preOrder(), postOrder()
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let queue = [this.root];
        while (queue.length) {
            let current = queue.shift();
            if (!current.left) {
                current.left = newNode;
                return;
            } else if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.left, current.right);
            }
        }
    }

    search(value) {
        let queue = [this.root];
        while (queue.length) {
            let current = queue.shift();
            if (current.value === value) return true;
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return false;
    }

    inOrder(node = this.root) {
        if (node) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }
}

// Graph
// Methods: addVertex(vertex), addEdge(vertex1, vertex2), DFS(start), BFS(start)
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }
    DFS(start, visited = new Set()) {
        console.log(start);
        visited.add(start);
        for (let neighbor of this.adjacencyList[start]) {
            if (!visited.has(neighbor)) {
                this.DFS(neighbor, visited);
            }
        }
    }
    BFS(start) {
        let queue = [start];
        let visited = new Set();
        visited.add(start);
        while (queue.length) {
            let vertex = queue.shift();
            console.log(vertex);
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }
}

// Linked List
// Methods: insert(value), delete(value), search(value)
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

// ============================
// Part 2: Algorithmic Problems
// ============================

// Min/Max Stack
// Methods: push(element), pop(), getMin(), getMax()
class MinMaxStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
        this.maxStack = [];
    }
    push(element) {
        this.stack.push(element);
        if (!this.minStack.length || element <= this.getMin()) {
            this.minStack.push(element);
        }
        if (!this.maxStack.length || element >= this.getMax()) {
            this.maxStack.push(element);
        }
    }
    pop() {
        const removed = this.stack.pop();
        if (removed === this.getMin()) this.minStack.pop();
        if (removed === this.getMax()) this.maxStack.pop();
        return removed;
    }
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
    getMax() {
        return this.maxStack[this.maxStack.length - 1];
    }
}

// Check if Binary Tree is BST
function isBST(node, min = -Infinity, max = Infinity) {
    if (!node) return true;
    if (node.value <= min || node.value >= max) return false;
    return isBST(node.left, min, node.value) && isBST(node.right, node.value, max);
}

// Dijkstra's Algorithm
function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const pq = [[start, 0]];

    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    while (pq.length) {
        pq.sort((a, b) => a[1] - b[1]);
        const [current, dist] = pq.shift();
        if (visited.has(current)) continue;
        visited.add(current);
        for (let [neighbor, weight] of graph[current]) {
            let newDist = dist + weight;
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.push([neighbor, newDist]);
            }
        }
    }
    return distances;
}

// Linked List Cycle Detection (Floyd's Algorithm)
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

// =====================
// Part 3: Demonstration
// =====================

console.log("Stack Demo");
let stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.peek());
stack.pop();
console.log(stack.peek());

console.log("\nQueue Demo");
let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.peek());
queue.dequeue();
console.log(queue.peek());

console.log("\nBinary Tree Demo");
let tree = new BinaryTree();
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.inOrder();

console.log("\nGraph Demo");
let graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.DFS("A");

console.log("\nLinked List Demo");
let list = new LinkedList();
list.insert(5);
list.insert(10);
console.log(list.search(10));
list.delete(10);
console.log(list.search(10));

console.log("\nMin/Max Stack Demo");
let mmStack = new MinMaxStack();
mmStack.push(5);
mmStack.push(1);
mmStack.push(10);
console.log(mmStack.getMin());
console.log(mmStack.getMax());

console.log("\nCheck BST Demo");
let bst = new TreeNode(10);
bst.left = new TreeNode(5);
bst.right = new TreeNode(15);
console.log(isBST(bst));

console.log("\nDijkstra Demo");
const weightedGraph = {
    A: [["B", 2], ["C", 4]],
    B: [["A", 2], ["C", 1], ["D", 7]],
    C: [["A", 4], ["B", 1], ["D", 3]],
    D: [["B", 7], ["C", 3]]
};
console.log(dijkstra(weightedGraph, "A"));

console.log("\nLinked List Cycle Detection Demo");
let cycleList = new ListNode(1);
cycleList.next = new ListNode(2);
cycleList.next.next = new ListNode(3);
cycleList.next.next.next = cycleList.next;
console.log(hasCycle(cycleList));
