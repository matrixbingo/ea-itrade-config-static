/**
 * Created by liang.wang on 16/5/10.
 */
import React from 'react'
import Component from '../../utils/base/ComponentAlert'
import {Row, Col, Panel, PanelHeader, PanelContent, Paging, Select} from 'eagle-ui'
import {Button} from 'antd'
import TradeRow from './TradeRow'
import {View} from 'ea-react-dm'
import './TradeRow.less'
import {CalendarPanelPlus, InputPlus} from '../../utils/index'
import TradeControl from '../../../../controller/trade/TradeControl'
import {DropDownSuggestion} from '../../utils/index'
import {Icon} from 'antd'

@View(TradeControl)
export default class TradeList extends Component {

    constructor(props, context) {
        super(props, context)
        this.pageSize = 10
        this.pageNo = 1
        this.sortType = true
        this.state = {
            expand: 'up',
            refreshRow: false,
            toastType: 'success',
            toastMsg: '',
            iconLoading: false
        }

        this.searchParam = {
            page: 1,
            pageSize: 10
        }

        this.desc = true

        this.props.loadTradeList(this.searchParam, this)
    }

    loadPageCallback(ps) {
        let search = this.getValueByReducers('TradeModel.search').toJS()
        search.bin = this.formatTime(search.bin)
        search.end = this.formatTime(search.end)
        search.page = 1
        search.pageSize = parseInt(ps)
        this.props.loadTradeList(search, this)
        this.setValueByReducers('TradeModel.search', search)
    }

    pageCallback(page) {
        let search = this.getValueByReducers('TradeModel.search').toJS()
        search.bin = this.formatTime(search.bin)
        search.end = this.formatTime(search.end)
        search.page = page
        this.props.loadTradeList(search, this)
        this.setValueByReducers('TradeModel.search', search)
    }

    chooseApproveStatus(value, key) {
        this.setState({
            approveStatus: key
        })
        this.setValueByReducers('TradeModel.search.type', value)
        //console.log('value,key,type', value, key, type)
    }

    formatTime(time) {
        time = time + ''
        if (time == '') {
            return 0
        }
        time = time.replace(/-/g, '')
        return parseInt(time)
    }

    searchList() {
        const _this = this
        this.setState({iconLoading: !this.state.iconLoading}, () => {
            let search = _this.getValueByReducers('TradeModel.search').toJS()
            const stock = _this.getValueByReducers('TradeModel.stock').toJS()
            search.bin = _this.formatTime(search.bin)
            search.end = _this.formatTime(search.end)
            search.page = 1
            search.code = stock.code
            _this.props.loadTradeList(search, _this, (_this) => {
                _this.setState({iconLoading: !_this.state.iconLoading})
            })
            _this.setValueByReducers('TradeModel.search', search)
            window.console.log('查询列表', search)
        })
    }

    sort(type) {
        this.tradeRow.clearCode()
        this.desc = !this.desc
        let search = this.getValueByReducers('TradeModel.search').toJS()
        search.bin = this.formatTime(search.bin)
        search.end = this.formatTime(search.end)
        search.sort = type
        search.sortType = this.desc
        window.console.log('查询列表', search)
        this.props.loadTradeList(search, this)
        this.setValueByReducers('TradeModel.search', search)
    }

    toggle = () => {
        const {expand} = this.state
        this.setState({expand: !expand})
    }

