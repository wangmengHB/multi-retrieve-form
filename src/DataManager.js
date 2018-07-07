
function noob () {}



export default class DataManager {
    constructor (graph) {
        this._render = noob
    }

    registerRenderHook(render) {
        this._render = render
    }

    handleValueChange (id, newVal) {

    }

    
}