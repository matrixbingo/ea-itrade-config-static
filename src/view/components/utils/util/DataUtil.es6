import MathUtil from './MathUtil'
//import _ from 'underscore'
import $ from 'jquery'

let DataUtil = DataUtil || {}

DataUtil.TypeUtils = {
    isInt: function (num) {
        var reg = /^[1-9]*[1-9][0-9]*$/
        return reg.test(num)
    },
    isFloat: function (num) {
        var reg = new RegExp('^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$') //正浮点数
        if (reg.test(num)) {
            return true
        }
        return false
    }
}

DataUtil.StringUtils = {
    trim: function (str) {
        if (str != null && typeof(str) != 'undefined' && str.length > 0) {
            return str.replace(/(^\s*)|(\s*$)/g, '')
        }
        return str
    },
    /**
     * 截取第一个点号之后的所有内容
     * 127.0.0.1 ==> 0.0.1
     */
    subStringByFirstPoint: function (str) {
        return str.match(MathUtil.REGS.subStringByFirstPoint, str)[1]
    },
    /**
     * 取字符串int部分
     */
    getInt: function (val) {
        if (val == '0' || val == 0) {
            return val
        }
        if (!DataUtil.StringUtils.isInt(val)) {
            val = DataUtil.StringUtils.getInt(val.substring(0, val.length - 1))
        }
        return val
    },
    /**
     * 取字符串float部分
     */
    getFloat: function (val) {
        if (val == '0.' || val == 0) {
            return val
        }
        if (!DataUtil.TypeUtils.isFloat(val)) {
            val = DataUtil.StringUtils.getFloat(val.substring(0, val.length - 1))
        }
        return val
    },
    getLength: function (val, length) {
        if (val && val.length > length) {
            return val.substring(0, length)
        }
        return val
    }
}


/**
 * 检测各种具体是对象类型
 */
DataUtil.is = {types: ['Array', 'Boolean', 'Date', 'Number', 'Object', 'RegExp', 'String', 'Window', 'HTMLDocument']}
for (var i = 0; i < DataUtil.is.types.length - 1; i++) {
    var c = DataUtil.is.types[i]
    DataUtil.is[c] = (function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == '[object ' + type + ']'
        }
    })(c)
}

DataUtil.validate = {
    zero: function (str) {
        if (DataUtil.StringUtils.trim(str + '') == '0') {
            return false
        }
        return true
    },
    empty: function (str) {
        if (DataUtil.StringUtils.trim(str + '') == '') {
            return false
        }
        return true
    },
    required: function (str) {
        if (str == null || str == undefined || DataUtil.StringUtils.trim(str + '') == '') {
            return false
        }
        return true
    },
    boolean: function (str) {
        return DataUtil.is.Boolean(str)
    },
    /**
     * 身份证校验
     * @param str
     * @returns {boolean}
     */
    lgalIdCard: function (str) {
        if (str == undefined) {
            return false
        }
        var idCardReg_15 = /^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$/
        //^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$
        var idCardReg_18 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

        return idCardReg_15.test($.trim(str.toLowerCase())) || idCardReg_18.test($.trim(str.toLowerCase()))
    },
    email: function (str) {
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        return reg.test(str)
    },
    /**
     * 手机号
     * @param str 仅校验11位
     * @returns {boolean}
     */
    mobile: function (str) {
        str = str + ''
        if (str && str.length == 11) {
            return true
        }
        return false
        /*var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
         return reg.test(str);*/
    }/*,
     maxLength: function (str) {
     str = trim(str + '');
     if(str && str.length )
     return reg.test(str);
     }*/
}

export default DataUtil
