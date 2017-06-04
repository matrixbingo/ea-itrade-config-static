/**
 * Created by liang.wang on 16/5/10.
 */
import React, {Component} from 'react'
import {Row, Col} from 'eagle-ui'
import './TradeRow.less'
import TradUtil from '../common/common'
import {DataUtil} from '../../utils/util/Index'
import Msg from '../../utils/chart/TradeHistoryChart'
import RowImgList from './RowImgList/RowImgList'


export default class TradeRow extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            shouldUpdate: false,
            code: 0,
            page: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const bool = !DataUtil.ObjUtils.isEqual(nextProps.list.toJS(), this.props.list.toJS())
        if (bool) {
            this.setState({
                shouldUpdate: true
            })
        } else {
            this.setState({
                shouldUpdate: false
            })
        }
    }

    shouldComponentUpdate(nextProps, state) {
        return state.shouldUpdate || !DataUtil.ObjUtils.isEqual(nextProps.list.toJS(), this.props.list.toJS())
    }

    toggle(code, page) {
        this.setState({
            shouldUpdate: true,
            code: code,
            page: page
        })
    }

    clearCode() {
        this.setState({
            code: 0,
            page: 0
        })
    }

    render() {
        const _this = this
        const list = this.props.list
        const pageNo = this.props.pageNo
        const pageSize = this.props.pageSize
        let rowNo = 1
        let page = (pageNo - 1) * pageSize + 1
        let url
        return (
            <div className="tradeRow">
                {
                    list && list.map((ele) => {
                        let rowColor = rowNo % 2 == 0 ? 'row-color-odd' : 'row-color-eve'
                        let colColor = ele.get('range') > 0 ? {color: 'red'} : {color: 'green'}
                        url = TradUtil.getStockUrl(ele.get('code'))
                        if (ele.get('range') == 0) {
                            colColor = {}
                        }
                        rowNo++
                        //window.console.log('ele.toJS().code ----->', ele.toJS().code)
                        return <div key={page}>
                            <Row className={rowColor}>
                                <Col sm={1} className="text-align-center">
                                    <Msg value={page++} ele={ele.toJS()} {..._this.props} />
                                </Col>
                                <Col style={{width: '14%'}} className="text-align-center">
                                    {TradUtil.getType(ele.get('type'))}
                                </Col>
                                <Col style={{width: '11%'}} className="text-align-center">
                                    {DataUtil.Date.formatTime(ele.get('time'))}
                                </Col>
                                <Col sm={1} className="text-align-center">
                                    <span style={{cursor: 'pointer'}}
                                          onClick={this.toggle.bind(this, ele.toJS().code, page)}>
                                        {ele.get('code')}
                                    </span>
                                </Col>
                                <Col sm={1} className="text-align-center">
                                    <a href={url} target="_blank">{ele.get('name')}</a>
                                </Col>
                                <Col sm={1} className="text-align-center" style={colColor}>
                                    {ele.get('price')}
                                </Col>
                                <Col sm={1} className="text-align-center" style={colColor}>
                                    {ele.get('range')}
                                </Col>
                                <Col sm={1} className="text-align-center" style={colColor}>
                                    {ele.get('speed')}
                                </Col>
                                <Col sm={1} className="text-align-center">
                                    {ele.get('stock')}
                                </Col>
                                <Col sm={1} className="text-align-center"
                                     style={ele.get('buy') != 0 ? {color: 'red'} : {}}>
                                    {ele.get('buy')}
                                </Col>
                                <Col sm={1} className="text-align-center" style={{color: 'green'}}>
                                    {ele.get('sel')}
                                </Col>
                            </Row>
                            <RowImgList code={ele.toJS().code} page={page}
                                        curCode={this.state.code} curPage={this.state.page}
                                        shouldUpdate={this.state.shouldUpdate} />
                        </div>
                    })
                }
            </div>
        )
    }
}