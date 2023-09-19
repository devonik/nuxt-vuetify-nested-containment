<script setup lang="ts">
import type { NestedListDataItem } from '../../module'
import {reactive, ref, navigateTo} from '#imports'

const props = defineProps({
  transitionComponentName: { type: String, default: 'v-fade-transition'},
  transitionComponentProps: { 
    type: Object, 
    default: () =>  ({ 
      group: true,
      hideOnLeave: true
    })
  },
  listProps: { type: Object, default: undefined},
  backTitle: { type: String, default: 'Back'},
  backIcon: { type: [Object, String], default: 'mdi-arrow-left'},
  data: { type: Array<NestedListDataItem>, required: true},
})

const emit = defineEmits<{
  onClickLastChild: []
}>()

const route = useRoute()
const activeLevel = ref(0)
let lastParentData: NestedListDataItem = reactive(props.data)
let visibleData: NestedListDataItem = reactive(props.data)

function clickParentItem (index: number){
  const item = props.data[index]

  //If the items is the latests child in this level emit event
  if(!item.children || item.children.length === 0) emit('onClickLastChild')

  if(item.props.to) return navigateTo(item.props.to)
  else if(item.onClick) return item.onClick()

  //Only proceed paging if there are childrens
  if(!item.children || item.children.length === 0) return

  
  visibleData = item
  lastParentData = visibleData
  activeLevel.value = 1

}
function clickChildItem (index: number){
  if(!visibleData.children) return
  const visibleChildren = visibleData.children[index]

  //If the items is the latests child in this level emit event
  if(!visibleChildren.children || visibleChildren.children.length === 0) emit('onClickLastChild')

  if(visibleChildren.props.to) return navigateTo(visibleChildren.props.to)
    else if(visibleChildren.onClick) return visibleChildren.onClick()

    //Only proceed paging if there are childrens
  if(!visibleChildren.children || visibleChildren.children.length === 0 ) return

  lastParentData = visibleData
  visibleData = visibleData.children[index]
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
        :title="backTitle"
        :prepend-icon="backIcon"
        @click="clickBackToParent"
      />
      <v-list-item 
        v-for="(parent, pIdx) of data"
        v-show="activeLevel === 0"
        :key="'parent-' + pIdx"
        v-bind="parent.props"
        :active="parent.activeQueryParam ? route.query[parent.activeQueryParam] === parent.props.value : false"
        :append-icon="parent.children && parent.children.length > 0 ? parent.props.appendIcon || 'mdi-arrow-right' : undefined"
        @click="clickParentItem(pIdx)"
      />
      <v-list-item
        v-for="(child, cIdx) of visibleData.children"
        v-show="activeLevel !== 0"
        :key="'child-' + cIdx"
        v-bind="child.props"
        :active="child.activeQueryParam ? route.query[child.activeQueryParam].includes(child.props.value) : false"
        :append-icon="child.children && child.children.length > 0 ? child.props.appendIcon || 'mdi-arrow-right' : undefined"
        @click="clickChildItem(cIdx)"
      />
    </component>
  </v-list>
</template>