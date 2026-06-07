const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

const rootDir = path.resolve(__dirname, '..');
const outputFile = path.join(rootDir, 'project-context.md');

// Core ignores to prevent bloating the LLM context
const defaultIgnores = [
    'node_modules/**',
    '.git/**',
    'dist/**',
    'package-lock.json',
    'project-context.md',
    'assets/**', 
    'helpers/generate-context.cjs'
];

const ig = ignore().add(defaultIgnores);

// Incorporate existing .gitignore rules if present
const gitignorePath = path.join(rootDir, '.gitignore');
if (fs.existsSync(gitignorePath)) {
    ig.add(fs.readFileSync(gitignorePath, 'utf8'));
}

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const absolutePath = path.join(dir, file);
        // Normalize path for the ignore module
        const relativePath = path.relative(rootDir, absolutePath).replace(/\\/g, '/');

        if (ig.ignores(relativePath)) continue;

        if (fs.statSync(absolutePath).isDirectory()) {
            getFiles(absolutePath, fileList);
        } else {
            fileList.push({ absolutePath, relativePath });
        }
    }
    return fileList;
}

function generateContext() {
    const files = getFiles(rootDir);
    let context = '# Project Context: SR5 Baby Monitor\n\n';

    // Output Directory Tree
    context += '## File Tree\n```text\n';
    files.forEach(f => { context += f.relativePath + '\n'; });
    context += '```\n\n';

    // Output File Contents
    context += '## File Contents\n\n';
    for (const { absolutePath, relativePath } of files) {
        // Double check against binaries/media just in case
        const ext = path.extname(absolutePath).toLowerCase();
        if (['.png', '.jpg', '.webp', '.ogg', '.webm', '.pdf'].includes(ext)) continue;

        const content = fs.readFileSync(absolutePath, 'utf8');
        // Map common extensions to markdown language tags
        const lang = ext.replace('.', '') || 'text';
        context += `### ${relativePath}\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
    }

    fs.writeFileSync(outputFile, context, 'utf8');
    console.log(`✅ Project context generated at ${outputFile}`);
}

generateContext();