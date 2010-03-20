var errorConsole = require('error-console')
var observerService = require('observer-service')
var paramsRemover = require('params-remover')

exports.main = function(options, callbacks) {
    var re = /utm_/
    var reAccept = /html/
    var callback = function(subject) {
        var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel)
        var url = subject.URI.spec
        var acceptHeader = httpChannel.getRequestHeader("Accept")
        // errorConsole.log(url + '\n' +  acceptHeader)

        if (url.match(re) && acceptHeader && acceptHeader.match(reAccept)) {
            var filteredURL = paramsRemover.removeUtmParams(url)
            if (url != filteredURL) {
                // errorConsole.log(['Through utm_:', url, filteredURL].join('\n'))
                try {
                    var webNav = subject.notificationCallbacks.getInterface(Ci.nsIWebNavigation)
                    subject.loadFlags = Ci.nsICachingChannel.LOAD_ONLY_FROM_CACHE
                    webNav.loadURI(filteredURL, Ci.nsIWebNavigation.LOAD_FLAGS_NONE, null, null, null)
                }
                catch(e) {
                    errorConsole.log(e)
                }
            }
        }
    }
    observerService.add('http-on-modify-request', callback)
}

