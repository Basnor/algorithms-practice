class CNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function height(root) {
    if (!root) {
        return 0;
    }

    return Math.max(height(root.left), height(root.right)) + 1;
}

function solution(root) {
    if (!root) {
        return true;
    }

    if (!solution(root.left) || !solution(root.right)) {
        return false;
    }

    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    return Math.abs(leftHeight - rightHeight) <= 1;
}

function test1() {
    var node1 = new CNode(1);
    var node2 = new CNode(-5);
    var node3 = new CNode(3);
    node3.left = node1;
    node3.right = node2;
    var node4 = new CNode(10);
    var node5 = new CNode(2);
    node5.left = node3;
    node5.right = node4;
    console.assert(solution(node5));
}

function test2() {
    var node0 = new CNode(0);
    var node1 = new CNode(1);
    var node2 = new CNode(2);
    var node3 = new CNode(3);
    var node4 = new CNode(4);
    var node5 = new CNode(5);
    var node6 = new CNode(6);
    var node7 = new CNode(7);
    var node8 = new CNode(8);
    node0.left = node1;
    node0.right = node2;
    node1.left = node3;
    node2.right = node4;
    node3.left = node5;
    node3.right = node6;
    node4.left = node7;
    node4.right = node8;
    console.assert(!solution(node0));
}

test2();
