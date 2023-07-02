import { defineNuxtModule, addComponent, createResolver } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-vuetify-nested-containment",
    configKey: "nuxtVuetifyNestedMenu",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    /*addComponent({
      name: "VNestedMenu",
      filePath: resolver.resolve("./runtime/components/VNestedMenu"),
    });*/
    addComponent({
      name: "VNestedList",
      filePath: resolver.resolve("./runtime/components/VNestedList"),
    });
  },
});
