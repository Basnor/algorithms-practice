const convertToAdjacencyMatrix = (edges, nodesNumber) => {
    const adjacencyMatrix = [];

    for (let i = 1; i <= nodesNumber; i++) {
        adjacencyMatrix.push(new Array(nodesNumber).fill(0));
    }

    for (const edge of edges) {
        adjacencyMatrix[edge[0] - 1][edge[1] - 1] = 1;
    }

    return adjacencyMatrix;
};

const edges = [];
let nodesNumber, edgesNumber;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!nodesNumber && !edgesNumber) {
        [nodesNumber, edgesNumber] = line.split(" ").map((item) => +item);
        return;
    }

    if (edges.length < edgesNumber) {
        edges.push(line.split(" ").map((item) => +item));
    }

    if (edges.length === edgesNumber) {
        const adjacencyMatrix = convertToAdjacencyMatrix(edges, nodesNumber);

        for (const row of adjacencyMatrix) {
            console.log(row.join(" "));
        }

        rl.close();
    }
});
