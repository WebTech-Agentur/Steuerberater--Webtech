import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        datenschutz: resolve(__dirname, 'pages/datenschutz.html'),
        impressum: resolve(__dirname, 'pages/impressum.html'),
        kontakt: resolve(__dirname, 'pages/kontakt.html'),
        leistungen: resolve(__dirname, 'pages/leistungen.html'),
        privatpersonen: resolve(__dirname, 'pages/privatpersonen.html'),
        uberUns: resolve(__dirname, 'pages/uber-uns.html'),
        unternehmen: resolve(__dirname, 'pages/unternehmen.html'),
      },
    },
  },
});
