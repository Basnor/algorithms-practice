function binarySearch(arr, x, left = 0, right = arr.length) {
    if (right <= left) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] >= x) {
        if (mid - 1 >= 0 && arr[mid - 1] >= x) {
            return binarySearch(arr, x, left, mid);
        } else {
            return mid + 1;
        }
    } else {
        return binarySearch(arr, x, mid + 1, right);
    }
}

const lines = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    lines.push(line);

    const savings = getSavings();
    const price = getPrice();

    if (savings !== undefined && price) {
        const days = [-1, -1];

        days[0] = binarySearch(savings, price);
        days[1] = binarySearch(savings, price * 2);

        console.log(days.join(" "));

        rl.close();
    }
});

getPrice = () => parseInt(lines[2]);
getSavings = () => lines[1]?.split(" ").map((item) => parseInt(item));
