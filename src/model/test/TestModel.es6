import {Model} from 'ea-react-dm'
//import Immutable from 'immutable'

@Model
export default class TestModel {
    static bookTypes = []
    static books = []
    static book = {}
    static updateIndex = -1

    static textArea = {
        value: 'textArea'
    }
    static inputPuls = {
        value: 'inputPlus'
    }
    static radioPlus = {
        selectId: 0
    }
    static citys = [
        {
            cityId: 1,
            city: '上海'
        },
        {
            cityId: 2,
            city: '北京'
        }
    ]

    /* static queryBookTypes(data, action){

     if(action.data){
     return data.merge(Immutable.fromJS(action.data) )
     }
     }
     static getBooks(data,action){
     return data.merge(Immutable.fromJS({books:action.data}) )
     }
     static updateBook(data,action){

     return data.setIn(['books',action.data.index],data.get('book') ).setIn(['updateIndex'],-1)
     }
     static delBook(data,action){

     return data.deleteIn(['books',action.data.index] )
     }*/
}