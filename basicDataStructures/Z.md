## ПРИНЦИП РАБОТЫ

Я реализацовала стек, для вычисления значения выражения, записанного в обратной польской нотации.

Выражение считывается слева направо и придерживаться следующих шагов:

1. Обработка входного символа:

    - Если на вход подан операнд, он помещается на вершину стека.

    - Если на вход подан знак операции, то эта операция выполняется над значениями, взятыми из стека в порядке добавления.

    - Результат выполненной операции помещается на вершину стека.

2. Если входной набор символов обработан не полностью, перейти к шагу 1.

3. После полной обработки входного набора символов результат вычисления выражения находится в вершине стека. Если в стеке осталось несколько чисел, то выводится только верхний элемент.

## ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

Стек реализован в виде класса, который хранит добавленные операнды. В классе реализована функциональность для добавления операнда в конец массива операнда, функциональность для удаления последнего операнда массива, а также метод для оработки знака операции.

Итоговый результат выполнения операции можно получить выполнив операцию удаления последнего элемента.

## ВРЕМЕННАЯ СЛОЖНОСТЬ

Операции вставки и удаления элемента стека выполняются за O(1). Операция парсинга строки выполняется за O(n), где n - количество символов во входной строке. Итерация символов выполняется за O(n / 2).

Итого, временная сложность составляет O(n).

## ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

Пространственная сложность составляет O(n), потому что в массиве n / 2 элементов.