const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

function mainDFS(edges, startNode, nodesNumber) {
    const result = [];
    const color = new Array(nodesNumber).fill(Colors.WHITE);

    const DFS = (nodeIndex) => {
        color[nodeIndex - 1] = Colors.GRAY;
        result.push(nodeIndex);

        let outgoingNodes = getOutgoingNodes(nodeIndex, edges);

        for (let node of outgoingNodes) {
            if (color[node - 1] === Colors.WHITE) {
                DFS(node);
            }
        }

        color[nodeIndex - 1] = Colors.BLACK;
    };

    DFS(startNode);

    return result;
}

function getOutgoingNodes(nodeIndex, edges) {
    const outgoingNodes = [];

    for (let edge of edges) {
        if (edge[0] === nodeIndex) {
            outgoingNodes.push(edge[1]);
        }

        if (edge[1] === nodeIndex) {
            outgoingNodes.push(edge[0]);
        }
    }

    return outgoingNodes.sort((a, b) => a - b);
}

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
        return;
    }

    if (edges.length === edgesNumber) {
        console.log(mainDFS(edges, +line, nodesNumber).join(" "));
        rl.close();
    }
});
