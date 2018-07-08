import './style.scss'
import React from 'react'
import PropTypes from 'prop-types'

export default class App extends React.Component {
    static propTypes = {
        onValueChange: PropTypes.func,
        elements: PropTypes.array,
    }

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="multi-form">
                <div className="description">
                    this is a demo for the design of form with multi retrieve feature.
                    <br/>
                    These variables has a dependencies graph inside. <br/>
                    Once a variable's value is changed by user, <br/>
                    it will call a mock api to do the calculation.<br/>
                    In this case, <br/>
                    A -> B:  B depends on A <br/>
                    B -> C:  C depends on B  <br />
                    B -> D:  D depends on B  <br />
                    (A, D) -> E: B depends on both A and D <br />
                </div>
                {
                    this.props.elements.map((el, index) => {
                        return (
                          <InputControl
                            key={index}
                            id={el.id}
                            name={el.name}
                            value={el.value}
                            onValueChange={this.props.onValueChange}
                          />
                        )
                    })
                }

            </div>
        )
    }
}


class InputControl extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onValueChange: PropTypes.func
    }

    constructor (props) {       
        super(props)
        this.state = {
            value: this.props.value
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    componentWillReceiveProps (nextProps, nextState) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    handleChange (e) {
        this.setState({
            value: e.target.value
        })
    }

    handleBlur (e) {
        if (e.target.value !== this.props.value) {
            this.props.onValueChange(this.props.id, this.state.value)
        }
    }

    render () {
        return (
          <div className="input-control">
            <div className="label">
                {this.props.name}
            </div>
            <input 
              className="input" 
              type="text" 
              value={this.state.value} 
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
        )
    }
}