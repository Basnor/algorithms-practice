class Graph {
    constructor(V) {
        this.V = V;
        this.adj = new Array(V).fill(null).map(() => []);
    }

    addEdge(v, u, wt) {
        if (wt === "R") {
            // Reverse edge with weight R
            this.adj[u].push(v);
        } else {
            this.adj[v].push(u);
        }
    }

    isCyclic() {
        const inDegree = new Array(this.V).fill(0);
        const zeroInDegree = [];
        let visited = 0;

        for (let u = 0; u < this.V; u++) {
            for (let v of this.adj[u]) {
                inDegree[v]++;
            }
        }

        for (let u = 0; u < this.V; u++) {
            if (inDegree[u] === 0) {
                zeroInDegree.push(u);
            }
        }

        // BFS traversal
        while (zeroInDegree.length > 0) {
            const u = zeroInDegree.shift();
            visited++;

            for (let v of this.adj[u]) {
                inDegree[v]--;

                if (inDegree[v] === 0) {
                    zeroInDegree.push(v);
                }
            }
        }

        return visited !== this.V;
    }
}

let graph;
let verticesNumber,
    verticesCounter = 0;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (!verticesNumber) {
        verticesNumber = +line;
        graph = new Graph(verticesNumber);

        if (verticesNumber === 1) {
            console.log("YES");
        }

        return;
    }

    if (verticesCounter < verticesNumber) {
        const weights = line.split("");

        for (let i = weights.length - 1, j = 0; i >= 0; i--, j++) {
            graph.addEdge(verticesCounter, verticesNumber - i - 1, weights[j]);
        }

        verticesCounter++;
    }

    if (verticesCounter === verticesNumber - 1) {
        if (graph.isCyclic()) {
            console.log("NO");
        } else {
            console.log("YES");
        }

        rl.close();
    }
});
