const getPath = (row, column, path, dp) => {
    if (row === 0 && column === 0) {
        return "";
    }

    if (row === 0) {
        return getPath(row, column - 1, path, dp) + "R";
    }

    if (column === 0) {
        return getPath(row - 1, column, path, dp) + "U";
    }

    const left = dp[row - 1][column];
    const bottom = dp[row][column - 1];

    // Считаем, что при равных весах всегда идем вверх
    if (left > bottom) {
        path = getPath(row - 1, column, path, dp) + "U";
    } else {
        path = getPath(row, column - 1, path, dp) + "R";
    }

    return path;
};

const getMax = (row, column, points, dp) => {
    if (row < 0 || column < 0) {
        return 0;
    }

    if (dp[row][column] !== undefined) {
        return dp[row][column];
    }

    const left = getMax(row - 1, column, points, dp);
    const bottom = getMax(row, column - 1, points, dp);

    dp[row][column] = Math.max(left, bottom) + points[row][column];

    return dp[row][column];
};

let rows, columns;
let linesCounter;
const points = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (linesCounter === undefined) {
        [rows, columns] = line.split(" ").map((item) => +item);

        linesCounter = 0;
        return;
    }

    if (linesCounter < rows) {
        points.unshift(line.split("").map((item) => +item));

        linesCounter++;
    }

    if (linesCounter === rows) {
        const dp = new Array(rows).fill([]);
        dp.forEach((_, i) => {
            dp[i] = new Array(columns);
        });

        console.log(getMax(rows - 1, columns - 1, points, dp));
        console.log(getPath(rows - 1, columns - 1, "", dp));

        rl.close();
    }
});
