const countMatches = (documentWords, requestWords) => {
    const counter = [];

    for (const word of requestWords) {
        if (!documentWords.has(word)) {
            continue;
        }

        const documentWordInfo = documentWords.get(word);

        for (let i = 0; i < documentWordInfo.length; i++) {
            const count = documentWordInfo[i]?.count;

            if (!count) {
                continue;
            }

            counter[i] = (counter[i] || 0) + count;
        }
    }

    const result = Array.from(counter.keys())
        .filter((key) => counter[key] !== undefined)
        .sort((a, b) => counter[b] - counter[a])
        .slice(0, 5);

    return result;
};

const getRequestRelevance = (documents, request) => {
    const relevanceMap = countMatches(documents, request);

    console.log(relevanceMap.map((item) => item + 1).join(" "));
};

const documentsMap = new Map();
let requestsCounter = 0;
let documentIndex = 0;
let requestsNumber, documentsNumber;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (parseInt(line) !== NaN && !documentsNumber) {
        documentsNumber = +line;
        return;
    }

    if (documentIndex < documentsNumber) {
        for (const word of line.split(" ")) {
            if (documentsMap.has(word)) {
                if (!documentsMap.get(word)[documentIndex]) {
                    documentsMap.get(word)[documentIndex] = { count: 1 };
                } else {
                    documentsMap.get(word)[documentIndex].count++;
                }
            } else {
                const array = new Array(documentIndex);
                array.push({ count: 1 });
                documentsMap.set(word, array);
            }
        }

        documentIndex++;
        return;
    }

    if (parseInt(line) !== NaN && !requestsNumber) {
        requestsNumber = +line;
        return;
    }

    if (requestsCounter < requestsNumber) {
        getRequestRelevance(documentsMap, new Set(line.split(" ")));
        requestsCounter++;

        if (requestsCounter !== requestsNumber) {
            return;
        }
    }

    rl.close();
});
