var fs = require('fs');
var tsc = require('typescript-compiler');

var dir = __dirname + '/enums/';

fs.readdir(dir, (err, files) => {
    var filesForComplipe = [];
    for (var i in files) {
        if (/^[^_].+\.ts$/i.test(files[i]))
            filesForComplipe.push(dir + files[i]);
    }
    var enumForServer = dir + 'all-enum.js';
    tsc.compile(filesForComplipe, ['--out', enumForServer]);
    setTimeout(() => {
        fs.readFile(enumForServer, 'utf8', (err, data) => {
            if (err) throw err;
            data = data.replace(/var JMath;/g, '')
                .replace(/\(function \(JMath\) \{/g, '')
                .replace(/\}\)\(JMath \|\| \(JMath = \{\}\)\);/g, '');

            data = 'module.exports = function (JMath) {' + '\JMath = JMath || {};' + data + '\n};';
            fs.writeFile(enumForServer, data, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
        });
    }, 1000);
    //tsc.compile(filesForComplipe, ['--out', __dirname + '/appClient/enums/all-enum.js']);
});