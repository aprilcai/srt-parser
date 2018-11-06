# srt file parser
## simple srt file parser, help you to handle srt file in a easy way.

## demo
```javascript
var file = require('path/to/file.srt')
var SrtParser = require('SrtParser')
var parser = new SrtParser()
var result = parser.parser(file, {
    enableLog: false, // if enableLog is true, when parse error, you will get a log info in console
    replaceLine: function (lineContent, index, lineReg) {
        // here you can replace line break with something you want, for example: /n => <br>
        return lineContent.replace(lineReg, '<br>')
    }
})
```

## change log
* ```0.0.1``` first build, just support simple parse function.