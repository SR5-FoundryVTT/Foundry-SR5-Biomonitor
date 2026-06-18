import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Native plugin to guarantee files are copied to dist
function copyFoundryFiles() {
  return {
    name: 'copy-foundry-files',
    // writeBundle runs every time Vite finishes building, including in watch mode
    writeBundle() {
      const targets = [
        { src: 'src/module.json', dest: 'dist/module.json' },
        { src: 'src/languages', dest: 'dist/languages' },
        { src: 'src/templates', dest: 'dist/templates' },
        { src: 'src/assets', dest: 'dist/assets' },
        { src: 'README.md', dest: 'dist/README.md' }
      ];

      targets.forEach(({ src, dest }) => {
        const srcPath = path.resolve(__dirname, src);
        const destPath = path.resolve(__dirname, dest);
        
        if (fs.existsSync(srcPath)) {
          fs.cpSync(srcPath, destPath, { recursive: true, force: true });
        }
      });
      console.log('\n📁 Copied static Foundry files to dist/');
    }
  };
}

export default defineConfig({
  esbuild: {
    keepNames: true
  },
  resolve: {
    alias: {
      '/modules/sr5-biomonitor': path.resolve(__dirname, 'src')
    }
  },
  build: {
    minify: false,
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/scripts/hooks.js'),
      formats: ['es'],
      fileName: () => 'scripts/hooks'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'scripts/[name].js',
        chunkFileNames: 'scripts/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.name || (assetInfo.names && assetInfo.names[0]);

          if (assetName && assetName.endsWith('.css')) {
            return 'styles/module.css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  plugins: [
    tailwindcss(), 
    copyFoundryFiles() // Replaced the static-copy plugin with our native one
  ]
});