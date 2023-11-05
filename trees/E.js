if (process.env.REMOTE_JUDGE !== "true") {
    class CNode {
        constructor(value, left = null, right = null) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
}

function solution(root) {
    const compare = (node, min, max) => {
        if (node === null) {
            return true;
        }

        if (min && node.value <= min) {
            return false;
        }

        if (max && node.value >= max) {
            return false;
        }

        return compare(node.left, min, node.value) && compare(node.right, node.value, max);
    };

    return compare(root, null, null);
}

function test() {
    var node1 = new CNode(1, null, null);
    var node2 = new CNode(4, null, null);
    var node3 = new CNode(3, node1, node2);
    var node4 = new CNode(8, null, null);
    var node5 = new CNode(5, node3, node4);
    console.assert(solution(node5));
    node4.value = 5;
    console.assert(!solution(node5));
}
