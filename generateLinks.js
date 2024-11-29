const fs = require('fs');
const path = require('path');

const docsDir = path.resolve(__dirname, 'docs');
const indexPath = path.resolve(__dirname, 'index.md');

function generateLinks() {
  const files = fs.readdirSync(docsDir);

  const links = files
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const title = file.replace('.md', '');
      return { title, file };
    })
    .sort((a, b) => {
      const numA = parseInt(a.title.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.title.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    })
    .map(({ title, file }) => `- [${title}](./docs/${file})`)
    .join('\n');

  const indexContent = `# Documentation\n\n${links}\n`;

  fs.writeFileSync(indexPath, indexContent);
  console.log('index.md has been updated with links to all Markdown files in the docs directory.');
}

generateLinks();