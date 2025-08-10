const readline = require("readline");
const rl = readline.createInterface({input: process.stdin});

let nLength = 0;
let mLength = 0;
let n = [];
let m = [];

const getMedian = () => {
    let i = 0;
    let leftN = 0, leftM = 0;

    let left, right;

    while (i <= Math.floor((nLength + mLength) / 2)) {
        let value;

        if (leftN < nLength && (leftM > mLength - 1 || n[leftN] <= m[leftM])) {
            value = n[leftN++];
        } else {
            value = m[leftM++];
        }

        if (i === Math.floor((nLength + mLength - 1) / 2)) {
            left = value;
            right = value;
        }

        if (i === Math.floor((nLength + mLength) / 2)) {
            right = value;
        }

        i++;
    }

    return (left + right) / 2;
}

rl.on("line", (line) => {
    if (nLength === 0) {
        nLength = +line;
        return;
    }

    if (mLength === 0) {
        mLength = +line;
        return;
    }

    if (n.length !== nLength) {
        n = line.split(' ').map(Number);
        return;
    }

    if (m.length !== mLength) {
        m = line.split(' ').map(Number);
    }

    rl.close();
}).on("close", () => {
    console.log(getMedian());
});