import { defineNuxtModule, addComponent, createResolver } from "@nuxt/kit";
import type { VListItem } from "vuetify/components";
export interface ModuleOptions {}

type VListItemProps = VListItem["$props"];
export interface NestedListDataItem {
  props: VListItemProps;
  children?: NestedListDataItem[];
  onClick?: Function | undefined;
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
