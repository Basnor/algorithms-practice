const merge = (array) => {
    // сортируем по возрастанию начала отрезка и размеру
    array.sort((a, b) => (a[0] - b[0] === 0 ? b[1] - a[1] : a[0] - b[0]));

    const result = [array[0]];

    // сливаем промежутки
    for (let i = 1; i < array.length; i++) {
        const lastInResult = result[result.length - 1];

        if (array[i][0] > lastInResult[1]) {
            result.push(array[i]);
        } else if (array[i][1] >= lastInResult[1]) {
            lastInResult[1] = array[i][1];
        }
    }

    return result;
};

let areasNumber;
const areas = [];
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!areasNumber) {
        areasNumber = parseInt(line);
    } else {
        areas.push(line.split(" ").map((item) => parseInt(item)));
    }

    if (areas.length === areasNumber) {
        const mergedAreas = merge(areas);

        console.log(mergedAreas.map((area) => area.join(" ")).join("\n"));

        rl.close();
    }
});
