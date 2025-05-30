const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

let lineNumber = 0;

let coefficients = [];
let polynomialValue = 0;

rl.on("line", (line) => {
    if (lineNumber === 1) {
        coefficients = line.split(' ').map((item) => +item);
    }
    else if (lineNumber === 2) {
        polynomialValue = +line;

        processPolynomial(coefficients, polynomialValue);

        rl.close();
    }

    lineNumber++;
});

const processPolynomial = (coeffs, value) => {
    let polynomialValue = value;

    for (let i = 0; i < coeffs.length; i++) {
        const exp = coeffs.length - i - 1;

        if (exp > Math.log10(value) + 1) {
            // Выводим коэффициенты, степени которых превосходят степень суммирующего числа
            process.stdout.write(coeffs[i] + " ");

            continue;
        }

        const accumulator = coeffs[i] * 10 ** exp;
        polynomialValue += accumulator;
    }

    for (const number of polynomialValue.toString()) {
        process.stdout.write(number + " ");
    }
}
