const Colors = Object.freeze({
    WHITE: "white",
    GRAY: "gray",
    BLACK: "black",
});

function topologicalSort(edgesMap, nodesNumber) {
    const color = new Array(nodesNumber).fill(Colors.WHITE);
    const order = [];

    const stack = [1];
    while (stack.length) {
        const i = stack.pop();

        switch (color[i - 1]) {
            case Colors.WHITE: {
                color[i - 1] = Colors.GRAY;
                stack.push(i);

                for (let node of getOutgoingNodes(i, edgesMap)) {
                    if (color[node - 1] === Colors.WHITE) {
                        stack.push(node);
                    }
                }

                break;
            }

            case Colors.GRAY: {
                color[i - 1] = Colors.BLACK;
                order.push(i);
                break;
            }
        }

        if (!stack.length && color.some((item) => item === Colors.WHITE)) {
            stack.push(color.indexOf(Colors.WHITE) + 1);
        }
    }

    return order;
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
        console.log(topologicalSort(edgesMap, nodesNumber).join(" "));

        rl.close();
    }
});
