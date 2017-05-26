import React, {Component, /*PropTypes*/} from 'react'
import {FrwkUtil} from '../util/util'
import './TextArea.less'
import classNames from 'classnames'

export default class TextArea extends Component {

    static defaultProps = {
        disabled: false,
        viewOnly: false,
        valueLink: '',
        defaultValue: '',
        cols: 30,
        rows: 10,
        maxLength: 200,
        placeholder: '请输入内容',
        onChangeCallback: function () {
        }
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            disabled: this.props.disabled,
            viewOnly: this.props.viewOnly,
            content: this.props.defaultValue || this.getContent()
        }
    }

    getContent() {
        return FrwkUtil.store.getValueBylinkedState(this.props, this.props.valueLink) || ''
    }

    componentWillReceiveProps(nextProps) {
        let flag = false
        if (nextProps.disabled != this.state.disabled || nextProps.viewOnly != this.state.viewOnly || nextProps.content != this.state.content) {
            flag = true
        }
        if (flag) {
            this.setState({
                disabled: nextProps.disabled,
                viewOnly: nextProps.viewOnly
            })
        }
    }

    onChangeHandler(evt) {
        // 获取
        let val = (evt.target.value || '')
        if (val.length > this.props.maxLength) {
            val = val.substr(0, this.props.maxLength)
        }
        if (this.state.content != val) {
            this.setState({
                content: val
            })
            if (this.props.setValueByReducers && this.props.valueLink) {
                this.props.setValueByReducers(this.props.valueLink, val)
            } else {
                window.console.warn('TextArea miss setValueByReducers')
            }
        }
        this.props.onChangeCallback && this.props.onChangeCallback.call(evt, val, this)
    }

    render() {
        const {maxLength, cols, rows, placeholder} = this.props
        const remain = maxLength - this.state.content.length
        const remainColor = this.state.content.length ? '' : 'default'
        const className = classNames((this.props.className || ''), 'q-text-ctn')
        if (this.state.viewOnly) {
            const height = this.props.rows * 14
            return (
                <div className="textArea">
                    <span style={{height: height + 'px'}}>{this.state.content}</span>
                </div>
            )
        } else {
            return (
                <div className="q-text-wrap">
                <textarea disabled={this.state.disabled}
                          ref="description"
                          className={className}
                          onChange={this.onChangeHandler.bind(this)}
                          rows={rows}
                          cols={cols}
                          placeholder={placeholder}
                          value={this.state.content}/>
                    <p className="q-text-remain">
                        <span className={'num ' + remainColor}><i>{remain}</i>/{maxLength}</span>
                    </p>
                </div>
            )
        }
    }
}