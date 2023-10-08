class HashTable {
    TABLE_SIZE = 1000;
    BASE = 100;
    MOD = 100003;

    constructor() {
        this.table = new Array(this.TABLE_SIZE);
        this.deletedCount = 0;
    }

    put(key, value) {
        const bucket = this.#getPolyhash(key) % this.TABLE_SIZE;

        if (!this.table[bucket] || this.table[bucket] === "deleted") {
            this.table[bucket] = { key, value };
            return;
        }

        let i = bucket % this.TABLE_SIZE;
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
        const bucket = this.#getPolyhash(key) % this.TABLE_SIZE;

        if (!this.table[bucket]) {
            console.log("None");
            return;
        }

        let i = bucket % this.TABLE_SIZE;

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
        const bucket = this.#getPolyhash(key) % this.TABLE_SIZE;

        if (!this.table[bucket] || this.table[bucket] === "deleted") {
            console.log("None");
            return;
        }

        let i = bucket % this.TABLE_SIZE;

        while (this.table[i]?.key !== key) {
            i++;
        }

        console.log(this.table[i].value);

        this.table[i] = "deleted";

        this.#cleanDeleted(this.deletedCount++);
    }

    #getPolyhash = (str) => {
        let hash = 0;

        for (const char of str) {
            hash = (hash * this.BASE + char.charCodeAt(0)) % this.MOD;
        }

        return hash;
    };

    #cleanDeleted = (number) => {
        if (number < this.TABLE_SIZE / 2) {
            return;
        }

        for (let i = 0; i < this.TABLE_SIZE; i++) {
            if (this.table[i]) {
                if (this.table[i] === "deleted") {
                    this.table[i] = undefined;
                } else {
                    this.put(this.table[i].key, this.table[i].value);
                }
            }
        }
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
