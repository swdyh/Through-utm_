var paramsRemover = require('params-remover')

exports.testRemoveUtmParams = function(test) {
    test.assertEqual(paramsRemover.removeUtmParams('http://example.com/'),
                     'http://example.com/')
    test.assertEqual(paramsRemover.removeUtmParams('http://example.com/?utm_source=bar'),
                     'http://example.com/')
    test.assertEqual(paramsRemover.removeUtmParams('http://example.com/?query=foo&utm_source=bar'),
                     'http://example.com/?query=foo')
    test.assertEqual(paramsRemover.removeUtmParams('http://example.com/?query=foo&utm_source=bar'),
                     'http://example.com/?query=foo')

    test.assertEqual(paramsRemover.removeUtmParams('http://example.com/?query=foo&utm_source=bar&utm_content=utmc'),
                     'http://example.com/?query=foo')

    test.assertEqual(paramsRemover.removeUtmParams('http://example.com/?query=foo&utm_source=bar#foo'),
                     'http://example.com/?query=foo#foo')
}
