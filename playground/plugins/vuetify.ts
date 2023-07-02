import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { defineNuxtPlugin } from "#app";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: "#D21300",
    secondary: "#4A4A4A",
    "heiland-light-blue": "#4a90e2",
    "heiland-blue": "#305F95",
    "heiland-dark-grey": "#9b9b9b",
    "heiland-dark-green": "#4CAF50",
    "heiland-green": "#4CAF50",
    "heiland-light-green": "#67B40F",
    "heiland-orange": "#F5A623",
    "heiland-yellow": "#F8E71C",
    "heiland-purple": "#9013FE",
    "heiland-green-tag-background": "#E6F4EA",
    "heiland-green-tag": "#34A853",
    "heiland-red-tag-background": "#FFBDAD",
    "heiland-red-tag": "#42516E",
    "heiland-orange-tag-background": "#FFEDD0",
    "heiland-orange-tag": "#F5A623",
    error: "#D21300",
    success: "#67B40F",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    // Vue 3 has no way to automatically detect if SSR is used. See https://next.vuetifyjs.com/en/getting-started/installation/#ssr
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    //TODO cannot import sass variables ?
    //styles: { configFile: 'assets/style/variables.scss' },
    theme: {
      defaultTheme: "myCustomLightTheme",
      themes: {
        myCustomLightTheme,
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
