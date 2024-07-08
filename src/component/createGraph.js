import { latLng } from "leaflet";

const createGraph = (data) => {

    let graph = new Map();
    let coords = new Map();

    const nodes = data.elements.filter(elem => {
        return elem.type === "way"
    });

    for(let i = 0; i < nodes.length - 1; i++){
        const node = nodes[i];
        for(let j = 0; j < node.nodes.length-1; j++){
            let fromCoord = latLng(node.geometry[j].lat, node.geometry[j].lon);
            let fromNode = node.nodes[j];
            let toNode = node.nodes[j+1];
            
            if (!graph.has(fromNode)) {
                graph.set(fromNode,[]);
                coords.set(fromNode, fromCoord);
            }
    
            let toCoord = latLng(node.geometry[j+1].lat, node.geometry[j+1].lon);

            let distance = fromCoord.distanceTo(toCoord);    
            
            graph.get(fromNode).push({ node: toNode, distance, toCoord});
            
        }                        
    }

    return [graph, coords];
}


export default createGraph;