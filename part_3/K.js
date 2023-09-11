/*
 * Сотортирует передаваемый подмассив
 */
function merge_sort(arr, left, right) {
    if (right - left === 1) {
        return arr;
    }

    const mid = Math.floor((left + right) / 2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid, right);

    const sortedArr = merge(arr, left, mid, right);

    for (let i = left, j = 0; i < right; i++, j++) {
        arr[i] = sortedArr[j];
    }
}

/*
 * Сливает два отсортированных массива в один отсортированный
 */
function merge(arr, left, mid, right) {
    const mergedArr = new Array(right - left).fill(null);

    let leftPointer = left,
        rightPointer = mid,
        i = 0;
    while (leftPointer < mid && rightPointer < right) {
        // выбираем, из какого массива забрать минимальный элемент
        if (arr[leftPointer] <= arr[rightPointer]) {
            mergedArr[i] = arr[leftPointer];
            leftPointer++;
        } else {
            mergedArr[i] = arr[rightPointer];
            rightPointer++;
        }
        i++;
    }

    // Если один массив закончился раньше, чем второй, то
    // переносим оставшиеся элементы второго массива в результирующий
    while (leftPointer < mid) {
        mergedArr[i] = arr[leftPointer];
        leftPointer++;
        i++;
    }
    while (rightPointer < right) {
        mergedArr[i] = arr[rightPointer];
        rightPointer++;
        i++;
    }

    return mergedArr;
}

function test() {
    var a = [1, 4, 9, 2, 10, 11];
    var b = merge(a, 0, 3, 6);
    var expected = [1, 2, 4, 9, 10, 11];

    var c = [1, 4, 2, 10, 1, 2];
    merge_sort(c, 0, 6);
    expected = [1, 1, 2, 2, 4, 10];
}
