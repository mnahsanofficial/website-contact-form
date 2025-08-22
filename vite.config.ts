import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'WebsiteContactForm',
      fileName: (format) => `index.${format === 'es' ? 'esm' : 'umd'}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['@ckeditor/ckeditor5-build-classic', 'emailjs-com'],
      output: {
        globals: {
          '@ckeditor/ckeditor5-build-classic': 'CKEditor',
          'emailjs-com': 'emailjs'
        }
      }
    },
    sourcemap: true
  },
  css: {
    extract: 'style.css'
  }
});
