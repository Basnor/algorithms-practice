class HashTable {
    _tableSize = 1000;
    _base = 123;
    _mod = 100009;

    constructor() {
        this.table = new Array(this._tableSize);
        this.deletedCount = 0;
    }

    put(key, value) {
        let i = this.#getPolyhash(key) % this._tableSize;

        while (this.table[i]) {
            if (this.table[i].key === key) {
                this.table[i].value = value;
                return;
            }

            i = this.#getNexStep(i);
        }

        this.table[i] = { key, value };
    }

    get(key) {
        let i = this.#getPolyhash(key) % this._tableSize;

        while (this.table[i]?.key !== key) {
            if (!this.table[i]) {
                return "None";
            }

            i = this.#getNexStep(i);
        }

        return this.table[i].value;
    }

    delete(key) {
        let i = this.#getPolyhash(key) % this._tableSize;

        while (this.table[i]?.key !== key) {
            if (!this.table[i]) {
                return "None";
            }

            i = this.#getNexStep(i);
        }

        const returnedValue = this.table[i].value;

        this.table[i] = "deleted";

        this.#cleanDeleted(++this.deletedCount);

        return returnedValue;
    }

    #getNexStep = (step) => {
        return (7 * step + 51 * step * step) % this._tableSize;
    };

    #getPolyhash = (str) => {
        let hash = 0;

        for (const char of str) {
            hash = (hash * this._base + char.charCodeAt(0)) % this._mod;
        }

        return hash;
    };

    #cleanDeleted = (number) => {
        if (number < this._tableSize / 2) {
            return;
        }

        const copy = [...this.table];
        this.table = new Array(this._tableSize);

        for (let i = 0; i < this._tableSize; i++) {
            if (copy[i] && copy[i] !== "deleted") {
                this.put(copy[i].key, copy[i].value);
            }
        }

        this.deletedCount = 0;
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
