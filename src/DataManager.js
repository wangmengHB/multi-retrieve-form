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
        node.ele.value = newVal
        if (node.targetNodes.length === 0) {
            return this._render()
        }
        let targetNodes = node.targetNodes;

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
        let expression = node.ele.expression;
        let sourceNodes = node.sourceNodes;
        let finalExp = genFinalExp(expression, sourceNodes)
        remoteCompute(finalExp).then(val => {
            node.ele.value = val
            let nextTargetNodes = node.targetNodes;
            if (nextTargetNodes.length === 0) {
                return doComputationJob(targetNodes, ++index).then(() => {
                    resolve()
                })
            }
            doComputationJob(nextTargetNodes, 0).then(() => {
                resolve()
            })
        })
    })
}


function genFinalExp (expression, sourceNodes) {
    let ID_REG = /\[\[\w+\]\]/g
    let sourceIds = (expression.match(ID_REG) || [])
        .map(str => str.replace(/(\[\[)(\w+)(\]\])/, '$2'))
    let sourceValues = sourceIds.map(id => {
        for (let i = 0; i < sourceNodes.length; i++) {
            if (id === sourceNodes[i].ele.id) {
                return sourceNodes[i].ele.value
            }
        }
    })
    let exp = expression
    for (let i = 0; i < sourceIds.length; i++) {
        let id = sourceIds[i], val = sourceValues[i]
        exp = exp.replace(`[[${id}]]`, val)
    }
    if (exp.indexOf('[[004]])') > -1) {
        debugger;
    }

    return exp
}