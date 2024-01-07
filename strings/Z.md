## ПРИНЦИП РАБОТЫ

Я реализовала алгоритм, который по строке и набору допустимых слов определяет, можно ли разбить текст на отдельные слова из набора.

Из условия:

-   Строка может встречаться в разбиении текста произвольное число раз.
-   Можно использовать не все строки для разбиения.
-   Строки могут идти в любом порядке.

Программа выводит «YES», если текст можно разбить на слова из имеющегося словаря.
Программа выводит «NO» в ином случае.

## ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

Алгоритм содержит класс бора (префиксного дерева), который хранит в себе набор слов. Каждое слово «прокладывает путь» по дереву от корня до некоторого конечного узла узла.

Более подробно изучить реализацию бора можно тут:
https://www.geeksforgeeks.org/trie-insert-and-search/

Для того, чтобы определить, разбивается ли текст на слова, в классе создан метод match. Этот метод работает по динамическому принципу:

1. В элементах dp[i] хранится флаг того, закончилось ли одно из слов на i-том символе.
2. Базовый случай такой динамики только один: dp[0] = true.
3. Формула перехода: dp[i] = dp[i - k], где dp[i - k] = true. Считаем, что k — длина слова.
4. Массив dp заполняется в прямом порядке. Динамика назад.
5. Ответ будет лежать в последнем элементе матрицы dp. Это означает, что слово возможно собрать из имеющегося словаря.

## ВРЕМЕННАЯ СЛОЖНОСТЬ

Сложность заполнения префиксного дерева O(n \* m) = O(l), где n - количество слов в словаре, m - средняя длина слов в словаре, l - суммарная длина всех слов в словаре.

Сложность заполнения матрицы динамического программирования составляет O(k \* m), где k - количество символов в строке, m - средняя длина слов в словаре.

Итого, итоговая временная сложность: O(m \* (n + k)) = O(l + k \* m).

## ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

Сложность префиксного дерева O(l). Сложность заполнения матрицы динамического программирования составляет O(k).

Итого, пространственная сложность составляет O(l + k).