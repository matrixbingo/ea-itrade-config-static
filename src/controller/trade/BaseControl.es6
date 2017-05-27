import {Control} from 'ea-react-dm'
import BaseModel from '../../model/trade/BaseModel'
import {Action} from 'ea-react-dm'

@Control(BaseModel)
export default class BaseControl extends Action{
    static getBooks1(index,bookList){
        //根据此类生成的update方法
        window.console.log('updateBookModel', index, bookList)
        return this.update('books',bookList[index])
    }
}