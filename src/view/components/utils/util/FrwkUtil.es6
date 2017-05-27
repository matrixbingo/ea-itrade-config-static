import DataUtil from './DataUtil'
let FrwkUtil = FrwkUtil || {}
import _ from 'underscore'

FrwkUtil.store = {
    getValueBylinkedState: function (props, valueLink) {
        let keys = valueLink.split('.')
        const modelName = keys.shift()
        const model = props[modelName.toLowerCase()]
        if (!model || !keys) {
            return ''
        }
        let val = '', rs = []
        try {
            if (keys.length > 1) {
                for (var i in keys) {
                    if (i == 0) {
                        rs = model.get(keys[i])
                    } else if (i > 0) {
                        rs = rs.get(keys[i])
                    }
                }
                val = rs
            } else {
                val = model.get(keys[0])
            }
        } catch (e) {
            window.console && window.console.error('FrwkUtil.store.getValueBylinkedState', keys.join(), rs, e)
        }
        return val
    }
}

FrwkUtil.UrlUtils = {
    /**
     * 获取get请求所有参数
     * 例http://a.html?b=1&c=2
     * @returns {b:1,c:2}
     */
    getUrls: function () {
        var aQuery = window.location.href.split('?')
        var aGET = {}
        if (aQuery.length > 1) {
            var aBuf = aQuery[1].split('&')
            for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                var aTmp = aBuf[i].split('=')
                aGET[aTmp[0]] = aTmp[1]
            }
        }
        return aGET
    },
    /**
     * 组合请求参数
     * @param {b:1,c:2}
     * @returns ?b=1&c=2
     */
    initParams: function (data) {
        if (!data) {
            return ''
        }
        var arr = []
        for (var item in data) {
            arr.push('&' + item + '=')
            arr.push(data[item])
        }
        if (arr.length == 0) {
            return ''
        }
        var str = arr.join('')
        return '?' + str.substring(1, str.length)
    }
}

FrwkUtil.ComponentUtils = {
    /**
     * 初始化 defaultId
     * @param _this
     */
    getDefaultId: function (_this) {
        let {defaultId} = _this.props
        if ((defaultId != null && defaultId != '') || DataUtil.validate.boolean(defaultId)) {
            defaultId = defaultId + ''
        } else {
            defaultId = FrwkUtil.store.getValueBylinkedState(_this.props, _this.props.valueLink) + ''
        }
        return defaultId
    },
    /**
     * 初始化 数组或对象
     * [{name:'tom', id:1}, {name:'jerry', id:2}] ==> {'1':'tom','2':'jerry'}
     * {1:'tom',2:'jerry'} ==> {'1':'tom','2':'jerry'}
     * @param _this
     */
    transform: function (_this) {
        let {list, param} = _this.props, objs = {}
        if(!list){
            window.console.error(_this , 'list is null!!!')
            return
        }
        try {
            if (DataUtil.is.Array(list)) {
                for (let i in list) {
                    const item = list[i]
                    const id = item[param.id] + ''
                    objs[id] = item[param.name]
                }
            }else if (DataUtil.is.Object(list)) {
                _.each(list, function (name, id) {
                    objs[id + ''] = name
                })
            }
            _this.list = objs
        } catch (e) {
            window.console.error(_this + '.initList', e, list)
        }
    }
}

export default FrwkUtil