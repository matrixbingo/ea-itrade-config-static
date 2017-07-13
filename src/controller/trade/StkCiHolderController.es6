import {Control, Action} from 'ea-react-dm'
import StkCiHolderModel from '../../model/trade/StkCiHolderModel'
//import BaseControl from '../base/BaseControl'

@Control(StkCiHolderModel)
export default class StkCiHolderController extends Action {

    static loadTradeList(param, _this, callback) {
        return ::this.ajaxGet('/stkciholder/search', param, 'tradeList', _this, callback)
    }
}