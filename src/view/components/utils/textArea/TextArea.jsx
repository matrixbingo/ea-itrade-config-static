/**
 * Created by liang.wang on 16/9/29.
 */
import React, {Component, PropTypes} from 'react'
import {FrwkUtil} from '../../../../utils/utils.es6'
import './TextArea.less'
import devLog from 'dev-pretty-log'

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

    change(e) {
        devLog.log('e.target.value', e.target.value)
        this.props.setValueByReducers(this.props.valueLink, e.target.value);
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
        let arr = this.props.valueLink.split('.');
        const modelName = arr.shift()   ;
        const model = this.props[modelName.toLowerCase()]
        return FrwkUtil.getValueBylinkedState(model, arr)

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
        }
        return (
            <textarea disabled={this.props.disabled}
                      ref="description"
                      onChange={this.change.bind(this)}
                      rows={this.props.rows}
                      value={value}
                      placeholder={this.props.placeholder}></textarea>
        )
    }
}
