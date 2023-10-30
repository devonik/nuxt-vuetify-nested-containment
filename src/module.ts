import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { VListItem } from 'vuetify/components'

export interface ModuleOptions {}

// Exclude not needed types cause otherwise the consumer may get Type instantiation is excessively deep and possibly infinite cause type to big
export type VListItemPropsLight = Omit<
  VListItem['$props'],
  | 'onClick'
  | 'onClickOnce'
  | '$children'
  | 'onVnodeBeforeMount'
  | 'onVnodeMounted'
  | 'onVnodeBeforeUpdate'
  | 'onVnodeUpdated'
  | 'onVnodeBeforeUnmount'
  | 'onVnodeUnmounted'
  | 'v-slot:default'
  | 'v-slots'
  | 'v-slot:title'
  | 'v-slot:append'
  | 'v-slot:prepend'
  | 'v-slot:subtitle'
  | 'style'
>

export interface NestedListDataItem {
  props: VListItemPropsLight
  activeQueryParam?: string
  children?: NestedListDataItem[]
  onClick?: () => void | undefined
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-vuetify-nested-containment',
    configKey: 'nuxtVuetifyNestedMenu',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url)

    /* addComponent({
      name: "VNestedMenu",
      filePath: resolver.resolve("./runtime/components/VNestedMenu"),
    }); */
    addComponent({
      name: 'VNestedList',
      filePath: resolver.resolve('./runtime/components/VNestedList'),
    })
  },
})
