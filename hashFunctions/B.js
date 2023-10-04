const getHash = (s, a = 1000, m = 123987123) => {
    let hash = 0;

    for (let i = 0; i < s.length; i++) {
        const isLastChar = i === s.length - 1;

        hash = ((hash + s.charCodeAt(i)) * (isLastChar ? 1 : a)) % m;
    }

    return hash;
};

const getRandom = (max, min = 0) => {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const generateString = (maxLength = 1000) => {
    let string = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const length = getRandom(maxLength);

    let counter = 0;
    while (counter < length) {
        string += alphabet.charAt(getRandom(alphabet.length));
        counter += 1;
    }

    return string;
};

const hashMap = new Map();

while (true) {
    const s = generateString();
    const hash = getHash(s);

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
