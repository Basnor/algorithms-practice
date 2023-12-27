const getGreedySchedule = (lessons) => {
    return lessons
        .sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] - b[0];
            }

            return a[1] - b[1];
        })
        .reduce((inSchedule, lesson) => {
            const lastInSchedule = inSchedule[inSchedule.length - 1]?.[1];

            if (!lastInSchedule || lesson[0] >= lastInSchedule) {
                inSchedule.push(lesson);
            }

            return inSchedule;
        }, []);
};

const lessons = [];
let linesCounter = 0,
    linesNumber;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (!linesNumber) {
        linesNumber = +line;

        return;
    }

    if (linesCounter < linesNumber) {
        lessons.push(line.split(" ").map((item) => +item));

        linesCounter++;
    }

    if (linesCounter === linesNumber) {
        schedule = getGreedySchedule(lessons);

        console.log(schedule.length);

        for (const lesson of schedule) {
            console.log(lesson.join(" "));
        }

        rl.close();
    }
});
