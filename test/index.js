var SrtParser = require('../src/index')
var parser = new SrtParser()
var fs = require('fs')
var path = require('path')

var file = fs.readFileSync(path.resolve(__dirname, '../srtfiles/Chinese-Simplified.srt')).toString()

var result = parser.parse(file, {
    replaceLine: function (lineContent, index, lineReg) {
        return lineContent.replace(lineReg, '<br>')
    }
})

console.log(result)

var simpleFile = fs.readFileSync(path.resolve(__dirname, '../srtfiles/simple.srt'))

console.log(parser.parse(simpleFile));

console.log(parser.parse(''))

console.log(parser.parse(undefined))

console.log(parser.parse(null))