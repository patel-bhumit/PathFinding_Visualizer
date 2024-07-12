import { latLng } from "leaflet";

const createGraph = (data) => {

    let graph = new Map();
    let coords = new Map();

    const nodes = data.elements.filter(elem => {
            return elem.type === "way"
    });

    const allowedHighways = [
        "motorway", "trunk", "primary", "secondary", "tertiary", "unclassified",
        "residential", "motorway_link", "trunk_link", "primary_link",
        "secondary_link", "tertiary_link", "living_street"
      ];
      
    const filteredNodes = nodes.filter(elem => allowedHighways.includes(elem.tags.highway));

    for(let i = 0; i < filteredNodes.length - 1; i++){
        const node = filteredNodes[i];
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