function brokenSearch(arr, k) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === k) {
            return mid;
        }

        // все элементы [left, mid] в порядке убывания
        if (arr[mid] >= arr[left]) {
            // элемент принадлежит [left, mid)
            if (k >= arr[left] && k < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // все элементы [mid, right] в порядке возрастания
        if (arr[mid] <= arr[right]) {
            // элемент принадлежит (mid, right]
            if (k > arr[mid] && k <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

function test() {
    const arr = [19, 21, 100, 101, 1, 4, 5, 7, 12];
    if (brokenSearch(arr, 5) !== 6) {
        console.error("WA");
    }
}
