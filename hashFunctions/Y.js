const addWords = (wordsMap, index, words) => {
    for (const word of words) {
        if (wordsMap.has(word)) {
            if (!wordsMap.get(word)[index]) {
                wordsMap.get(word)[index] = { count: 1 };
            } else {
                wordsMap.get(word)[index].count++;
            }
        } else {
            const countArray = new Array(index);
            countArray.push({ count: 1 });

            wordsMap.set(word, countArray);
        }
    }
};

const countMatches = (documentsWords, requestWords) => {
    const matchCounter = [];

    for (const word of requestWords) {
        if (!documentsWords.has(word)) {
            continue;
        }

        const documentMatch = documentsWords.get(word);

        for (let i = 0; i < documentMatch.length; i++) {
            const count = documentMatch[i]?.count;

            if (count) {
                matchCounter[i] = (matchCounter[i] || 0) + count;
            }
        }
    }

    return matchCounter;
};

const getRelevance = (wordsMap, requestSet) => {
    const matches = countMatches(wordsMap, requestSet);
    const relevance = Array.from(matches.keys())
        .filter((index) => matches[index] !== undefined)
        .sort((a, b) => matches[b] - matches[a])
        .slice(0, 5);

    console.log(relevance.map((item) => item + 1).join(" "));
};

const wordsMap = new Map();
let requestIndex = 0;
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
        addWords(wordsMap, documentIndex, line.split(" "));
        documentIndex++;
        return;
    }

    if (parseInt(line) !== NaN && !requestsNumber) {
        requestsNumber = +line;
        return;
    }

    if (requestIndex < requestsNumber) {
        getRelevance(wordsMap, new Set(line.split(" ")));
        requestIndex++;

        if (requestIndex !== requestsNumber) {
            return;
        }
    }

    rl.close();
});
