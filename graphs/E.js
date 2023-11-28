// without recursion
const DFS = (connections, nodesNumber) => {
    const components = [];
    const color = new Array(nodesNumber).fill(-1);
    let componentCount = 0;

    for (let i = 1; i <= nodesNumber; i++) {
        if (color[i - 1] !== -1) {
            continue;
        }

        const stack = [i];
        const component = [];
        while (stack.length) {
            const i = stack.pop();

            if (color[i - 1] < 0) {
                color[i - 1] = 0;
                component.push(i);
                stack.push(i);

                for (let node of connections.get(i)) {
                    if (color[node - 1] === -1) {
                        componentCount++;
                        stack.push(node);
                    }
                }
            } else {
                color[i - 1] = componentCount;
            }
        }

        components.push(component);
    }

    return components;
};

// with recursion
const mainDFS = (connections, nodesNumber) => {
    const components = [];
    const color = new Array(nodesNumber).fill(-1);
    let componentCount = 0;

    const DFS = (nodeIndex, result = []) => {
        color[nodeIndex - 1] = 0;
        result.push(nodeIndex);

        for (let node of connections.get(nodeIndex)) {
            if (color[node - 1] === -1) {
                componentCount++;
                DFS(node, result);
            }
        }

        color[nodeIndex - 1] = componentCount;
        return result;
    };

    for (let i = 1; i <= nodesNumber; i++) {
        if (color[i - 1] < 0) {
            components.push(DFS(i));
        }
    }

    return components;
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

        // Граф неориентированный
        connections.add(node1, node2);
        connections.add(node2, node1);

        edgesCounter++;
    }

    if (edgesCounter === edgesNumber) {
        const components = DFS(connections, nodesNumber);

        console.log(components.length);
        for (const component of components) {
            console.log(component.sort((a, b) => a - b).join(" "));
        }

        rl.close();
    }
});
