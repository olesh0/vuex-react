# vuex-react

> Global state manager for React (redux, but vuex like)

[![NPM](https://img.shields.io/npm/v/vuex-react.svg)](https://www.npmjs.com/package/vuex-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save vuex-react
```

## Usage

##### Provider
```jsx
import { Provider } from 'vuex-react'
import App from './App'

const store = {
  jane: {
    state: {
      name: 'Jane',
      age: 19,
    },
    actions: {
      makeHerHappy: ({ dispatch, commit }, params) => {
        // Make your pickup line...
      },
    },
  },
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
```


##### Then you case the store in your child components like this:
```jsx
import React from 'react'
import {
  useStore,
  useGetter,
  useAction,
  mapActions,
  mapGetters,
  useModule,
} from 'vuex-react'

export default () => {
  // you can use . instead of /
  // e.g. useGetter('person.name')
  const [name, setName] = useGetter('jane/name')
  const makeJaneHappy = useAction('jane/makeHerHappy')
  const { state, commit, dispatch } = useStore()

  // Do your stuff

  // name & setName - works as a regular useState, but globally
  // makeJaneHappy - you can call it likes this: makeJaneHappy() with just one param
  // state - your global state
  // commit - can change stuff in your state
  // dispatch - calls functions in your state

  // vuex like mapGetters & mapActions
  const { name } = mapGetters({ name: 'jane/name' })
  const { makeJaneHappy } = mapActions({ makeJaneHappy: 'jane/makeHerHappy' })

  // useModule hook
  // allows you to get all the methods & state from some module
  // WARNING methods with the same keys as state are going to be overrided by state
  const jane = useModule('jane')

  // constant "jane" is an object that has inside:
  {
    name: 'Jane',
    age: 19,
    makeHerHappy: function,
  }
  // you can specify noMerge and then you'll see it like this:
  {
    state: {
      name: 'Jane',
      age: 19,
    },
    methods: {
      makeHerHappy: function,
    },
  }

  state.jane.name // Jane
  setName('Jane')
  makeJaneHappy()
  commit('jane/name', 'Emma')
  dispatch('jane/makeHerHappy', "<Your Params>")
}
```

## License

MIT © [olesh0](https://github.com/olesh0)
