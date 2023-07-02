export default defineNuxtConfig({
  modules: ["../src/module"],
  nuxtVuetifyNestedMenu: {},
  devtools: { enabled: true },
  css: ["vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },
});
