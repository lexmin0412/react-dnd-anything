import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/react-dnd-anything/',
  publicPath: '/react-dnd-anything/',
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'RDA',
    footer: `<div>Copyright © 2023 | Powered by <a href="https://d.umijs.org/guide" target="_blank">dumi</a> | Authored by <a href="https://github.com/lexmin0412" target="_blank">Lexmin0412</a>.</div>`,
    socialLinks: {
      github: 'https://github.com/lexmin0412/react-dnd-anything',
    },
  },
});
