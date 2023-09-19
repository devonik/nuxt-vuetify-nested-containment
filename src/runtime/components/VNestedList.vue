<script setup lang="ts">
import type { NestedListDataItem , VListItemPropsLight} from '../../module'
import {reactive, ref, navigateTo, useRoute} from '#imports'

interface Props {
  transitionComponentName?: string
  transitionComponentProps?: Object,
  listProps?: VListItemPropsLight
  backItemProps?: VListItemPropsLight
  data: NestedListDataItem[]
}

const props = withDefaults(defineProps<Props>(), {
  transitionComponentName: 'v-fade-transition',
  transitionComponentProps: () =>  ({ 
      group: true,
      hideOnLeave: true
    }),
    listProps: undefined,
    backItemProps: {
      title: 'Back',
      prependIcon: 'mdi-arrow-left'
    }
})

const emit = defineEmits<{
  onClickLastChild: []
}>()

const route = useRoute()
const activeLevel = ref(0)
let lastParentData = ref<Record<string, any>>({})
let visibleData = ref<Record<string, any>>({})

function clickParentItem (index: number){
  const item = props.data[index]

  //If the items is the latests child in this level emit event
  if(!item.children || item.children.length === 0) emit('onClickLastChild')

  if(item.onClick) return item.onClick()

  //Only proceed paging if there are childrens
  if(!item.children || item.children.length === 0) return

  
  visibleData.value = item
  lastParentData = visibleData
  activeLevel.value = 1

}
function clickChildItem (index: number){
  if(!visibleData.value.children) return
  const visibleChildren = visibleData.value.children[index]

  //If the items is the latests child in this level emit event
  if(!visibleChildren.children || visibleChildren.children.length === 0) emit('onClickLastChild')

  if(visibleChildren.onClick) return visibleChildren.onClick()

   //Only proceed paging if there are childrens
  if(!visibleChildren.children || visibleChildren.children.length === 0 ) return

  lastParentData = visibleData
  visibleData = visibleData.value.children[index]
  activeLevel.value += 1

}
function clickBackToParent (){
  visibleData = lastParentData
  activeLevel.value -= 1
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
        :key="'parent-' + parent.props.value"
        v-bind="parent.props"
        :active="parent.activeQueryParam && route.query[parent.activeQueryParam] ? route.query[parent.activeQueryParam] === parent.props.value : false"
        :append-icon="parent.children && parent.children.length > 0 ? parent.props.appendIcon || 'mdi-arrow-right' : undefined"
        @click="clickParentItem(pIdx)"
      />
      <v-list-item
        v-for="(child, cIdx) of visibleData.children"
        v-show="activeLevel !== 0"
        :key="'child-' + child.props.value"
        v-bind="child.props"
        :active="child.activeQueryParam && route.query[child.activeQueryParam] ? route.query[child.activeQueryParam]?.includes(child.props.value) : false"
        :append-icon="child.children && child.children.length > 0 ? child.props.appendIcon || 'mdi-arrow-right' : undefined"
        @click="clickChildItem(cIdx)"
      />
    </component>
  </v-list>
</template>