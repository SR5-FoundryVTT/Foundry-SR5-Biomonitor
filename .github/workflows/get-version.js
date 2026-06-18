import fs from 'fs';
console.log(JSON.parse(fs.readFileSync('src/module.json', 'utf8')).version);
