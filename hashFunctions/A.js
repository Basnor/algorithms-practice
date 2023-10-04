const getPolyhash = (base, mod, str) => {
    let hash = 0;

    for (const char of str) {
        hash = (hash * base + char.charCodeAt(0)) % mod;
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

        console.log(getPolyhash(...lines));

        rl.close();
    }
});
