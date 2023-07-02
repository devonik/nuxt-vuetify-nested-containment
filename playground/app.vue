<template>
  <div style="max-width: 500px;">
    <v-nested-list :data="data" />
  </div>
</template>

<script setup>
const data = [
{
    
    props: {
      title: 'Level 0 - Item1',
      prependIcon: 'mdi-account',
    },
    onClick: () => { console.log("onClick item with no childs") },
    children: []
  },
  {
    props: {
      title: 'Level 0 - Item2',
      prependIcon: 'mdi-map',
    },
    onClick: () => { console.log("onClick item with childs") },
    children: [
      {
        
        props: {
          title: 'Level 1 - Item1',
          prependIcon: 'mdi-map',
        },
      },
      {
        props: {
          title: 'Level 1 - Item2'
        },
        
      }
    ]
  },
  {
    props: {
      title: 'Level 0 - Item3',
        },
   
    children: [
      {
        props: {
          title: 'Level 1 - Item1',
        },
        
        children: [
          {
            props: {
              title: 'Level 2 - Item1'
        },
            
          }
        ]
      },
      {
        props: {
          title: 'Level 1 - Item2',
        },
        
        children: []
      }
    ]
  },
  {
    props: {
      title: 'Level 0 - Item4',
        },
   
    children: [
      {
        props: {
          title: 'Level 1 - Item1',
        },
        
        children: [
          {
            props: {
              title: 'Level 2 - Item1'
        }
            
          },
          {
            props: {
              title: 'Level 2 - Item2'
        },
           
          }
        ]
      },
      {
        props: {
          title: 'Level 1 - Item2',
        },
        
        children: [
        {
          props: {
            title: 'Level 2 - Item1',
        },
            
            children: [
          {
            props: {
              title: 'Level 3 - Item1'
        },
           
          },
          {
            props: {
              title: 'Level 3 - Item2'
        },
           
           
          }
        ]
          }
        ]
      }
    ]
  }
]
</script>
