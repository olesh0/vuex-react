import React, { useEffect } from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { sample } from 'lodash'
import { mount, configure } from 'enzyme'
import { Provider, useAction, useGetter, useModule, useStore } from '..'

configure({
  adapter: new Adapter()
})

// TODO:
//   # useGetter
//   # useAction
//   # useModule
//   # useStore
//   mapGetters
//   mapToProps

const NAME = 'Jane'
const fakeStore = {
  someModule: {
    state: {
      someNumber: 123,
      someOtherNumber: 321
    },
    actions: {
      highFive: () => 'low 4'
    }
  },
  jane: {
    state: {
      age: 18,
      name: NAME,
      song: `The diary of ${NAME}`
    },
    actions: {
      makeHerHappy() {
        return `You're beaufiful, ${NAME}!`
      },
      makeHerHappyWithName(_, { name }) {
        return `You're beaufiful, ${name}!`
      },
      shootCompliment(methods, data) {
        // methods: { dispatch, commit }
        console.log('action received next args', { methods, data })

        const compliments = [
          "You're amazing!",
          'Your positivity is infectious.',
          "You're an incredible friend.",
          'I love your perspective on life.',
          'You are one of a kind.',
          'You always know the right thing to say.',
          "You're the one."
        ]

        global.alert(`${NAME}, ${sample(compliments)}`)
      }
    }
  }
}

describe('<Provider>', () => {
  it('useGetter', () => {
    const FakeComponent = () => {
      const Component = () => {
        const [name] = useGetter('jane/name')

        expect(name).toBe('Jane')

        return <div />
      }

      return (
        <Provider store={fakeStore}>
          <Component />
        </Provider>
      )
    }

    mount(<FakeComponent />)
  })

  it('useAction', () => {
    const FakeComponent = () => {
      const Component = () => {
        const makeJaneHappy = useAction('jane/makeHerHappy')

        expect(makeJaneHappy()).toBe(`You're beaufiful, Jane!`)

        return <div />
      }

      return (
        <Provider store={fakeStore}>
          <Component />
        </Provider>
      )
    }

    mount(<FakeComponent />)
  })

  it('useModule', () => {
    const FakeComponent = () => {
      const Component = () => {
        const module = useModule('someModule')

        expect(module.highFive()).toBe('low 4')
        expect(module.someNumber).toBe(123)
        expect(module.someOtherNumber).toBe(321)

        return <div />
      }

      return (
        <Provider store={fakeStore}>
          <Component />
        </Provider>
      )
    }

    mount(<FakeComponent />)
  })

  it('useModule', () => {
    const FakeComponent = () => {
      const Component = () => {
        const { dispatch } = useStore()

        expect(dispatch('jane/makeHerHappyWithName', { name: 'JANE' })).toBe(
          `You're beaufiful, JANE!`
        )
        expect(dispatch('jane/makeHerHappyWithName', { name: 'Emma' })).toBe(
          `You're beaufiful, Emma!`
        )

        return <div />
      }

      return (
        <Provider store={fakeStore}>
          <Component />
        </Provider>
      )
    }

    mount(<FakeComponent />)
  })
})
