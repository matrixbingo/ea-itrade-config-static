/**
 * Created by liang.wang on 16/9/29.
 */
import React, {Component, PropTypes} from 'react'
import {FrwkUtil} from '../util/util.es6'
import './TextArea.less'

export default class TextArea extends Component {
    static propTypes = {
        valueLink: PropTypes.string.isRequired
    }

    static defaultProps = {
        disabled: false,
        viewOnly: false,
        rows: 10,
        placeholder: '',
        valueLink: '',
        defaultValue: ''
    }

    constructor(props) {
        super(props)
        this.state = {
            disabled: this.props.disabled,
            viewOnly: this.props.viewOnly
        }
    }

    onChange(e) {
        this.props.setValueByReducers(this.props.valueLink, e.target.value)
    }

    componentWillReceiveProps(props) {
        if (props.disabled != this.state.disabled) {
            this.setState({
                disabled: props.disabled
            })
        }
        if (props.viewOnly != this.state.viewOnly) {
            this.setState({
                viewOnly: props.viewOnly
            })
        }
    }

    getValue() {
        if (this.props.defaultValue) {
            return this.props.defaultValue
        }
        return FrwkUtil.store.getValueBylinkedState(this.props, this.props.valueLink)
    }

    render() {
        const height = this.props.rows * 14
        const value = this.getValue()
        if (this.state.viewOnly) {
            return (
                <div className="textArea">
                    <span style={{height: height + 'px'}}>{value}</span>
                </div>
            )
        }else{
            return (
                <textarea disabled={this.props.disabled}
                          ref="description"
                          onChange={this.onChange.bind(this)}
                          rows={this.props.rows}
                          value={value}
                          placeholder={this.props.placeholder} />
            )
        }
    }
}
