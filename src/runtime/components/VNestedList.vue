<script setup lang="ts">
import {ref} from '#imports'
  const props = defineProps({
    data: { type: Array<Record<string, any>>, required: true}
  })
const activeLevel = ref(0)
const lastParentData = ref(props.data)
const visibleData = ref(props.data)

function clickParentItem (index){
  if(!props.data[index].children || props.data[index].children.length === 0){
    if(props.data[index].onClick) props.data[index].onClick()
    return
  }
  visibleData.value = props.data[index]
  activeLevel.value = 1
}
function clickChildItem (index){
  if(!visibleData.value.children[index].children || visibleData.value.children[index].children.length === 0 ){
    if(visibleData.value.children[index].onClick) visibleData.value.children[index].onClick()
    return
  }
  lastParentData.value = visibleData.value
  visibleData.value = visibleData.value.children[index]
  activeLevel.value += 1
}
function clickBackToParent (){
    console.log("visibleData", visibleData.value)
    console.log("lastParentData", lastParentData.value)
  visibleData.value = lastParentData.value
  activeLevel.value -= 1
}
</script>
<template>
  <v-list>
    <v-list-item
      v-show="activeLevel !== 0"
      title="back"
      prepend-icon="mdi-arrow-left"
      @click="clickBackToParent"
    />
    <v-list-item 
      v-for="(parent, pIdx) of data"
      v-show="activeLevel === 0"
      :key="pIdx"
      v-bind="parent.props"
      :append-icon="parent.children && parent.children.length > 0 ? 'mdi-arrow-right' : null"
      
      @click="clickParentItem(pIdx)"
    />
    <v-list-item
      v-for="(child, cIdx) of visibleData.children"
      v-show="activeLevel !== 0"
      :key="cIdx"
      v-bind="child.props"
      :append-icon="child.children && child.children.length > 0 ? 'mdi-arrow-right' : null"
      @click="clickChildItem(cIdx)"
    />
  </v-list>
</template>