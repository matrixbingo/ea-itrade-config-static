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
import {Tooltip} from 'antd'

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

    createChange(ele) {
        const change = ele.get('change')
        const type = ele.get('type')
        switch (type) {
            case 1:
                return <Tooltip placement="top" title={<span>减持</span>}>
                    <span style={{color: 'green', cursor: 'pointer'}}>{change}</span>
                </Tooltip>
            case 2 :
                return <Tooltip placement="top" title={<span>增持</span>}>
                    <span style={{color: 'red', cursor: 'pointer'}}>{change}</span>
                </Tooltip>
            case 3 :
                return '未变'
            case 4 :
                return <span style={{color: 'red'}}>新进</span>
        }
    }

    createChangeRdtio(ele) {
        const change = ele.get('changeRdtio')
        const type = ele.get('type')
        switch (type) {
            case 1:
                return <Tooltip placement="top" title={<span>减持</span>}>
                    <span style={{color: 'green', cursor: 'pointer'}}>{change}%</span>
                </Tooltip>
            case 2 :
                return <Tooltip placement="top" title={<span>增持</span>}>
                    <span style={{color: 'red', cursor: 'pointer'}}>{change}%</span>
                </Tooltip>
            case 3 :
                return '未变'
            case 4 :
                return <span style={{color: 'red'}}>新进</span>
        }
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
                        url = TradUtil.getStockUrl(ele)
                        if (ele.get('range') == 0) {
                            colColor = {}
                        }
                        rowNo++
                        //window.console.log('ele.toJS().code ----->', ele.toJS().code)
                        return <div key={page}>
                            <Row className={rowColor}>
                                <Col style={{width: '5%'}} className="text-align-center">
                                    <Tooltip placement="top" title={<span>历史成交单</span>}>
                                        <Msg value={page++} ele={ele.toJS()} {..._this.props} />
                                    </Tooltip>
                                </Col>
                                <Col style={{width: '5%'}} className="text-align-center col-lr">
                                    <Tooltip placement="top" title={<span>新浪财经</span>}>
                                        <a href={url} target="_blank"
                                           style={{fontSize: TradUtil.fontSize(ele.get('name')) + 'px'}}>{ele.get('sname')}</a>
                                    </Tooltip>
                                </Col>
                                <Col style={{width: '36%'}} className="text-align-center">
                                    <Tooltip placement="top" title={<span>{ele.get('sname')}-十大流通股东</span>}>
                                        <a href={TradUtil.getStockUrl(ele, 'stk_ciholder.qq')} target="_blank"
                                           style={{fontSize: TradUtil.fontSize(ele.get('name')) + 'px'}}>{ele.get('name')}</a>
                                    </Tooltip>
                                </Col>
                                <Col sm={1} className="text-align-center" style={colColor}>
                                    <Tooltip placement="top" title={<span>东财f10</span>}>
                                        <a href={TradUtil.getStockUrl(ele, 'f10.eastmoney')}
                                           target="_blank">{DataUtil.Date.formatTime(ele.get('yearQuarter'))}</a>
                                    </Tooltip>
                                </Col>
                                <Col style={{width: '11%'}} className="text-align-center">
                                    {ele.get('nums')}
                                </Col>
                                <Col sm={1} className="text-align-center">
                                    <Tooltip placement="top" title={<span>同花顺f10</span>}>
                                        <a href={TradUtil.getStockUrl(ele, 'f10.10jqka')}
                                           target="_blank">{TradUtil.getNatureType(ele.get('type'))}</a>
                                    </Tooltip>
                                </Col>
                                <Col sm={1} className="text-align-center">
                                    <Tooltip placement="top" title={<span>分时与K线</span>}>
                                        <span style={{cursor: 'pointer'}}
                                              onClick={this.toggle.bind(this, ele.toJS().code, page)}>
                                            {ele.get('ratio')}%
                                        </span>
                                    </Tooltip>
                                </Col>
                                <Col style={{width: '10%'}} className="text-align-center col-lr">
                                    {this.createChange(ele)}
                                </Col>
                                <Col style={{width: '8%'}} className="text-align-center">
                                    {this.createChangeRdtio(ele)}
                                </Col>
                            </Row>
                            <RowImgList code={ele.toJS().code} page={page}
                                        curCode={this.state.code} curPage={this.state.page}
                                        shouldUpdate={this.state.shouldUpdate}/>
                        </div>
                    })
                }
            </div>
        )
    }
}