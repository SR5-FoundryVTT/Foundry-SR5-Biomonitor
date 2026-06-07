const fs = require('fs');
// Reads from the source module.json to determine the version for tagging
console.log(JSON.parse(fs.readFileSync('src/module.json', 'utf8')).version);
