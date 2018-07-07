export default class Graph {
    constructor(formDefinition) {
        this.depth = 0
        this.layers = []
        this.map = new Map()
        formDefinition.elements.forEach(ele => {
            this.map.set(ele.id, ele)
        })
        let max = this.map.size
        this.buildNodes(max)
    }

    buildNodes(max) {
        if (max <= 0) {
            return;
        }
        for (let [id, item] of this.map) {
            if (item instanceof Node) {
                continue;
            }
            if (item.depends.length === 0) {
                let node = new Node(item)
                this.map.set(id, node)
                this.buildLayers(node)
                max--
                continue;
            }
            if (item.depends.every(id => this.map.get(id) instanceof Node)) {
                let node = new Node(item)
                let sourceNodes = item.depends.map(id => this.map.get(id))
                node.setSourceNodes(sourceNodes)
                this.map.set(id, node)
                this.buildLayers(node)
                max--
                continue
            }
        }
        this.buildNodes(max)
    }

    buildLayers(node) {
        let level = node.level
        if (level >= this.depth) {
            this.depth = level
        }
        this.layers[level] = this.layers[level] || []
        let index = this.layers[level].indexOf(node)
        if (index === -1) {
            this.layers[level].push(node)
        }
    }

    getMaxLevel() {
        return this.depth
    }

    getNodesByLevel(num) {
        if (num > this.depth) {
            console.error("index exceeds graph's max depth")
            return null
        }
        return this.layers[num]
    }
}


class Node {
    constructor(ele) {
        this.ele = ele
        this.level = 0
        this.sourceNodes = []
        this.targetNodes = []
    }

    setTargetNode(node) {
        let index = this.targetNodes.indexOf(node)
        if (index === -1) {
            this.targetNodes.push(node)
        }
    }

    setSourceNodes(nodes) {
        this.sourceNodes = nodes
        let level = Math.max(...nodes.map(node => node.level)) + 1
        this.level = level
        nodes.forEach(node => node.setTargetNode(this))
    }

}