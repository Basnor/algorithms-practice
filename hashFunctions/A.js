const countHash = (a, m, s) => {
    let hash = 0;

    for (let i = 0; i < s.length; i++) {
        const isLastChar = i === s.length - 1;

        hash = ((hash + s.charCodeAt(i)) * (isLastChar ? 1 : a)) % m;
    }

    return hash;
};

const lines = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
    if (lines.length < 2) {
        lines.push(parseInt(line));
    } else {
        lines.push(line);

        console.log(countHash(...lines));

        rl.close();
    }
});
