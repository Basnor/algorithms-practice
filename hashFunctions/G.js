const maxDrawLength = (seq) => {
    const countsMap = new Map();
    countsMap.set(0, { left: 0, right: 0 });

    for (let i = 0, count = 0; i < seq.length; i++) {
        switch (seq[i]) {
            case 0:
                count++;
                break;

            case 1:
                count--;
                break;
        }

        if (!countsMap.has(count)) {
            countsMap.set(count, { left: i + 1 });
        } else {
            countsMap.get(count).right = i + 1;
        }
    }

    let max = 0;
    for (const gap of countsMap.values()) {
        const length = gap.right - gap.left;

        max = length > max ? length : max;
    }

    return max;
};

let lineNumber;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!lineNumber) {
        lineNumber = parseInt(line);

        if (lineNumber === 0) {
            console.log(lineNumber);
            rl.close();
        }
    } else {
        const seq = line.split(" ").map((item) => parseInt(item));

        console.log(maxDrawLength(seq));
        rl.close();
    }
});
