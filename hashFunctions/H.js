const isLettersOrderSame = (str1, str2) => {
    const lettersMap = new Map();

    for (let i = 0; i < str1.length; i++) {
        if (!lettersMap.has(str1[i])) {
            lettersMap.set(str1[i], str2[i]);
            continue;
        }

        if (lettersMap.get(str1[i]) !== str2[i]) {
            return false;
        }
    }

    return true;
};

const lines = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === 2) {
        if (isLettersOrderSame(...lines) && isLettersOrderSame(...lines.reverse())) {
            console.log("YES");
        } else {
            console.log("NO");
        }

        rl.close();
    }
});
