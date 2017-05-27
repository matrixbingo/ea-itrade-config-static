/**
 * Created by liang.wang on 16/9/29.
 */
import React, {Component, PropTypes} from 'react'
import {Input} from 'eagle-ui'
import {findDOMNode} from 'react-dom'
import {FrwkUtil, DataUtil} from '../util/Index'
import './InputPlus.less'

export default class InputPlus extends Component {
    static propTypes = {
        /**
         * 是否只读
         */
        viewOnly: PropTypes.bool,
        /**
         * 是否disabled
         */
        disabled: PropTypes.bool,
        /**
         * value链接
         */
        valueLink: PropTypes.string.isRequired,
        /**
         * 初始化数值
         */
        defaultValue: PropTypes.string.isRequired
    }
    /**
     * @type {{viewOnly: boolean, span: boolean, disabled: boolean, className: string, placeholder: string, valueLink: string, defaultValue: string, validRules: {isInt: boolean, isFloat: boolean, maxLength: null}, style: {}, onChangeCallback: InputPlus.defaultProps.onChangeCallback, onBlurCallback: InputPlus.defaultProps.onBlurCallback}}
     * 优先级 优先级 viewOnly（span） ---> disabled
     */
    static defaultProps = {
        viewOnly: false,
        span: false,
        disabled: false,
        className: 'f14 font',
        placeholder: '',
        valueLink: '',
        defaultValue: '',
        validRules: {
            isInt: false,
            isFloat: false,
            maxLength: null
        },
        style: {},
        onChangeCallback: function () {
        },
        onBlurCallback: function () {
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

    /*
     setValueByReducers(key, value) {
     if (key) {
     this.manualChange(key, Immutable.fromJS(value))
     } else {
     window.console.error('setValueByReducers error', key, value)
     }
     }
     */
    /*
     getValueByReducers(key) {
     if (key) {
     const {config} = this.props
     return getValueBylinkedState(config, key)
     } else {
     window.console.error('getValueByReducers error', key, value)
     }
     }*/

    componentWillReceiveProps(props) {
        if (props.disabled != this.state.disabled || props.viewOnly != this.state.viewOnly) {
            this.setState({
                disabled: props.disabled,
                viewOnly: props.viewOnly
            })
        }
    }

    change(val){
        val = this.validData(val)
        if (this.state.content != val) {
            this.setState({
                content: val
            })
            if (this.props.setValueByReducers && this.props.valueLink) {
                this.props.setValueByReducers(this.props.valueLink, val)
            } else {
                window.console.warn('InputPlus miss setValueByReducers')
            }
        }
    }
    onChangeHandler(e) {
        let val = DataUtil.StringUtils.trim(e.target.value) || ''
        this.change(val)
        this.props.onChangeCallback && this.props.onChangeCallback(this, val)
    }
    onblurHandler(e) {
        let val = DataUtil.StringUtils.trim(e.target.value) || ''
        this.change(val)
        this.props.onBlurCallback && this.props.onBlurCallback(this, val)
    }

    validData(val) {
        if (this.props.validRules.maxLength) {
            val = DataUtil.StringUtils.getLength(val, this.props.validRules.maxLength)
        }
        if (this.props.validRules.isInt) {
            val = DataUtil.StringUtils.getInt(val)
        }
        if (this.props.validRules.isFloat) {
            val = DataUtil.StringUtils.getFloat(val)
        }
        return val
    }

    /*    defaultValue(val) {
     if (this.props.defaultValue && val == '') {
     val = this.props.defaultValue
     }
     return val
     }

     getDefaultValue() {
     if (this.state.defaultValue) {
     return this.state.defaultValue
     }
     let val = this.getValueByReducers(this.props.valueLink);
     if (this.state.disabled || this.state.viewOnly) {
     if (val) {
     return val
     }
     } else {
     return val
     }
     return this.props.placeholder
     }*/

    setDisabled(ref, is) {
        this.input = ref
        if (this.input) {
            const input = findDOMNode(this.input).querySelector('input')
            input.disabled = is
        }
    }

    render() {
        const _this = this
        //let val = this.getDefaultValue()
        if (this.state.viewOnly) {
            if (this.state.span) {
                return (
                    <div className="inputPlus">
                        <span>{this.state.content}</span>
                    </div>
                )
            }
            return (
                <div className="inputPlus">
                    <Input type="text" value={this.state.content}
                           ref={(ref) => {
                               _this.setDisabled(ref, true)
                           }}/>
                </div>
            )
        } else if (this.state.disabled) {
            return (
                <Input disabled={true} style={this.props.style} className={this.props.className} type="text" value=''
                       placeholder={this.state.content}
                       ref={(ref) => {
                           _this.setDisabled(ref, true)
                       }}/>
            )
        } else {
            return (
                <Input style={this.props.style}
                       className={this.props.className} type="text" value={this.state.content}
                       ref={(ref) => {
                           _this.setDisabled(ref, false)
                       }}
                       placeholder={this.props.placeholder}
                       onChange={::this.onChangeHandler}
                       onBlur={::this.onblurHandler}/>
            )
        }
    }
}
