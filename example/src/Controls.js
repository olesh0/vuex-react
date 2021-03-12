import React, { useMemo } from 'react'
import { useStore, useAction, useGetter } from 'vuex-react'

export default () => {
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
            <button onClick={action}>
              {actionPath}
            </button>
          )
        })}
      </div>
    </div>
  )
}
