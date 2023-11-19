const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

// with recursion
function mainDFS(connections, nodesNumber) {
    const color = new Array(nodesNumber).fill(Colors.WHITE);
    const entry = new Array(nodesNumber).fill(null);
    const leave = new Array(nodesNumber).fill(null);
    let time = -1;

    const DFS = (nodeIndex) => {
        color[nodeIndex - 1] = Colors.GRAY;
        entry[nodeIndex - 1] = ++time;

        for (let node of connections.get(nodeIndex)) {
            if (color[node - 1] === Colors.WHITE) {
                DFS(node);
            }
        }

        leave[nodeIndex - 1] = ++time;
        color[nodeIndex - 1] = Colors.BLACK;
    };

    DFS(1);

    return entry.map((item, index) => `${item} ${leave[index]}`);
}

// without recursion
const DFS = (connections, nodesNumber) => {
    const color = new Array(nodesNumber).fill(Colors.WHITE);
    const entry = new Array(nodesNumber).fill(null);
    const leave = new Array(nodesNumber).fill(null);
    let time = -1;

    const stack = [1];
    while (stack.length) {
        const i = stack.pop();

        switch (color[i - 1]) {
            case Colors.WHITE:
                time += 1;
                color[i - 1] = Colors.GRAY;
                entry[i - 1] = time;
                stack.push(i);

                for (let node of connections.get(i)) {
                    if (color[node - 1] === Colors.WHITE) {
                        stack.push(node);
                    }
                }

                break;

            case Colors.GRAY:
                time += 1;
                leave[i - 1] = time;
                color[i - 1] = Colors.BLACK;

                break;
        }
    }

    return entry.map((item, index) => `${item} ${leave[index]}`);
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

        if (edgesNumber) {
            return;
        }
    }

    if (edgesCounter < edgesNumber) {
        const [node1, node2] = line.split(" ").map((item) => +item);

        connections.add(node1, node2);

        edgesCounter++;
    }

    if (edgesCounter === edgesNumber) {
        for (const timeInAndOut of DFS(connections, nodesNumber)) {
            console.log(timeInAndOut);
        }

        rl.close();
    }
});
