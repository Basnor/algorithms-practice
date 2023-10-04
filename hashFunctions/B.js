const getPolyhash = (str, base = 1000, mod = 123987123) => {
    let hash = 0;

    for (const char of str) {
        hash = (hash * base + char.charCodeAt(0)) % mod;
    }

    return hash;
};

const getRandom = (max, min = 0) => {
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
};

const generateString = (maxLength = 1000) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const length = getRandom(maxLength);

    let generatedString = "";
    let counter = 0;
    while (counter < length) {
        generatedString += alphabet.charAt(getRandom(alphabet.length));
        counter += 1;
    }

    return generatedString;
};

const hashMap = new Map();

while (true) {
    const s = generateString();
    const hash = getPolyhash(s);

    if (!hashMap.has(hash)) {
        hashMap.set(hash, s);
        continue;
    }

    if (hashMap.get(hash) === s) {
        continue;
    }

    console.log([hashMap.get(hash), s]);
    break;
}
