const readline = require("readline");
const rl = readline.createInterface({input: process.stdin});

let nLength = 0;
let mLength = 0;
let n = [];
let m = [];

const getMedian = (n, m) => {
    if (n.length > m.length) {
        return getMedian(m, n);
    }

    let left = 0;
    let right = n.length;
    let mid = Math.floor((n.length + m.length + 1) / 2);

    while (left <= right) {
        let nIndex = Math.floor((left + right) / 2);
        let mIndex = mid - nIndex;

        let nLeft = (nIndex > 0) ? n[nIndex - 1] : -Infinity;
        let nRight = (nIndex < n.length) ? n[nIndex] : Infinity;
        let mLeft = (mIndex > 0) ? m[mIndex - 1] : -Infinity;
        let mRight = (mIndex < m.length) ? m[mIndex] : Infinity;

        if (nLeft <= mRight && nRight >= mLeft) {
            if ((n.length + m.length) % 2 === 1) {
                return Math.max(nLeft, mLeft);
            } else {
                return (Math.max(nLeft, mLeft) + Math.min(nRight, mRight)) / 2;
            }
        }

        if (nLeft > mRight) {
            right = nIndex - 1;
        } else {
            left = nIndex + 1;
        }
    }
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
    console.log(getMedian(n, m));
});