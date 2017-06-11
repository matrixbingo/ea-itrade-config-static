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

TradUtil.getNatureType = function (type) {
    switch (type) {
        case 1:
            return '自然人股'
        case 2 :
            return '国有股'
        case 3 :
            return '境内法人股'
        case 4 :
            return '境外法人股'
    }
}

TradUtil.getStkCiHolderType = function (type) {
    switch (type) {
        case 1:
            return '减持'
        case 2 :
            return '增持'
        case 3 :
            return '未变'
        case 4 :
            return '新进'
    }
}

TradUtil.fontSize = function (str) {
    if (str.length <= 20) {
        return 15
    }
    if (str.length > 20 && str.length <= 25) {
        return 14.5
    }
    if (str.length > 25 && str.length <= 30) {
        return 14
    }
    if (str.length > 30 && str.length <= 35) {
        return 13.5
    }
    if (str.length > 35 && str.length <= 40) {
        return 13
    }
    if (str.length > 45 && str.length <= 50) {
        return 12.5
    }
    if (str.length > 50 && str.length <= 55) {
        return 12
    }
    if (str.length > 55 && str.length <= 60) {
        return 11.5
    }
    if (str.length > 60 && str.length <= 65) {
        return 11
    }
}

TradUtil.formatCode = function (code) {
    if (code.substring(0, 1) == 6) {
        return 'sh' + code
    }
    return 'sz' + code
}

TradUtil.getStockUrl = function (ele, type, param) {
    const code = ele.code || ele.get('code')
    if (!type) {
        return 'http://finance.sina.com.cn/realstock/company/' + TradUtil.formatCode(code) + '/nc.shtml'
    }
    switch (type) {
        //qq财经
        case 'stockhtm.qq' :
            return 'http://stockhtm.finance.qq.com/sstock/ggcx/' + code + '.shtml'
        //东财f10
        case 'f10.eastmoney':
            return 'http://f10.eastmoney.com/f10_v2/ShareholderResearch.aspx?type=soft&code=' + TradUtil.formatCode(code) + '&timetip=' + Date.parse(new Date())
        //同花顺f10
        case 'f10.10jqka' :
            return 'http://basic.10jqka.com.cn/new/' + code + '/holder.html'
        //qq财经十大股东明细
        case 'stk_ciholder.qq' :
            return 'http://stock.finance.qq.com/corp1/stk_ciholder.php?zqdm=' + code
        //新浪分价表
        case 'sina.pricehis':
            return 'http://market.finance.sina.com.cn/pricehis.php?symbol=' + TradUtil.formatCode(code) + '&startdate=' + param.bintime + '&enddate=' + param.endtime //2016-08-19
    }
}

export default TradUtil
