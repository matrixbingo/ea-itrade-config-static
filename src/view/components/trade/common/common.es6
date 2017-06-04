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

TradUtil.getStockUrl = function (code, type) {
    if(!type){
        return 'http://finance.sina.com.cn/realstock/company/' + TradUtil.formatCode(code) + '/nc.shtml'
    }
    switch (type){
        //qq财经
        case 'stockhtm.qq' : return 'http://stockhtm.finance.qq.com/sstock/ggcx/' + code + '.shtml'
        //东财f10
        case 'f10.eastmoney': return 'http://f10.eastmoney.com/f10_v2/ShareholderResearch.aspx?type=soft&code=' + TradUtil.formatCode(code) + '&timetip=' + Date.parse(new Date())
        //同花顺f10
        case 'f10.10jqka' : return 'http://basic.10jqka.com.cn/new/' + code + '/holder.html'
    }
}

export default TradUtil
