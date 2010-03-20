exports.removeParams = removeParams
exports.removeUtmParams = removeUtmParams

function getParamsStr(url) {
    var re = /\?([^#]+)/
    var matched = url.match(re)
    return matched ? matched[1] : null
}

function getParamsReplaceStr(url, str) {
    var re = /\?([^#]+)/
    return url.replace(re, str)
}

function getParams(url) {
    var r = []
    var paramsStr = getParamsStr(url)
    if (paramsStr) {
        paramsStr.split('&').forEach(function(i) {
            r.push(i.split('='))
        })
    }
    return r
}

function paramsJoin(params) {
    return params.map(function(i) {
        return i.join('=')
    }).join('&')
}

function removeParams(url, func) {
    var params = getParams(url)
    if (params.length == 0) {
        return url
    }
    else {
        var filteredParams = params.filter(function(i) {
            return !func(i[0], i[1])
        })
        if (filteredParams.length == 0) {
            return getParamsReplaceStr(url, '')
        }
        else {
            return getParamsReplaceStr(url, '?' + paramsJoin(filteredParams))
        }
    }
}

function removeUtmParams(url) {
    return removeParams(url, function(k, v) {
        return k.match(/^utm_/)
    })
}
