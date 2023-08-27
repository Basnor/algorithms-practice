class StackMax {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (!this.items.length) {
            throw new Error("error");
        }

        this.items.pop();
    }

    get_max() {
        if (!this.items.length) {
            throw new Error("None");
        }

        return Math.max(...this.items);
    }
}

let lineNumber = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

const stackMax = new StackMax();

rl.on("line", (line) => {
    if (lineNumber > 0) {
        const [command, param] = parseLine(line);

        try {
            const result = stackMax[command](param);

            result !== undefined && process.stdout.write(result + "\n");
        } catch (e) {
            process.stdout.write(e.message + "\n");
        }
    }

    lineNumber++;
});

parseLine = (line) => {
    return line.split(" ").map((item, index) => (index === 0 ? item : parseInt(item)));
};
