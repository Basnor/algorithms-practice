const MOD = 10 ** 9 + 7;

const countNumberOfWays = (endPoint, unit, dp) => {
    // 2. Базовые случаи
    if (endPoint < 0) {
        return 0;
    }

    if (endPoint < 2) {
        dp[endPoint] = endPoint;

        return endPoint;
    }

    if (dp[endPoint] !== 0) {
        return dp[endPoint] % MOD;
    }

    // 4. Вычисление данных в порядке возрастания индекса, динамика назад
    for (let i = 1; i <= unit; i++) {
        // 3. Переход динамики
        dp[endPoint] += countNumberOfWays(endPoint - i, unit, dp) % MOD;
    }

    // 5. Ответ на исходный вопрос лежит в последнем элемента массива
    return dp[endPoint] % MOD;
};

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const [endPoint, unit] = line.split(" ").map((item) => +item);

    // 1. Сохраняет ответы на подзадачи
    const dp = new Array(endPoint + 1).fill(0);

    console.log(countNumberOfWays(endPoint, unit, dp));

    rl.close();
});
