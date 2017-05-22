import {Model} from 'gfs-react-dm'

@Model
export default class BaseModel {
    //此字段必须要有
    static __name = 'base'
    static version = '1.0.0'
    static textArea = {
        value:''
    }
    static books = ''
}