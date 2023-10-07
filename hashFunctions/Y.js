const addToDocumentsMap = (documentsMap, documentIndex, words) => {
    for (const word of words) {
        if (documentsMap.has(word)) {
            if (!documentsMap.get(word)[documentIndex]) {
                documentsMap.get(word)[documentIndex] = { count: 1 };
            } else {
                documentsMap.get(word)[documentIndex].count++;
            }
        } else {
            const countArray = new Array(documentIndex);
            countArray.push({ count: 1 });

            documentsMap.set(word, countArray);
        }
    }
};

const countMatchesByDocuments = (documentsWords, requestWords) => {
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

const getRequestRelevance = (documentsMap, requestSet) => {
    const matches = countMatchesByDocuments(documentsMap, requestSet);
    const relevance = Array.from(matches.keys())
        .filter((index) => matches[index] !== undefined)
        .sort((a, b) => matches[b] - matches[a])
        .slice(0, 5);

    console.log(relevance.map((item) => item + 1).join(" "));
};

const documentsMap = new Map();
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
        addToDocumentsMap(documentsMap, documentIndex, line.split(" "));
        documentIndex++;
        return;
    }

    if (parseInt(line) !== NaN && !requestsNumber) {
        requestsNumber = +line;
        return;
    }

    if (requestIndex < requestsNumber) {
        getRequestRelevance(documentsMap, new Set(line.split(" ")));
        requestIndex++;

        if (requestIndex !== requestsNumber) {
            return;
        }
    }

    rl.close();
});
