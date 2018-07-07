import Element from './Element'

export default class FormDefinition {
    constructor (form) {
        this.elements = [];
        form.elements.forEach(item => {
            let ele = new Element(item)
            this.elements.push(ele)
        })
    }
}
