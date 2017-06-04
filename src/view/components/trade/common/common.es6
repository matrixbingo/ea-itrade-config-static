let TradUtil = TradUtil || {}

TradUtil.getType = function (type) {
    switch (type) {
        case 1:
            return '小盘>9000'
        case 2 :
            return '中盘>9000'
        case 3 :
            return '小盘1000~9000'
        case 4 :
            return '中盘3000~9000'
    }
}

TradUtil.formatCode = function (code) {
    if (code.substring(0, 1) == 6) {
        return 'sh' + code
    }
    return 'sz' + code
}

TradUtil.getStockUrl = function (code) {
    //return 'http://stockhtm.finance.qq.com/sstock/ggcx/' + code + '.shtml'
    return 'http://finance.sina.com.cn/realstock/company/' + TradUtil.formatCode(code) + '/nc.shtml'
}

export default TradUtil
