import { delay } from "framer-motion";

class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
        this.nodes.push({ key, priority });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift();
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return !this.nodes.length;
    }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const dijkstra = async (graph, coordsGraph, startNode, endNode, drawPath, signal, showTrace) => {
    
    
    const distances = {};
    const prev = {};
    const pq = new PriorityQueue();

    graph.forEach((_, node) => {
        distances[node] = Infinity;
        prev[node] = null;
    });

    if (!coordsGraph.has(startNode) || !coordsGraph.has(endNode)) {
        console.error(`Start node or end node not found in graph: startNode=${startNode}, endNode=${endNode}`);
        return { path: [], distance: Infinity };
    }

    distances[startNode] = 0;
    pq.enqueue(0, startNode);

    while (!pq.isEmpty()) {
        if (signal.aborted) {
            console.log('Dijkstra algorithm aborted');
            return { path: [], distance: Infinity }; // Exit early if aborted
        }

        const { key: currentNode } = pq.dequeue();

        if (!coordsGraph.has(currentNode)) {
            console.error(`Node ${currentNode} not found in graph`);
            continue;
        }

        if (currentNode === endNode) {
            break;
        }

        const neighbors = graph.get(currentNode);
        if (!neighbors) {
            console.warn(`Node ${currentNode} has no neighbors`);
            continue;
        }

        for (const neighbor of neighbors) {
            const { node: neighborNode, distance } = neighbor;
            const alt = distances[currentNode] + distance;
            if(showTrace){
                await drawPath(coordsGraph.get(currentNode), coordsGraph.get(neighborNode), "red");
                await sleep(delay);
            }
            if (alt < distances[neighborNode]) {
                distances[neighborNode] = alt;
                prev[neighborNode] = currentNode;
                pq.enqueue(alt, neighborNode);
            }
        }
    }

    const path = [];
    let u = endNode;

    while (prev[u] !== null) {
        path.unshift(u);
        u = prev[u];
    }

    if (u === startNode) path.unshift(startNode);

    return { path, distance: distances[endNode] };
}

export default dijkstra;
