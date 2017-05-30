import {fetch} from 'ea-react-dm'
import {Action} from 'ea-react-dm'
import FrwkUtil from '../../view/components/utils/util/FrwkUtil'

export default class BaseControl extends Action {

    static ajaxGet(url, param, valueLink, _this, callBack) {
        return (dispatch) => {
            fetch(url + FrwkUtil.UrlUtils.initParams(param), {
                method: 'GET',
                timeout: 60000
            }).then((data) => {
                _this && callBack && callBack(_this, data)
                dispatch(this.update(valueLink, data.msg))
            }, (error) => {
                window.console.error('ajaxGet : ' + url + ' error!!', error)
            })
        }
    }

    static getBooks1(index, bookList) {
        //根据此类生成的update方法
        window.console.log('updateBookModel', index, bookList)
        return this.update('books', bookList[index])
    }
}