const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

function mainDFS(edgesMap, nodesNumber) {
    const color = new Array(nodesNumber).fill(Colors.WHITE);
    const entry = new Array(nodesNumber).fill(null);
    const leave = new Array(nodesNumber).fill(null);
    let time = -1;

    const DFS = (nodeIndex) => {
        time += 1;
        color[nodeIndex - 1] = Colors.GRAY;
        entry[nodeIndex - 1] = time;

        for (let node of getOutgoingNodes(nodeIndex, edgesMap)) {
            if (color[node - 1] === Colors.WHITE) {
                DFS(node);
            }
        }

        time += 1;
        leave[nodeIndex - 1] = time;
        color[nodeIndex - 1] = Colors.BLACK;
    };

    DFS(1);

    return entry.map((item, index) => `${item} ${leave[index]}`);
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
        for (const TimeInAndOut of mainDFS(edgesMap, nodesNumber)) {
            console.log(TimeInAndOut);
        }

        rl.close();
    }
});
