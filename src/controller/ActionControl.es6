//import devLog from 'dev-pretty-log'
import {MathUtil} from '../utils/utils'

export default class ActionControl {
    static setValueByReducers(valueLink, val){
        let arr = valueLink.split('.')
        arr.splice(0, 1)
        valueLink = MathUtil.match(MathUtil.REGS.subStringByFirstPoint, valueLink)
        window.console.log('valueLink', valueLink.substring(1, valueLink.length-1))
        return this.update(valueLink.substring(1, valueLink.length-1), val)
    }
}