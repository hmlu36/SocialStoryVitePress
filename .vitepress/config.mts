import { defineConfig } from 'vitepress'
import fs from 'fs';
import path from 'path';
import { getProjectName } from './utils'; 

const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction ? getProjectName() : '';
console.log(BASE_URL);

// 取 posts 底下的所有 Markdown
function getSidebarItems() {
  const postsDir = path.resolve(__dirname, '../docs');
  const files = fs.readdirSync(postsDir);

  const sidebarItems = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const title = file.replace('.md', '');
      return {
        text: title,
        link: `/docs/${file.replace('.md', '.html')}`
      };
    })
    .sort((a, b) => {
      const numA = parseInt(a.text.match(/\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.text.match(/\d+/)?.[0] || '0', 10);
      return numA - numB;
    });

  return sidebarItems;
}


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: `${BASE_URL}`,
  title: "Social Story",
  description: "Social Story For Teacher Use Only",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Posts',
        items: getSidebarItems()
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hmlu36/SocialStoryVitePress' }
    ],

  },
  vite: {
    // Vite config options
    assetsInclude: ['**/data/**', '**/images/**', '**/audios/**'],
  }
})
