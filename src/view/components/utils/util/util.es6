export let FrwkUtil = FrwkUtil || {}
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

