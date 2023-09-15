const isCorrectSubsequence = (seq, sub) => {
    let subItemIndex = 0;
    let subItem = sub[subItemIndex];

    for (let i = 0; i < seq.length; i++) {
        if (seq[i] === subItem) {
            subItemIndex += 1;
            subItem = sub[subItemIndex];

            // элементы подпоследовательности найдены
            if (!subItem) {
                return true;
            }
        }
    }

    return false;
};

let lines = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    if (lines.length === 2) {
        if (isCorrectSubsequence(lines[1], lines[0])) {
            console.log("True");
        } else {
            console.log("False");
        }

        rl.close();
    }
});
