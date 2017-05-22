import React, {Component, /*PropTypes*/} from 'react'
import './TextArea.less'
import classNames from 'classnames'

export default class TextArea extends Component {
    
    static defaultProps = {
        cols: 30,
        rows: 10,
        maxLength: 200,
        placeholder: '请输入内容',
        content: '',
        onChangeCallback: function () {}
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
            content: this.props.content
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            content: nextProps.content
        })
    }
    getContent(){
        return this.state.content || ''
    }
    onChangeHandler(evt) {
        // 获取
        let val = (evt.target.value||'')
        if(val.length > this.props.maxLength ) {
            val = val.substr(0, this.props.maxLength)
        }
        this.setState({
            content: val
        })
        this.props.onChangeCallback && this.props.onChangeCallback.call(evt, val)
    }
    render() {
        const {maxLength, cols, rows, placeholder} = this.props
        const remain = maxLength - this.state.content.length
        const remainColor = this.state.content.length ? '' : 'default'
        const className = classNames((this.props.className || ''), 'q-text-ctn')
        return (
            <div className="q-text-wrap">
                <textarea {...this.props}
                          className={className}
                          onChange={this.onChangeHandler.bind(this)}
                          rows={rows}
                          cols={cols}
                          placeholder={placeholder}
                          value={this.state.content} />
                <p className="q-text-remain">
                    <span className={'num ' + remainColor}><i>{remain}</i>/{maxLength}</span>
                </p>
            </div>
        )
    }
}