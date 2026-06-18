import fs from 'fs';
console.log(JSON.parse(fs.readFileSync('src/includes.json', 'utf8')).includes.join(" "));
