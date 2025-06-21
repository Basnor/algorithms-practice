const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

class StackMaxEffective {
    constructor() {
        this.items = [];
        this.max = [];
    }

    push(item) {
        this.items.push(item);

        const maxItem = this.max.length ? this.max[this.max.length - 1] : null;

        if (maxItem === null || maxItem <= item) {
            this.max.push(item);
        }
    }

    top() {
        if (!this.items.length) {
            throw new Error("error");
        }

        console.log(this.items[this.items.length - 1]);
    }

    pop() {
        if (!this.items.length) {
            throw new Error("error");
        }

        const item = this.items.pop();
        const maxItem = this.max.length ? this.max[this.max.length - 1] : null;

        if (maxItem !== null && maxItem === item) {
            this.max.pop();
        }
    }

    get_max() {
        if (!this.max.length) {
            throw new Error("None");
        }

        return this.max[this.max.length - 1];
    }
}

const stackMax = new StackMaxEffective();

let lineNumber = 0;

parseLineCommand = (line) => {
    return line.split(" ").map((item, index) => (index === 0 ? item : +item));
};

rl.on("line", (line) => {
    if (lineNumber > 0) {
        const [command, param] = parseLineCommand(line);

        try {
            const result = stackMax[command](param);
            if (result !== undefined) {
                console.log(result);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    lineNumber++;
});
