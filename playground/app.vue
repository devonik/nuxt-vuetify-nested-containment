<script setup>
const data = [
  {

    props: {
      title: 'Level 0 - Item1',
      prependIcon: 'mdi-account',
    },
    onClick: () => { console.warn('onClick item with no childs') },
    children: [],
  },
  {
    props: {
      title: 'Level 0 - Item2',
      prependIcon: 'mdi-map',
    },
    onClick: () => { console.warn('onClick item with childs') },
    children: [
      {

        props: {
          title: 'Level 1 - Item1',
          prependIcon: 'mdi-map',
        },
      },
      {
        props: {
          title: 'Level 1 - Item2',
        },

      },
    ],
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
              title: 'Level 2 - Item1',
            },

          },
        ],
      },
      {
        props: {
          title: 'Level 1 - Item2',
        },

        children: [],
      },
    ],
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
              title: 'Level 2 - Item1',
            },

          },
          {
            props: {
              title: 'Level 2 - Item2',
            },

          },
        ],
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
                  title: 'Level 3 - Item1',
                },

              },
              {
                props: {
                  title: 'Level 3 - Item2',
                },

              },
            ],
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div style="max-width: 500px;">
    <v-bottom-sheet>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          class="pa-0"
        >
          <v-icon icon="mdi-menu" />
          Toggle
        </v-btn>
      </template>
      <v-nested-list
        :data="data"
        transition-component-name="v-fab-transition"
        back-title="Custom back"
      />
    </v-bottom-sheet>
  </div>
</template>
