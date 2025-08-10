const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lineNumber = 0;

rl.on('line', (line) => {
    if (lineNumber === 0) {
        lineNumber++;
        return;
    }

    const n = line.split(' ').map(Number).sort((a, b) => b - a);

    let i = 0;
    let j = i + 1;
    let k = i + 2;

    while (n[i] >= n[j] + n[k]) {
        if (k < n.length - 1) {
            k = k + 1;
            continue;
        }

        if (j < n.length - 2) {
            j = j + 1;
            k = j + 1;
            continue;
        }

        if (i < n.length - 3) {
            i = i + 1;
            j = i + 1;
            k = i + 2;
            continue;
        }

        break;
    }

    // Гарантируется, что тройка чисел всегда есть
    console.log(n[i] + n[j] + n[k]);

    rl.close();
});