import { defineNuxtModule, addComponent, createResolver } from "@nuxt/kit";

export interface ModuleOptions {}

export interface NestedListDataItem {
  props: {
    title: string;
    value: string;
    appedIcon?: string;
    prependIcon?: string;
    to?: string;
  };
  children: NestedListDataItem[];
  onClick: Function | undefined;
}

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
