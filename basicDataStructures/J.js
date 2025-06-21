const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class NodeQueue {
    _size = 0;
    _current = null;
    _head = null;

    constructor() {}

    get() {
        if (this._size === 0) {
            throw new Error("error");
        }

        let item = this._head;

        this._head = item.next;
        this._size--;

        return item.value;
    }

    put(item) {
        const node = new Node(item);

        if (this._head === null) {
            this._head = node;
        } else {
            this._current.next = node;
        }

        this._current = node;
        this._size++;
    }

    size() {
        return this._size;
    }
}

const parseCommandLine = (line) => line.split(' ').map((item, index) => index === 0 ? item : +item);

let lineNumber = 0;
const stack = new NodeQueue();

rl.on("line", (line) => {
   if (lineNumber > 0) {
        const [command, arg] = parseCommandLine(line);

        try {
            const result = stack[command](arg);
            if (result !== undefined) {
                console.log(result);
            }
        }
        catch (e) {
            console.log(e.message);
        }
   }

   lineNumber++;
});