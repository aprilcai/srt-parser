function Parser() {}

Parser.prototype.parse = function (str, options) {
    var endWithoutReturn = /^1\n/.test(str)
    var lineReg = endWithoutReturn ? /\n\n/ : /\r\n\r\n/
    var singleLineReg = endWithoutReturn ? /\n/ : /\r\n/
    var timeReg = /\d{2}:\d{2}:\d{2}(\,\d{3})?\s+-->\s+\d{2}:\d{2}:\d{2}(\,\d{3})?/
    var numberReg = endWithoutReturn ? /^\d+\n+/ : /^\d+(\r\n)+/

    var replaceLine = options.replaceLine
    var pair = str.split(lineReg)
    var result = []
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
    
    return result
}

module.exports = Parser;