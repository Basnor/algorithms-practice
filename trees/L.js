function siftDown(heap, index) {
    const left = 2 * index;
    const right = 2 * index + 1;

    if (left >= heap.length) {
        return index;
    }

    let indexLargest = left;
    if (right < heap.length && heap[left] < heap[right]) {
        indexLargest = right;
    }

    if (heap[index] < heap[indexLargest]) {
        [heap[index], heap[indexLargest]] = [heap[indexLargest], heap[index]];

        return siftDown(heap, indexLargest);
    }

    return index;
}

function test1() {
    var sample = [-1, 12, 1, 8, 3, 4, 7];
    console.assert(siftDown(sample, 2) == 5);
}

function test2() {
    var sample = [12, 1, 8, 3, 4, 7];
    console.assert(siftDown(sample, 2) == 5);
}
