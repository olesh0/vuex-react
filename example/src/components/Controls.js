import React from 'react'
import { useAction, useGetter, useStore } from 'vuex-react'

export default () => {
  const { commit, dispatch } = useStore()

  const actions = [
    'jane/makeHerHappy',
    'jane/shootCompliment',
  ]

  const data = [
    'someModule/someNumber',
    'someModule/someOtherNumber',
    'jane/age',
    'jane/name',
  ]

  const controls = data.map((statePath) => {
    const [value, setValue] = useGetter(statePath)

    return {
      value,
      label: statePath,
      onChange: (updatedValue) => setValue(updatedValue),
    }
  })

  return (
    <div className="paddings area-controls example-block">
      <h3>Adjust controls and see stuff changing</h3>

      <div className="controls-list">
        {controls.map(({ label, value, onChange }) => {
          return (
            <div key={label}>
              <div className="label">{label}</div>

              <input
                type="text"
                value={value}
                onChange={(event) => onChange && onChange(event.target.value)}
              />
            </div>
          )
        })}
      </div>

      <div className="actions-list">
        {actions.map((actionPath) => {
          const action = useAction(actionPath)

          return (
            <button
              key={actionPath}
              onClick={action}
            >
              {actionPath}
            </button>
          )
        })}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => {
            commit('jane/name', Math.random() > 0.5 ? 'Jane' : 'Jane ❤️')
          }}
        >commit random to jane/name</button>

        <button
          onClick={() => {
            dispatch('jane/makeHerHappy')
          }}
        >dispatch jane/makeHerHappy</button>
      </div>
    </div>
  )
}
