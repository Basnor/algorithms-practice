const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

function mainDFS(edgesMap, startNode, nodesNumber) {
    const result = [];
    const color = new Array(nodesNumber).fill(Colors.WHITE);

    const DFS = (nodeIndex) => {
        color[nodeIndex - 1] = Colors.GRAY;
        result.push(nodeIndex);

        let outgoingNodes = getOutgoingNodes(nodeIndex, edgesMap);

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

function getOutgoingNodes(nodeIndex, edgesMap) {
    return edgesMap.get(nodeIndex)?.sort((a, b) => a - b) || [];
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
        return;
    }

    if (edgesCounter < edgesNumber) {
        const [node1, node2] = line.split(" ").map((item) => +item);

        const addConnection = (u, v) => {
            if (!edgesMap.has(u)) {
                edgesMap.set(u, [v]);
            } else {
                edgesMap.get(u).push(v);
            }
        };

        addConnection(node1, node2);
        addConnection(node2, node1);

        edgesCounter++;
        return;
    }

    if (edgesCounter === edgesNumber) {
        console.log(mainDFS(edgesMap, +line, nodesNumber).join(" "));
        rl.close();
    }
});