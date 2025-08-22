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
      external: ['@ckeditor/ckeditor5-build-classic', 'emailjs-com', 'react', 'react-dom'],
      output: {
        globals: {
          '@ckeditor/ckeditor5-build-classic': 'CKEditor',
          'emailjs-com': 'emailjs',
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    sourcemap: true
  },
  css: {
    extract: 'style.css'
  }
});
