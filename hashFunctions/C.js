class SubStringHash {
    prefixHashes = [0];
    powers = [1];

    constructor(base, mod) {
        this.base = base;
        this.mod = mod;
    }

    setPrefixHashes(str) {
        for (let i = 1; i <= str.length; i++) {
            this.prefixHashes[i] = (this.prefixHashes[i - 1] * this.base + str.charCodeAt(i - 1)) % this.mod;
        }
    }

    setPowers(str) {
        for (let i = 1; i <= str.length; i++) {
            this.powers[i] = (this.powers[i - 1] * this.base) % this.mod;
        }
    }

    getHash(start, end) {
        return (this.prefixHashes[end] + this.mod - ((this.prefixHashes[start - 1] * this.powers[end - start + 1]) % this.mod)) % this.mod;
    }
}

const buffer = [];
let subStringHash;
let lineNumber = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
    if (lineNumber < 2) {
        buffer.push(+line);
    } else if (lineNumber === 2) {
        subStringHash = new SubStringHash(...buffer);
        subStringHash.setPrefixHashes(line);
        subStringHash.setPowers(line);
        buffer.length = 0;
    }

    if (lineNumber === 3) {
        buffer.push(+line);
    } else if (lineNumber > 3 && lineNumber <= buffer[0] + 3) {
        const indexes = line.split(" ").map((item) => +item);

        console.log(subStringHash.getHash(...indexes));
    }

    if (lineNumber === buffer[0] + 3) {
        rl.close();
    }

    lineNumber++;
});
