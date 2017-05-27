/**
 * Created by liang.wang on 16/10/29.
 */
import React, {Component, PropTypes} from 'react'
import {RadioGroup, Input} from 'eagle-ui'
import {findDOMNode} from 'react-dom'
import {FrwkUtil, DataUtil} from '../util/Index'
import './RadioPlus.less'
import _ from 'underscore'
//import classNames from 'classnames'

export default class RadioPlus extends Component {
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
         * 初始化数据，可以更新
         */
        list: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    }
    /**
     * @type {{viewOnly: boolean, disabled: boolean, param: {id: string, name: string}, valueLink: string, defaultId: null, defaultName: null, getValueCallback: RadioPlus.defaultProps.getValueCallback}}
     * 优先级 viewOnly ---> disabled
     *
     */
    static defaultProps = {
        viewOnly: false,
        disabled: false,
        list: null,
        param: {id: 'id', name: 'name'},
        valueLink: '',
        defaultId: null,
        defaultName: null,
        getValueCallback: function () {
        }
    }

    constructor(props, context) {
        super(props, context)
        FrwkUtil.ComponentUtils.transform(this)
        this.state = {
            defaultId: FrwkUtil.ComponentUtils.getDefaultId(this),
            disabled: this.props.disabled,
            viewOnly: this.props.viewOnly
        }
    }

    componentWillReceiveProps(props) {
        FrwkUtil.ComponentUtils.transform(this)
        if (props.disabled != this.state.disabled || props.viewOnly != this.state.viewOnly) {
            this.setState({
                viewOnly: props.viewOnly,
                disabled: props.disabled
            })
        }
    }

    setValueByReducers(key, value) {
        if (key && value) {
            if (value == 'true') {
                value = true
            }
            if (value == 'false') {
                value = false
            }
            this.props.setValueByReducers(this.props.valueLink, value)
        } else {
            window.console.error('setValueByReducers error', key, value)
        }
    }

    getValueCallback(e) {
        if (this.state.disabled) {
            this.setState({
                defaultId: this.defaultId
            })
            return
        }
        this.setState({
            defaultId: e
        })
        if (this.props.valueLink) {
            this.setValueByReducers(this.props.valueLink, e)
        }
        this.props.getValueCallback && this.props.getValueCallback(e)
    }

    createRadios() {
        const list = this.list
        let radios = []
        if (DataUtil.is.Object(list)) {
            _.each(list, function (name, id) {
                radios.push(<Input type="radio" label={name} value={id} key={id} />)
            })
        }
        return radios
    }

    setDisabled(ref, is) {
        this.input = ref
        if (this.input) {
            const input = findDOMNode(this.input).querySelector('input')
            input.disabled = is
        }
    }

    getViewOnlyValue() {
        if (this.defaultId) {
            return this.list[this.defaultId]
        }
        return this.props.defaultName
    }

    render() {
        const _this = this
        let style = {}
        style = _.extend(style, this.props.style)
        if (this.state.viewOnly) {
            const val = this.getViewOnlyValue()
            return (
                <div className="inputPlus">
                    <Input type="text" value={val}
                           ref={(ref) => {
                               _this.setDisabled(ref, true)
                           }}/>
                </div>
            )
        }
        if (this.state.disabled) {
            return <RadioGroup className="radioPlus" style={style} defaultChecked={this.state.defaultId}
                               getValueCallback={(e) => {
                                   _this.getValueCallback(e)
                               }}>
                {this.createRadios()}
            </RadioGroup>
        } else {
            return <RadioGroup style={this.props.style} defaultChecked={this.state.defaultId}
                               getValueCallback={(e) => {
                                   _this.getValueCallback(e)
                               }}>
                {this.createRadios()}
            </RadioGroup>
        }
    }
}