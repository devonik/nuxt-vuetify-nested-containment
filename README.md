# Nuxt vuetify nested containment

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

This module provides multiple vuetify extended components like a List with nested logic

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-vuetify-nested-containment?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Vue3, Nuxt3, Vuetify3
- 🚠 &nbsp;100% Typescript
- 🌲 &nbsp;As lightweight as possible

### Components

#### VNestedList

![Preview](docs/assets/v-nested-list.gif)

With this component you can use a infinitly nested list. Optimized for mobile with one visible level and 'go back' functionality.
It supports all vuetify List props by forward all props in "props:" to v-list-item by v-bind="item.props". See <https://vuetifyjs.com/en/api/v-list-item/> for all possible props.
Define custom click event on each item with onClick attribute in data json (Will be overwritten with arrow if item has childrens)

##### Props

###### data

> With this json you can structure the nested list

*type* Array<Record<string, any>>

*required* true

See the [type](https://github.com/devonik/nuxt-vuetify-nested-containment/blob/main/src/module.ts) (25)

```js
import IconArrowLeft from '~icons/mdi/arrow-left'
<v-nested-list
  /* VList props https://vuetifyjs.com/en/api/v-list/#props */
  :list-props="{
    color: 'primary',
  }"
  /* The below for structure */
  :data="item.nestedListData"
  /* VListItem props https://vuetifyjs.com/en/api/v-list-item/#props */
  :back-item-props="{
    title: $t('back'),
    baseColor: 'any-theme-color',
    prependIcon: 'custom:chevron-left'
  }"
  /* Emmitted event if any last child is clicked - usefull for closing menu as example */
  @on-click-last-child="closeMenu()"
/>
const data = [
{
    activeQueryParam: 'q', // You can use this to let the component set active true when the vue route query is equal to props.value
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
```

###### back-title

> With this string you can overwrite the default back title

*type* string

*default*: Back

###### back-icon

> With this you can overwrite the default back icon. You can either fill it with a icon string like mdi-* (Remember to load material design icons css for that). Or you fill it with a JS Object. See <https://vuetifyjs.com/en/components/icons/#semantic-svg-icons> for more

*type* string | Object

*default*: mdi-arrow-left

###### transition-component-name

> With this string you can overwrite the default transition component. See possible vuetify component names here <https://vuetifyjs.com/en/styles/transitions/>

*Important note* If your app is using vuetify-loader to auto-import components be sure to explicit import the v-...-transition component from vuetify. ```import { VFadeTransition } from 'vuetify/components'```

*type* string

*default*: v-fade-transition

###### transition-component-props

> With this json you can overwrite the default transition props. See possible props here <https://vuetifyjs.com/en/api/v-fade-transition/>

*type* Object

*default*: ```{ group: true, hideOnLeave: true }```

###### list-props

> This object is fowarded to the v-list component via v-bind="props". For all props you can see <https://vuetifyjs.com/en/api/v-list/#props>

*type* Object

*default*: undefined

## Quick Setup

1. Add `nuxt-vuetify-nested-containment` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-vuetify-nested-containment

# Using yarn
yarn add --dev nuxt-vuetify-nested-containment

# Using npm
npm install --save-dev nuxt-vuetify-nested-containment
```

2. Add `nuxt-vuetify-nested-containment` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-vuetify-nested-containment'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-vuetify-nested-containment/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-vuetify-nested-containment

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-vuetify-nested-containment.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-vuetify-nested-containment

[license-src]: https://img.shields.io/npm/l/nuxt-vuetify-nested-containment.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-vuetify-nested-containment

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
