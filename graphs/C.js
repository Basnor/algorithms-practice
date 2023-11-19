const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

// with recursion
const mainDFS = (connections, startNode, nodesNumber) => {
    const result = [];
    const color = new Array(nodesNumber).fill(Colors.WHITE);

    const DFS = (nodeIndex) => {
        color[nodeIndex - 1] = Colors.GRAY;
        result.push(nodeIndex);

        for (let node of connections.get(i)) {
            if (color[node - 1] === Colors.WHITE) {
                DFS(node);
            }
        }

        color[nodeIndex - 1] = Colors.BLACK;
    };

    DFS(startNode);

    return result;
};

// without recursion
const DFS = (connections, startNode, nodesNumber) => {
    const result = [];
    const color = new Array(nodesNumber).fill(Colors.WHITE);

    const stack = [startNode];
    while (stack.length) {
        const i = stack.pop();

        switch (color[i - 1]) {
            case Colors.WHITE:
                color[i - 1] = Colors.GRAY;
                result.push(i);
                stack.push(i);

                for (let node of connections.get(i)) {
                    if (color[node - 1] === Colors.WHITE) {
                        stack.push(node);
                    }
                }

                break;

            case Colors.GRAY:
                color[i - 1] = Colors.BLACK;
                break;
        }
    }

    return result;
};

class Connections {
    constructor() {
        this.connections = new Map();
    }

    add(key, value) {
        if (!this.connections.has(key)) {
            this.connections.set(key, [value]);
        } else {
            this.connections.get(key).push(value);
        }
    }

    get(index) {
        return this.connections.get(index)?.sort((a, b) => b - a) || [];
    }
}

const connections = new Connections();
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

        // Граф неориентированный
        connections.add(node1, node2);
        connections.add(node2, node1);

        edgesCounter++;
        return;
    }

    if (edgesCounter === edgesNumber) {
        console.log(DFS(connections, +line, nodesNumber).join(" "));
        rl.close();
    }
});
