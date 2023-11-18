const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

function topologicalSort(edgesMap, nodesNumber) {
    const color = new Array(nodesNumber).fill(Colors.WHITE);
    const order = [];

    const DFS = (nodeIndex) => {
        color[nodeIndex - 1] = Colors.GRAY;

        for (let node of getOutgoingNodes(nodeIndex, edgesMap)) {
            if (color[node - 1] === Colors.WHITE) {
                DFS(node);
            }
        }

        color[nodeIndex - 1] = Colors.BLACK;
        order.push(nodeIndex);
    };

    for (let i = nodesNumber; i >= 1; i--) {
        if (color[i - 1] === Colors.WHITE) {
            DFS(i);
        }
    }

    return order.reverse();
}

function getOutgoingNodes(nodeIndex, edgesMap) {
    return edgesMap.get(nodeIndex)?.sort((a, b) => b - a) || [];
}

const edgesMap = new Map();
let nodesNumber,
    edgesNumber,
    edgesCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!nodesNumber && !edgesNumber) {
        [nodesNumber, edgesNumber] = line.split(" ").map((item) => +item);

        if (edgesNumber) {
            return;
        }
    }

    if (edgesCounter < edgesNumber) {
        const [node1, node2] = line.split(" ").map((item) => +item);

        if (!edgesMap.has(node1)) {
            edgesMap.set(node1, [node2]);
        } else {
            edgesMap.get(node1).push(node2);
        }

        edgesCounter++;
    }

    if (edgesCounter === edgesNumber) {
        console.log(topologicalSort(edgesMap, nodesNumber).join(" "));

        rl.close();
    }
});
