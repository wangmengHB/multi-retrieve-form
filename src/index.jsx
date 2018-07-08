import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Graph from './Graph'
import FormDefinition from './FormDefinition';
import DataManager from './DataManager'


// sample form defintion return from server api
let sample = {
    elements: [
        {
            id: '001',
            name: 'variable A',
            value: '',
            depends: [],
            expression: '',
        },
        {
            id: '002',
            name: 'variable B',
            value: '',
            depends: ['001'],
            expression: 'operation: getMoney([[001]])',
        },
        {
            id: '003',
            name: 'variable C',
            value: '',
            depends: ['002'],
            expression: 'operation:exp([[002]])',
        },
        {
            id: '004',
            name: 'variable D',
            value: '',
            depends: ['002'],
            expression: 'operation: minor([[002]])',
        },
        {
            id: '005',
            name: 'variable E',
            value: '',
            depends: ['001', '004'],
            expression: 'operation: add([[001]],[[004]])',
        },
    ]
}

let form = new FormDefinition(sample)
let graph = new Graph(form)
let dataMgr = new DataManager(graph)
dataMgr.registerRenderHook(render)
let onValueChange = dataMgr.handleValueChange.bind(dataMgr)

// just create root element in DOM
let appRoot = document.createElement('div')
document.body.appendChild(appRoot)


function render() {
    ReactDOM.render(
        <App elements={form.elements} onValueChange={onValueChange}/>,
        appRoot
    )
}

render()