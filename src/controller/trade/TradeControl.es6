import {Control,Action} from 'ea-react-dm-v14'
import TradeModel from '../../model/trade/TradeModel'
//import BaseControl from '../base/BaseControl'

@Control(TradeModel)
export default class TradeControl extends Action {

    static loadTradeList(param, _this, callback) {
        return ::this.ajaxGet('/trade/search', param, 'tradeList', _this, callback)
    }
}