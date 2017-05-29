import React, {Component} from 'react'
import FrwkUtil from '../util/FrwkUtil'

export default class BaseComponent extends Component {

    constructor(props, context) {
        super(props, context)
    }

    getValueByReducers() {
        !this.props.valueLink && window.console.error('BaseComponent.getValueByReducers, valueLink miss', this._reactInternalInstance.getName(), this.props)
        switch (arguments.length) {
            case 0:
                return FrwkUtil.store.getValueByReducers(this.props, this.props.valueLink)
            case 1:
                return FrwkUtil.store.getValueByReducers(arguments[0], arguments[0].valueLink)
            case 2:
                return FrwkUtil.store.getValueByReducers(arguments[0], arguments[1])
        }
    }

    setValueByReducers() {
        !this.props.valueLink && window.console.error('BaseComponent.setValueByReducers, valueLink miss', this._reactInternalInstance.getName(), this.props)
        switch (arguments.length) {
            case 1:
                this.props.setValueByReducers(this.props.valueLink, arguments[0])
                break
            case 2:
                this.props.setValueByReducers(arguments[0], arguments[1])
                break
        }
    }

    render() {
        return (
            <h1>重写父类render()方法</h1>
        )
    }
}