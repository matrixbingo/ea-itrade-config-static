import {Model} from 'ea-react-dm'

@Model
export default class BaseModel {
    //此字段必须要有
    static __name = 'base'
    static version = '1.0.0'
    static textArea = {
        value:'22222222'
    }
    static books = ''
}