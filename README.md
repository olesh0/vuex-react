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

const store = {
  person: {
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
      Your App goes here...
    </Provider>
  )
}
```


##### Then you case the store in your child components like this:
```jsx
import { useStore, useGetter, useAction } from 'vuex-react'

export default () => {
  // you can use . instead of /
  // e.g. useGetter('person.name')
  const [name, setName] = useGetter('person/name')
  const makeJaneHappy = useAction('person/makeHerHappy')
  const { state, commit, dispatch } = useStore()

  // Do your stuff

  // name & setName - works as a regular useState, but globally
  // makeJaneHappy - you can call it likes this: makeJaneHappy() with just one param
  // state - your global state
  // commit - can change stuff in your state
  // dispatch - calls functions in your state

  state.person.name // Jane
  setName('Jane')
  makeJaneHappy()
  commit('person/name', 'Emma')
  dispatch('person/makeHerHappy', "<Your Params>")
}
```

## License

MIT © [olesh0](https://github.com/olesh0)