    render() {
        const _this = this
        let tradeList = this.getValueByReducers('TradeModel.tradeList')
        const search = this.getValueByReducers('TradeModel.search').toJS()
        const list = tradeList.get('list')
        let totals
        if (tradeList) {
            tradeList = tradeList.toJS()
            totals = tradeList.totalCount
        }
        //console.log('search.page: ' + search.page + ' search.pageSize: ' + search.pageSize + ' totals: ' + totals)
        return (
            <div className="tradeList outerPanel marginTopSpace">
                <Panel className="marginTopSpace">
                    <Row>
                        <Col sm={1} className="col-lr">
                            <InputPlus {...this.props} valueLink='TradeModel.search.nums'
                                       placeholder='次数'/>
                        </Col>
                        <Col sm={2} className="col-lr">
                            <Select defaultChecked={this.state.approveStatus}
                                    getValueCallback={::this.chooseApproveStatus} placeholder="类型">
                                <option value={0} key={0}>全部</option>
                                <option value={1} key={1}>小盘>9000</option>
                                <option value={2} key={2}>中盘>9000</option>
                                <option value={3} key={3}>小盘1000~9000</option>
                                <option value={4} key={4}>中盘3000~9000</option>
                            </Select>
                        </Col>
                        <Col sm={2} className="col-lr">
                            <CalendarPanelPlus startDate="1900-01-01"
                                               valueLink='TradeModel.search.bin'
                                               {...this.props} placeholder="开始时间"/>
                        </Col>
                        <Col sm={2} className="col-lr">
                            <CalendarPanelPlus startDate="1900-01-01"
                                               valueLink='TradeModel.search.end'
                                               {...this.props} placeholder="结束时间"/>
                        </Col>
                        <Col className="col-lr" style={{width: '22%'}} end>
                            <div style={{fontSize: '12px', verticalAlign: 'top'}}>
                                <DropDownSuggestion url={'/stock/search'} {...this.props}
                                                    ref={e => _this.dropDownSuggestionPlus = e}
                                                    format={{leng: 40, title: {'code': ' - ', 'name': ''}}}
                                                    valueLink='TradeModel.stock'
                                                    placeholder="请输入关键字"/>
                            </div>
                        </Col>
                        <Col sm={2} className="col-lr" style={{width: '14%'}}>
                            <Button style={{width: '100%', height: '42px'}} type="primary" icon="search" size='large'
                                    loading={this.state.iconLoading}
                                    onClick={::this.searchList}>
                                查询
                            </Button>
                        </Col>
                        <Col style={{width: '5%', padding: '15px'}}>
                            <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                                <Icon style={{fontSize: '17px'}} type={this.state.expand ? 'up' : 'down'}/>
                            </a>
                        </Col>
                    </Row>
                    <div style={{display: this.state.expand ? 'none' : 'block'}}>
                        <Row>
                            <Col sm={2} className="col-lr">
                                <InputPlus {...this.props} valueLink='TradeModel.search.rabin'
                                           placeholder='涨幅'/>
                            </Col>
                            <Col sm={2} className="col-lr">
                                <InputPlus {...this.props} valueLink='TradeModel.search.raend'
                                           placeholder='涨幅'/>
                            </Col>
                            <Col sm={8}/>
                        </Row>
                    </div>
                    <PanelHeader className="marginSpacePanelHeader">
                        <Row className="panelHeader-background">
                            <Col sm={1} className="text-align-center">
                                序号
                            </Col>
                            <Col style={{width: '14%'}} className="text-align-center">
                                类型
                            </Col>
                            <Col style={{width: '11%'}} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'time')}>时间</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'code')}>代码</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                名称
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'price')}>价格</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'range')}>涨幅</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'speed')}>涨速</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'stock')}>流通股本</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'buy')}>买入</span>
                            </Col>
                            <Col sm={1} className="text-align-center">
                                <span className="cursor" onClick={this.sort.bind(_this, 'buy')}>卖出</span>
                            </Col>
                        </Row>
                        {list && <TradeRow {...this.props} list={list} pageNo={search.page} pageSize={search.pageSize}
                                           ref={(e) => this.tradeRow = e}/>}
                    </PanelHeader>
                    <PanelContent>
                        <Row className="paging-margin">
                            <Col sm={1}/>
                            <Col sm={11}>
                                <Paging showItemsNumber={true} loadPageCallback={::this.loadPageCallback}
                                        currentPage={search.page} pageSize={search.pageSize}
                                        pageCallback={::this.pageCallback} total={totals && totals > 0 ? totals : 0}/>
                            </Col>
                        </Row>
                    </PanelContent>
                </Panel>
            </div>
        )
    }
}