class Node {
    constructor(value = null, level = 0) {
        this.value = value;
        this.level = level;
        this.isEndOfWord = false;
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(word) {
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            const character = word[i];

            if (current.children[character] === undefined) {
                current.children[character] = new Node(character, i + 1);
            }

            current = current.children[character];
        }

        current.isEndOfWord = true;
    }

    match(text, dp) {
        for (let i = 0; i < text.length; i++) {
            let current = this.root;
            let j = i;

            while (current.children[text[j]] !== undefined) {
                current = current.children[text[j]];

                if (current.isEndOfWord) {
                    if (dp[j - current.level + 1] === true) {
                        dp[j + 1] = true;
                    }
                }

                j++;
            }
        }
    }
}

const dictionary = [];
let lineCounter = 0,
    linesNumber,
    text;
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const rl = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, "input.txt")),
});

rl.on("line", (line) => {
    if (lineCounter === 0) {
        text = line;
        lineCounter++;
        return;
    }

    if (lineCounter === 1) {
        linesNumber = +line;
        lineCounter++;
        return;
    }

    if (lineCounter - 2 < linesNumber) {
        dictionary.push(line);
        lineCounter++;
    }

    if (lineCounter - 2 === linesNumber) {
        const trie = new Trie();

        for (const word of dictionary) {
            trie.insert(word);
        }

        const dp = new Array(text.length + 1).fill(false);
        dp[0] = true;
        trie.match(text, dp);

        if (dp[text.length] === true) {
            console.log("YES");
        } else {
            console.log("NO");
        }

        rl.close();
    }
});
