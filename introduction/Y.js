const lines = [];
const linesNumber = 2;

const getDistance = () => {
    const n = parseInt(lines[0]);
    const numbers = lines[1].split(" ").map((item) => parseInt(item));
    const distance = new Array(n);

    for (let i = 0, viewpoint; i < n; i++) {
        if (numbers[i] === 0) {
            viewpoint = i;
        }

        if (viewpoint !== undefined) {
            distance[i] = i - viewpoint;
        }
    }

    for (let i = n - 1, viewpoint; i >= 0; i--) {
        if (numbers[i] === 0) {
            viewpoint = i;
        }

        if (viewpoint !== undefined) {
            if (distance[i]) {
                distance[i] = Math.min(viewpoint - i, distance[i]);
            } else {
                distance[i] = viewpoint - i;
            }
        }
    }

    return distance;
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === linesNumber) {
        rl.close();
    }
}).on("close", () => {
    process.stdout.write(getDistance().join(" ") + "\n");
});
