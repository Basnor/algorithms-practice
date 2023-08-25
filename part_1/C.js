const lines = [];
const staticLinesNumber = 4;

const getNeightbors = () => {
    const matrix = [];
    const startMatrixIndex = 2;
    const endMatrixIndex = 2 + parseInt(lines[0]);

    for (let i = startMatrixIndex; i < endMatrixIndex; i++) {
        matrix.push(lines[i].split(" ").map((item) => parseInt(item)));
    }

    const xPointIndex = lines.length - 2;
    const yPointIndex = lines.length - 1;
    const point = {
        x: parseInt(lines[xPointIndex]),
        y: parseInt(lines[yPointIndex]),
    };

    const neightbors = [];
    neightbors.push(point.y + 1 < matrix[point.x].length ? matrix[point.x][point.y + 1] : null);
    neightbors.push(point.y - 1 >= 0 ? matrix[point.x][point.y - 1] : null);
    neightbors.push(point.x + 1 < matrix.length ? matrix[point.x + 1][point.y] : null);
    neightbors.push(point.x - 1 >= 0 ? matrix[point.x - 1][point.y] : null);

    return neightbors.filter((item) => item !== null).sort((a, b) => a - b);
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === parseInt(lines[0]) + staticLinesNumber) {
        rl.close();
    }
}).on("close", () => {
    process.stdout.write(getNeightbors().join(" ") + "\n");
});
