import type { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
  ssr: false,
  build: {},
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  css: [
    '~/assets/scss/overrides.scss',
  ],
  env: {},
  head: {
    title: 'todo list',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple todo list' }
    ],
    link: []
  },
  loading: { color: '#0c64c1' },
  modules: [],
  plugins: [
    '~/plugins/service-provider',
  ],
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#4E6EA1',
          accent: '#393982',
          secondary: '#ffe18d',
          success: '#217645',
          info: '#1976D2',
          warning: '#ab6100',
          error: '#b1260b',
          customDark: '#1d2741'
        },
        light: {
          primary: '#1976D2',
          accent: '#e91e63',
          secondary: '#f3f3f3',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FF8A00',
          error: '#FF5252'
        }
      }
    }
  },
};

export default config;
