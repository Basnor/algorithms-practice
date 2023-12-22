class Vertex {
    constructor(start, end, weight) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

class Graph {
    constructor(vertices, n) {
        this.vertices = Array.from({ length: n }, (_, i) => i + 1);
        this.added = new Set(); // Множество вершин, уже добавленных в остов
        this.notAdded = new Set(this.vertices); // Множество вершин, ещё не добавленных в остов
        this.edges = new Set(); // Массив рёбер, исходящих из остовного дерева
        this.adjacencyList = vertices.reduce((list, vertex) => {
            list.set(vertex.start, list.get(vertex.start).add(vertex));
            list.set(vertex.end, list.get(vertex.end).add(vertex));

            return list;
        }, new Map(Array.from({ length: n }, (_, i) => [i + 1, new Set()])));
    }

    findMaxST() {
        let weight = 0;

        // Берём первую попавшуюся вершину.
        this.#addVertex(this.vertices[0]);

        while (this.notAdded.size && this.edges.size) {
            const edge = this.#extractMaximum();

            if (this.notAdded.has(edge.end)) {
                weight += edge.weight;

                this.#addVertex(edge.end);
            }

            if (this.notAdded.has(edge.start)) {
                weight += edge.weight;

                this.#addVertex(edge.start);
            }
        }

        return this.notAdded.size > 0 ? null : weight;
    }

    #extractMaximum() {
        // Извлекает максимальное ребро из массива рёбер
        // и больше данного ребра в массива не будет
        let it = this.edges.values();
        let max = it.next().value;

        for (const edge of this.edges) {
            if (edge.weight > max.weight) {
                max = edge;
            }
        }

        this.edges.delete(max);

        return max;
    }

    #addVertex(vertex) {
        this.added.add(vertex);
        this.notAdded.delete(vertex);

        if (!this.adjacencyList.size) {
            return;
        }

        for (const edge of this.adjacencyList.get(vertex)) {
            if (this.notAdded.has(edge.start) || this.notAdded.has(edge.end)) {
                this.edges.add(edge);
            }
        }
    }
}

const vertices = [];
let verticesNumber, // вершины
    edgesNumber, // ребра
    edgesCounter = 0;
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin });

rl.on("line", (line) => {
    if (!verticesNumber && !edgesNumber) {
        [verticesNumber, edgesNumber] = line.split(" ").map((item) => +item);

        if (edgesNumber) {
            return;
        }
    }

    if (edgesCounter < edgesNumber) {
        const vertex = new Vertex(...line.split(" ").map((item) => +item));
        vertices.push(vertex);

        edgesCounter++;
    }

    if (edgesCounter === edgesNumber) {
        const graph = new Graph(vertices, verticesNumber);
        const maxST = graph.findMaxST();

        console.log(maxST === null ? "Oops! I did it again" : maxST);

        rl.close();
    }
});
