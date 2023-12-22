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

        if (this.heap[parentIndex][0] < this.heap[index][0]) {
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];

            this.#siftUp(parentIndex);
        }
    }

    #siftDown(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left >= this.heap.length) {
            return;
        }

        let indexLargest = left;
        if (right < this.heap.length && compare(this.heap[left], this.heap[right]) > 0) {
            indexLargest = right;
        }

        if (this.heap[index][0] < this.heap[indexLargest][0]) {
            [this.heap[index], this.heap[indexLargest]] = [this.heap[indexLargest], this.heap[index]];

            this.#siftDown(indexLargest);
        }
    }
}

spanningTree = (V, E, edges) => {
    // Create an adjacency list representation of the graph
    const adj = new Array(V).fill(null).map(() => []);

    // Fill the adjacency list with edges and their weights
    for (let i = 0; i < E; i++) {
        const [u, v, wt] = edges[i];
        adj[u].push([v, wt]);
        adj[v].push([u, wt]);
    }

    // Create a priority queue to store edges with their weights
    const pq = new PriorityQueue();

    // Create a visited array to keep track of visited vertices
    const visited = new Array(V).fill(false);

    // Variable to store the result (sum of edge weights)
    let max = 0;

    // Start with vertex 0
    pq.enqueue([0, 0]);

    // Perform Prim's algorithm to find the Maximum Spanning Tree
    while (!pq.isEmpty) {
        const p = pq.dequeue();

        const wt = p[0]; // Weight of the edge
        const u = p[1]; // Vertex connected to the edge

        if (visited[u]) {
            continue; // Skip if the vertex is already visited
        }

        max += wt; // Add the edge weight to the result
        visited[u] = true; // Mark the vertex as visited

        // Explore the adjacent vertices
        for (const v of adj[u]) {
            // v[0] represents the vertex and v[1] represents the edge weight
            if (!visited[v[0]]) {
                pq.enqueue([v[1], v[0]]); // Add the adjacent edge to the priority queue
            }
        }
    }

    return visited.some((item) => item === false) ? null : max; // Return the sum of edge weights of the Maximum Spanning Tree
};

const graph = [];
let verticesNumber,
    edgesNumber,
    edgesCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

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
        const maxST = spanningTree(verticesNumber, edgesNumber, graph);

        console.log(maxST === null ? "Oops! I did it again" : maxST);

        rl.close();
    }
});
