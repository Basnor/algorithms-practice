class RollingHash {
    prefixHashes = [0];
    powers = [1];

    constructor(a, m) {
        this.a = a;
        this.m = m;
    }

    setPrefixHashes(str) {
        for (let i = 1; i <= str.length; i++) {
            this.prefixHashes[i] = (this.prefixHashes[i - 1] * this.a + str.charCodeAt(i - 1)) % this.m;
        }
    }

    setPowers(str) {
        for (let i = 1; i <= str.length; i++) {
            this.powers[i] = (this.powers[i - 1] * this.a) % this.m;
        }
    }

    getHash(start, end) {
        const tmp1 = this.prefixHashes[end];
        const tmp2 = this.prefixHashes[start - 1];
        const tmp3 = this.powers[end - start];
        return (this.prefixHashes[end] + this.m - ((this.prefixHashes[start - 1] * this.powers[end - start + 1]) % this.m)) % this.m;
    }
}

const buffer = [];
let rollingHash = new RollingHash();
let lineNumber = 0;
let substringsNumber = 1;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
    if (lineNumber < 2) {
        buffer.push(+line);
    } else if (lineNumber === 2) {
        rollingHash = new RollingHash(...buffer);
        rollingHash.setPrefixHashes(line);
        rollingHash.setPowers(line);
        buffer.length = 0;
    }

    if (lineNumber === 3) {
        substringsNumber = +line;
    } else if (lineNumber > 3 && lineNumber <= substringsNumber + 3) {
        const indexes = line.split(" ").map((item) => +item);

        console.log(rollingHash.getHash(...indexes));
    }

    if (lineNumber === substringsNumber + 3) {
        rl.close();
    }

    lineNumber++;
});
