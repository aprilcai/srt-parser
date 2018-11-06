function Parser() {}

Parser.prototype.parse = function (str, options) {

    if (Object.prototype.toString.call(str) !== '[object String]') {
        if (str === undefined || str === null) {
            str = ''
        } else {
            str = str.toString()
        }
    }
    if (str.length === 0) return []
    
    var result = []
    options = options || {}

    try {
        var endWithoutReturn = /^1\n/.test(str)
        var lineReg = endWithoutReturn ? /\n\n/ : /\r\n\r\n/
        var singleLineReg = endWithoutReturn ? /\n/g : /\r\n/g
        var timeReg = /\d{2}:\d{2}:\d{2}(\,\d{3})?\s+-->\s+\d{2}:\d{2}:\d{2}(\,\d{3})?/
        var numberReg = endWithoutReturn ? /^\d+\n+/ : /^\d+(\r\n)+/

        var replaceLine = options.replaceLine
        var pair = str.split(lineReg)
        pair.forEach((item, i) => {
            var times = item.match(timeReg)[0].split(/\s+-->\s+/)
            pair[i] = item.replace(timeReg, '').replace(numberReg,'')
            if (replaceLine) {
                pair[i] = replaceLine(pair[i], i, singleLineReg)
            }
            result.push({
                start: times[0],
                end: times[1],
                text: pair[i]
            })
        })
    } catch (e) {
        if (options.enableLog) {
            window.console.error(e)
        }
    }
    
    return result
}

module.exports = Parser;