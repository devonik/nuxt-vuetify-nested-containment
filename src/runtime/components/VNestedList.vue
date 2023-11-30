<script setup lang="ts">
import type { NestedListDataItem, VListItemPropsLight } from '../../module'
import { ref, useRoute } from '#imports'

interface Props {
  transitionComponentName?: string
  transitionComponentProps?: {
    group: boolean
    hideOnLeave: boolean
  }
  listProps?: VListItemPropsLight
  backItemProps?: VListItemPropsLight
  data: NestedListDataItem[]
} const props = withDefaults(defineProps<Props>(), {
  transitionComponentName: 'v-fade-transition',
  transitionComponentProps: () => ({
    group: true,
    hideOnLeave: true,
  }),
  listProps: undefined,
  backItemProps: () => ({
    title: 'Back',
    prependIcon: 'mdi-arrow-left',
  }),
})

const emit = defineEmits<{
  onClickLastChild: []
}>()

const route = useRoute()
const activeLevel = ref(0)
const lastParentData = ref<Record<string, any>>({})
const visibleData = ref<Record<string, any>>({})

function clickParentItem(index: number) {
  const item = props.data[index]

  // If the items is the latests child in this level emit event
  if (!item.children || item.children.length === 0)
    emit('onClickLastChild')

  if (item.onClick)
    return item.onClick()

  // Only proceed paging if there are childrens
  if (!item.children || item.children.length === 0)
    return

  visibleData.value = item
  lastParentData.value = visibleData
  activeLevel.value = 1
}
function clickChildItem(index: number) {
  if (!visibleData.value)
    return emit('onClickLastChild')
  const visibleChildren = visibleData.value.children[index]

  // If the items is the latests child in this level emit event
  if (!visibleChildren.children || visibleChildren.children.length === 0)
    emit('onClickLastChild')

  if (visibleChildren.onClick)
    return visibleChildren.onClick()

  // Only proceed paging if there are childrens
  if (!visibleChildren.children || visibleChildren.children.length === 0)
    return

  lastParentData.value = visibleData
  visibleData.value = visibleData.value.children[index]
  activeLevel.value += 1
}
function clickBackToParent() {
  visibleData.value = lastParentData
  activeLevel.value -= 1
}
function isItemActive(item: NestedListDataItem) {
  if (item.activeQueryParam && route.query[item.activeQueryParam]) {
    if (Array.isArray(route.query[item.activeQueryParam]))
      return route.query[item.activeQueryParam]?.includes(item.props.value)
    return route.query[item.activeQueryParam] === item.props.value
  }
  else if (typeof item.isActive === 'function') {
    return item.isActive()
  }

  return false
}
</script>

<template>
  <v-list
    v-bind="listProps"
  >
    <component
      :is="transitionComponentName"
      v-bind="transitionComponentProps"
    >
      <v-list-item
        v-show="activeLevel !== 0"
        key="back"
        v-bind="backItemProps"
        @click="clickBackToParent"
      >
        <template #prepend>
          <div class="mr-4">
            <v-icon :icon="backItemProps.prependIcon" />
          </div>
        </template>
      </v-list-item>
      <v-list-item
        v-for="(parent, pIdx) of data"
        v-show="activeLevel === 0"
        :key="`parent-${parent.props.value}`"
        v-bind="parent.props"
        :active="isItemActive(parent)"
        :append-icon="parent.children && parent.children.length > 0 ? parent.props.appendIcon || 'mdi-arrow-right' : undefined"
        @click="clickParentItem(pIdx)"
      />
      <v-list-item
        v-for="(child, cIdx) of visibleData.children"
        v-show="activeLevel !== 0"
        :key="`child-${child.props.value}`"
        v-bind="child.props"
        :active="isItemActive(child)"
        :append-icon="child.children && child.children.length > 0 ? child.props.appendIcon || 'mdi-arrow-right' : undefined"
        @click="clickChildItem(cIdx)"
      />
    </component>
  </v-list>
</template>
