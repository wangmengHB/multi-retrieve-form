export default class Element {
    constructor (item) {
        this.id =  item.id                      // id should be unique in form
        this.name = item.name
        this.expression = item.expression
        this.depends = item.depends               // variable ids
        this.value = item.value
        this.defaultValue = item.defaultValue          
    }
}