/*
-- ID: 89964305 --

-- ПРИНЦИП РАБОТЫ --
Я реализацовала стек, для вычисления значения выражения, записанного 
в обратной польской нотации.

Выражение считывается слева направо и придерживаться следующих шагов:
1. Обработка входного символа:
    - Если на вход подан операнд, он помещается на вершину стека.
    - Если на вход подан знак операции, то эта операция выполняется 
    над значениями, взятыми из стека в порядке добавления. 
    - Результат выполненной операции помещается на вершину стека.
2. Если входной набор символов обработан не полностью, перейти к шагу 1.
3. После полной обработки входного набора символов результат вычисления 
выражения находится в вершине стека. Если в стеке осталось несколько 
чисел, то выводится только верхний элемент.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Стек реализован в виде класса, который хранит добавленные операнды. 
В классе реализована функциональность для добавления операнда в конец 
массива операнда, функциональность для удаления последнего операнда 
массива, а также метод для оработки знака операции.

Итоговый результат выполнения операции можно получить выполнив операцию 
удаления последнего элемента.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Операции вставки и удаления элемента стека выполняются за O(1).
Операция парсинга строки выполняется за O(n), где n - количество символов
во входной строке. Итерация символов выполняется за O(n / 2).

Итого, временная сложность составляет O(n).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Пространственная сложность составляет O(n), потому что в массиве n / 2 
элементов.
*/

class OperandsStack {
    constructor() {
        this.operands = [];
    }

    push(item) {
        this.operands.push(item);
    }

    pop() {
        return this.operands.pop();
    }

    apply(operator) {
        switch (operator) {
            case "+":
                this.push(this.pop() + this.pop());
                break;

            case "-":
                const subtrahend = this.pop();
                const minuend = this.pop();

                this.push(minuend - subtrahend);
                break;

            case "*":
                this.push(this.pop() * this.pop());
                break;

            case "/":
                const divider = this.pop();
                const divident = this.pop();

                this.push(Math.floor(divident / divider));
                break;
        }
    }
}

const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    const operands = new OperandsStack();
    const expression = parseLine(line);

    for (let item of expression) {
        if (typeof item === "number") {
            operands.push(item);
        } else {
            operands.apply(item);
        }
    }

    process.stdout.write(operands.pop() + "\n");

    rl.close();
}).on("close", () => {});

parseLine = (line) => {
    return line.split(" ").map((item) => (isNaN(parseInt(item)) ? item : parseInt(item)));
};
