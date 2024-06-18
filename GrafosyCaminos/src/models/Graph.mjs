import LinkedList from './LinkendList.mjs';

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(value, this.#matrizAdyacencia.length - 1);
        }
    }

    addV(value) {
        this.#matrizAdyacencia.push(new LinkedList());
        this.#map.set(value, this.#matrizAdyacencia.length - 1);
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#matrizAdyacencia[this.#map.get(start)].push(end, weight);
            return true;
        }
        return false;
    }

    bfs(callback){
        let queue = []
        let list = []
        const entries = [...structuredClone(this.#map)];
        for (let i=0; i<this.#matrizAdyacencia.length;i++)
            list[i] = false
        
        let [key] = entries[0]
        queue.push(key)
        
        while (queue.length > 0) {
            let val = queue.shift() 
            callback(val) 
            list[this.#map.get(val)] = true 
            for (let i=0;i<this.#matrizAdyacencia[this.#map.get(val)].length;i++) {
                if (this.#matrizAdyacencia[this.#map.get(val)][i]){
                    let [key] = entries[i]
                    if (!list[this.#map.get(key)] && !queue.includes(key)) 
                        queue.push(key) 
                }
            }
        }

    }

    dfs(callback) {
        let stack = [];
        let list = [];
        const entries = [...structuredClone(this.#map)];
        for (let i = 0; i < this.#matrizAdyacencia.length; i++)
            list[i] = false;

        let [key] = entries[0];
        stack.push(key);
    
        while (stack.length > 0) {
            let val = stack.pop();
            if (!list[this.#map.get(val)]) {
                callback(val);
                list[this.#map.get(val)] = true;
                let neighbors = [...this.#matrizAdyacencia[this.#map.get(val)].iterator()];
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    let neighbor = neighbors[i];
                    if (!list[this.#map.get(neighbor.name)])
                        stack.push(neighbor.name);
                }
            }
        }
    }
    
    
    
}
