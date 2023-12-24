class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    get isEmpty() {
        return !this.heap.length;
    }

    enqueue(value) {
        this.heap.push(value);

        this.#siftUp(this.heap.length - 1);
    }

    dequeue() {
        const result = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();

        this.#siftDown(0);

        return result;
    }

    #siftUp(index) {
        if (index === 0) {
            return;
        }

        const parentIndex = Math.floor((index - 1) / 2);

        if (compare(this.heap[parentIndex][0], this.heap[index][0]) > 0) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];

            this.#siftUp(parentIndex);
        }
    }

    #siftDown(index) {
        const left = 2 * index + 1;
        const right = left + 1;

        if (left >= this.heap.length) {
            return;
        }

        let indexLargest = left;
        if (right < this.heap.length && compare(this.heap[left][0], this.heap[right][0]) > 0) {
            indexLargest = right;
        }

        if (compare(this.heap[index][0], this.heap[indexLargest][0]) > 0) {
            [this.heap[index], this.heap[indexLargest]] = [this.heap[indexLargest], this.heap[index]];

            this.#siftDown(indexLargest);
        }
    }
}

class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = "";
    }
}

const compare = (a, b) => b - a;

const spanningTree = (V, E, edges) => {
    // Create an adjacency list representation of the graph
    const adj = new Array(V).fill(null).map(() => []);

    for (let i = 0; i < E; i++) {
        const [u, v, wt] = edges[i];

        adj[u].push([v, wt]);
        adj[v].push([u, wt]);
    }

    const pq = new PriorityQueue();

    // Create a visited array to keep track of visited vertices
    const visited = new Array(V).fill(false);

    // Max sum of edge weights
    let max = 0;

    // Start with vertex 0
    pq.enqueue([0, 0]);

    // Perform Prim's algorithm to find the Maximum Spanning Tree
    while (!pq.isEmpty) {
        const p = pq.dequeue();

        const wt = p[0];
        const u = p[1];

        if (visited[u]) {
            continue;
        }

        max += wt;
        visited[u] = true;

        // Explore the adjacent vertices
        for (const v of adj[u]) {
            // v[0] represents the vertex and v[1] represents the edge weight
            if (!visited[v[0]]) {
                pq.enqueue([v[1], v[0]]); // Add the adjacent edge to the priority queue
            }
        }
    }

    if (visited.some((item) => item === false)) {
        throw new Exception("Oops! I did it again");
    }

    return max;
};

const graph = [];
let verticesNumber,
    edgesNumber,
    edgesCounter = 0;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (!verticesNumber && !edgesNumber) {
        [verticesNumber, edgesNumber] = line.split(" ").map((item) => +item);

        if (edgesNumber) {
            return;
        }
    }

    if (edgesCounter < edgesNumber) {
        const vertex = line.split(" ").map((item, index) => {
            if (index < 2) {
                return +item - 1;
            }

            return +item;
        });
        graph.push(vertex);

        edgesCounter++;
    }

    if (edgesCounter === edgesNumber) {
        try {
            console.log(spanningTree(verticesNumber, edgesNumber, graph));
        } catch (e) {
            console.log(e.message);
        }

        rl.close();
    }
});
