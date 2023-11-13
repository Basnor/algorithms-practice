const convertToAdjacencyList = (edges, nodesNumber) => {
    const adjacencyMap = new Map();

    for (let i = 1; i <= nodesNumber; i++) {
        adjacencyMap.set(i, { count: 0, nodes: [] });

        const nodes = edges.filter(([node1]) => node1 === i).map(([, node2]) => node2);

        if (nodes.length) {
            adjacencyMap.get(i).count = nodes.length;
            adjacencyMap.get(i).nodes.push(...nodes.sort((a, b) => a - b));
        }
    }

    return adjacencyMap;
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
        const adjacencyList = convertToAdjacencyList(edges, nodesNumber);

        for (const item of adjacencyList.values()) {
            const nodes = item.nodes.length ? item.nodes.join(" ") : "";

            console.log(`${item.count} ${nodes}`);
        }

        rl.close();
    }
});
