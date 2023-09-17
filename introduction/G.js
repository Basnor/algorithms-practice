const decToBinary = (dec) => {
    let binary = "";

    let shiftedDec = dec;
    while (shiftedDec > 0) {
        binary = (shiftedDec & 1) + binary;
        shiftedDec >>= 1;
    }

    return binary || 0;
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const dec = parseInt(line);

    console.log(decToBinary(dec));

    rl.close();
});
