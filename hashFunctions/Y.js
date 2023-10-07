const countMatches = (document, words) => {
    let counter = 0;

    for (const word of words) {
        if (document.has(word)) {
            counter += document.get(word).count;
        }
    }

    return counter;
};

const getRequestRelevance = (documents, request) => {
    const relevanceMap = new Map();

    for (let i = 0; i < documents.length; i++) {
        const relevance = countMatches(documents[i], request);

        if (relevance === 0) {
            continue;
        }

        if (relevanceMap.has(relevance)) {
            relevanceMap.get(relevance).push(i);
        } else {
            relevanceMap.set(relevance, [i]);
        }
    }

    const relevance = [...relevanceMap.keys()]
        .sort((a, b) => b - a)
        .flatMap((relevance) => relevanceMap.get(relevance))
        .slice(0, 5);

    console.log(relevance.map((item) => item + 1).join(" "));
};

const documents = [];
let requestsCounter = 0;
let requestsNumber, documentsNumber;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (parseInt(line) !== NaN && !documentsNumber) {
        documentsNumber = +line;
        return;
    }

    if (documents.length < documentsNumber) {
        const wordsMap = new Map();
        for (const word of line.split(" ")) {
            if (wordsMap.has(word)) {
                wordsMap.get(word).count++;
            } else {
                wordsMap.set(word, { count: 1 });
            }
        }

        documents.push(wordsMap);
        return;
    }

    if (parseInt(line) !== NaN && !requestsNumber) {
        requestsNumber = +line;
        return;
    }

    if (requestsCounter < requestsNumber) {
        getRequestRelevance(documents, new Set(line.split(" ")));
        requestsCounter++;

        if (requestsCounter !== requestsNumber) {
            return;
        }
    }

    rl.close();
});
