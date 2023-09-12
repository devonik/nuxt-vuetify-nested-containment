<script setup lang="ts">
interface NestedListDataItem {
  props: {
    title: string
    value: string
    appedIcon?: string
    prependIcon?: string
  }
  children: NestedListDataItem[],
  onClick: Function | undefined
}
import {reactive, ref} from '#imports'
  const props = defineProps({
    transitionComponentName: { type: String, default: 'v-fade-transition'},
    transitionComponentProps: { 
      type: Object, 
      default: () =>  ({ 
        group: true,
        hideOnLeave: true
      })
    },
    listProps: { type: Object},
    backTitle: { type: String, default: 'Back'},
    backIcon: { type: [Object, String], default: 'mdi-arrow-left'},
    data: { type: Array<NestedListDataItem>, required: true}
  })
const activeLevel = ref(0)
let lastParentData = reactive(props.data)
let visibleData = reactive(props.data)

function clickParentItem (index){
  if(!props.data[index].children || props.data[index].children.length === 0){
    if(props.data[index].onClick) props.data[index].onClick()
    return
  }
  visibleData = props.data[index]
  activeLevel.value = 1
}
function clickChildItem (index){
  if(!visibleData.children[index].children || visibleData.children[index].children.length === 0 ){
    if(visibleData.children[index].onClick) visibleData.children[index].onClick()
    return
  }
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
  <v-list v-bind="listProps">
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
        :append-icon="parent.children && parent.children.length > 0 ? parent.props.appendIcon || 'mdi-arrow-right' : null"
        @click="clickParentItem(pIdx)"
      />
      <v-list-item
        v-for="(child, cIdx) of visibleData.children"
        v-show="activeLevel !== 0"
        :key="'child-' + cIdx"
        v-bind="child.props"
        :append-icon="child.children && child.children.length > 0 ? child.props.appendIcon || 'mdi-arrow-right' : null"
        @click="clickChildItem(cIdx)"
      />
    </component>
  </v-list>
</template>