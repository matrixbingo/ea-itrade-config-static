import {Control} from 'ea-react-dm'
import TradeModel from '../../model/trade/TradeModel'
import BaseControl from './BaseControl'

@Control(TradeModel)
export default class TradeControl extends BaseControl {

    static loadTradeList() {
        return this.ajaxGet('/trade/search', {}, 'tradeList')
    }
}