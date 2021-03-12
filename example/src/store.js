import _ from "lodash"

const NAME = "Jane"

export default {
  someModule: {
    state: {
      someNumber: 123,
      someOtherNumber: 321,
    },
  },
  jane: {
    state: {
      age: 18,
      name: NAME,
      song: `The diary of ${NAME}`,
    },
    actions: {
      makeHerHappy() {
        global.alert(`You're beaufiful, ${NAME}!`)
      },
      shootCompliment() {
        const compliments = [
          "You're amazing!",
          "Your positivity is infectious.",
          "You're an incredible friend.",
          "I love your perspective on life.",
          "You are one of a kind.",
          "You always know the right thing to say.",
          "You're the one."
        ]

        global.alert(`${NAME}, ${_.sample(compliments)}`)
      },
    },
  },
}
