const readline = require("readline");
const rl = readline.createInterface({input: process.stdin});

class MyQueueSized {
    _maxStackSize;

    constructor(size) {
        this._maxStackSize = size;
        this.items = [];
    }

    push(item) {
        if (this.items.length === this._maxStackSize) {
            throw new Error('error');
        }

        this.items.push(item);
    }

    pop() {
        if (this.items.length === 0) {
            throw new Error('None');
        }

        return this.items.shift();
    }

    peek() {
        if (this.items.length === 0) {
            throw new Error('None');
        }

        return this.items[0];
    }

    size() {
        return this.items.length;
    }
}

const parseCommandLine = (line) => line.split(' ').map((item, index) => index === 0 ? item : +item);

let stack, lineNumber = 0;

rl.on("line", (line) => {
    if (lineNumber === 1) {
        stack = new MyQueueSized(+line);
    } else if (lineNumber > 1) {
        const [command, arg] = parseCommandLine(line);

        try {
            const result = stack[command](arg);
            if (result !== undefined) {
                console.log(result);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    lineNumber++;
})