var fs = require('fs');
console.log(JSON.parse(fs.readFileSync('src/includes.json', 'utf8')).includes.join(" "));
