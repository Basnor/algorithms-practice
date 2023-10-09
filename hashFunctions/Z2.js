class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = undefined;
    }

    put(key, value) {
        let node = this.get(key);

        if (node) {
            node.value = value;
        } else {
            this.head = new Node({ key, value }, this.head);
        }
    }

    get(key) {
        let node = this.head;

        while (node && node.value.key !== key) {
            node = node.next;
        }

        return node?.value;
    }

    delete(key) {
        let prev;
        let node = this.head;

        if (node && node.value.key === key) {
            this.head = undefined;

            return node.value;
        }

        while (node && node.value.key !== key) {
            prev = node;
            node = node.next;
        }

        if (prev) {
            prev.next = node;
        }

        return node?.value;
    }
}

class HashTable {
    _tableSize = 1024;
    _base = 123;
    _mod = 10003;

    constructor() {
        this.table = new Array(this._tableSize);
    }

    put(key, value) {
        let i = this.#getHash(key) % this._tableSize;

        if (!this.table[i]) {
            this.table[i] = new LinkedList();
        }

        this.table[i].put(key, value);
    }

    get(key) {
        let i = this.#getHash(key) % this._tableSize;
        const { value } = this.table[i]?.get(key) || {};

        return value ? value : "None";
    }

    delete(key) {
        let i = this.#getHash(key) % this._tableSize;
        const { value } = this.table[i]?.delete(key) || {};

        return value ? value : "None";
    }

    #getHash = (str) => {
        let hash = 0;

        for (const char of str) {
            hash = (hash * this._base + char.charCodeAt(0)) % this._mod;
        }

        return hash;
    };
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
    return line.split(" ").map((item, index) => (index < 2 ? item : +item));
};
