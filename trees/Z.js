class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function rightmost(node) {
    let rightmost = node;

    while (rightmost.right) {
        rightmost = rightmost.right;
    }

    return rightmost;
}

function remove(node, key) {
    if (!node) {
        return null;
    }

    // left subtree
    if (node.value > key) {
        node.left = remove(node.left, key);
    }

    // right subtree
    if (node.value < key) {
        node.right = remove(node.right, key);
    }

    if (node.value === key) {
        if (!node.left) {
            return node.right;
        }

        if (!node.right) {
            return node.left;
        }

        // look for rightmost node in the left subtree
        const rightmost = rightmost(node.left);

        node.value = rightmost.value;
        node.left = remove(node.left, rightmost.value);
    }

    return node;
}

function test() {
    var node1 = new Node(2, null, null);
    var node2 = new Node(3, node1, null);
    var node3 = new Node(1, null, node2);
    var node4 = new Node(6, null, null);
    var node5 = new Node(8, node4, null);
    var node6 = new Node(10, node5, null);
    var node7 = new Node(5, node3, node6);
    var newHead = remove(node7, 10);
    console.assert(newHead.value === 5);
    console.assert(newHead.right === node5);
    console.assert(newHead.right.value === 8);
}
