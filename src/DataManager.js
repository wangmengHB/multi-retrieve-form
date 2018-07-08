import {remoteCompute} from './api'


function noob () {}



export default class DataManager {
    constructor (graph) {
        this._render = noob
        this._graph = graph
    }

    registerRenderHook(render) {
        this._render = render
    }

    handleValueChange (id, newVal) {
        let node = this._graph.getNodeById(id)
        node.setValue(newVal)
        let targetNodes = node.getAllSortedTargetNodes();
        if (targetNodes.length === 0) {
            return this._render()
        }
    
        doComputationJob(targetNodes, 0).then(() => {
            this._render()
        })
        
    }

    
    
}

function doComputationJob(targetNodes, index = 0) {
    return new Promise((resolve, reject) => {
        let node = targetNodes[index]
        if (!node) {
            return resolve()
        }
        let expression = node.getExpression();
        let sourceNodes = node.getSourceNodes();
        let finalExp = genFinalExp(expression, sourceNodes)
        remoteCompute(finalExp).then(val => {
            node.setValue(val)
            return doComputationJob(targetNodes, ++index)
        }).then(() => resolve())
    })
}


function genFinalExp (expression, sourceNodes) {
    let ID_REG = /\[\[\w+\]\]/g
    let sourceIds = (expression.match(ID_REG) || [])
        .map(str => str.replace(/(\[\[)(\w+)(\]\])/, '$2'))
    let sourceValues = sourceIds.map(id => {
        for (let i = 0; i < sourceNodes.length; i++) {
            if (id === sourceNodes[i].getId()) {
                return sourceNodes[i].getValue()
            }
        }
    })
    let exp = expression
    for (let i = 0; i < sourceIds.length; i++) {
        let id = sourceIds[i], val = sourceValues[i]
        exp = exp.replace(`[[${id}]]`, val)
    }
    return exp
}