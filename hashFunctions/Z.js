class HashTable {
    _tableSize = 1000;
    _base = 123;
    _mod = 100009;

    constructor() {
        this.table = new Array(this._tableSize);
        this.deletedCount = 0;
    }

    put(key, value) {
        const bucket = this.#getPolyhash(key) % this._tableSize;

        let i = bucket % this._tableSize;
        while (this.table[i] || this.table[i] !== "deleted") {
            if (this.table[i]?.key === key) {
                this.table[i].value = value;
                return;
            }

            i++;
        }

        this.table[i] = { key, value };
    }

    get(key) {
        const bucket = this.#getPolyhash(key) % this._tableSize;
        let i = bucket % this._tableSize;

        while (this.table[i]?.key !== key) {
            if (!this.table[i]) {
                console.log("None");
                return;
            }

            i++;
        }

        console.log(this.table[i].value);
    }

    delete(key) {
        const bucket = this.#getPolyhash(key) % this._tableSize;
        let i = bucket % this._tableSize;

        while (this.table[i]?.key !== key) {
            if (!this.table[i]) {
                console.log("None");
                return;
            }

            i++;
        }

        console.log(this.table[i].value);

        this.table[i] = "deleted";

        this.#cleanDeleted(++this.deletedCount);
    }

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

        for (let i = 0; i < this._tableSize; i++) {
            if (this.table[i] === "deleted") {
                this.table[i] = undefined;
            }
        }

        for (let i = 0; i < this._tableSize; i++) {
            if (this.table[i]) {
                this.put(this.table[i].key, this.table[i].value);
            }
        }

        this.deletedCount = 0;
    };
}

let linesNumber;
let lineIndex = 0;
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

        hashTable[command](key, value);

        lineIndex++;
    }

    if (lineIndex === linesNumber) {
        rl.close();
    }
});

const parseLine = (line) => {
    return line.split(" ").map((item, index) => (index < 2 ? item : +item));
};
