class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {}

    putNode(key, value) {
        let node = this.head;

        while (node) {
            if (node.value.key === key) {
                node.value.value = value;
                return;
            }

            node = node.next;
        }

        this.head = new Node({ key, value }, this.head);
    }

    getNode(key) {
        let node = this.head;

        while (node) {
            if (node.value.key === key) {
                return node.value;
            }

            node = node.next;
        }
    }

    deleteNode(key) {
        let node = this.head;
        let deletedNode = node?.next;

        if (node && node.value.key === key) {
            this.head = undefined;

            return node.value;
        }

        if (deletedNode && deletedNode.value.key === key) {
            this.head.next = deletedNode.next;

            return deletedNode.value;
        }

        while (deletedNode) {
            if (deletedNode.value.key === key) {
                node.next = deletedNode.next;

                return deletedNode.value;
            }

            node = deletedNode;
            deletedNode = deletedNode.next;
        }
    }
}

class HashTable {
    _tableSize = 1000000;

    constructor() {
        this.table = new Array(this._tableSize).fill().map(() => new LinkedList());
    }

    put(key, value) {
        let i = this.#getHash(key) % this._tableSize;

        this.table[i].putNode(key, value);
    }

    get(key) {
        let i = this.#getHash(key) % this._tableSize;
        const { value } = this.table[i].getNode(key) || {};

        return value ? value : "None";
    }

    delete(key) {
        let i = this.#getHash(key) % this._tableSize;
        const { value } = this.table[i].deleteNode(key) || {};

        return value ? value : "None";
    }

    #getHash(number) {
        return (number % this._tableSize) + this._tableSize;
    }
}

let linesNumber;
let lineIndex = 0;
const output = [];
const hashTable = new HashTable();
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!linesNumber) {
        linesNumber = +line;
        return;
    }

    if (lineIndex < linesNumber) {
        const [command, key, value] = parseLine(line);

        const result = hashTable[command](key, value);
        result !== undefined && output.push(result);

        lineIndex++;
    }

    if (lineIndex === linesNumber) {
        console.log(output.join("\n"));

        rl.close();
    }
});

const parseLine = (line) => {
    return line.split(" ").map((item, index) => (index < 1 ? item : +item));
};
