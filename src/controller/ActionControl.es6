//import devLog from 'dev-pretty-log'
import {DataUtil} from '../utils/utils'

export default class ActionControl {
    static setValueByReducers(valueLink, val){
        valueLink = DataUtil.StringUtils.subStringByFirstPoint(valueLink)
        return this.update(valueLink, val)
    }
    static getValueByReducers(valueLink){
        this.__modelName
        return this.find(valueLink)
    }
}