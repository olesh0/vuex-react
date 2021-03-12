import React from 'react'
import { useStore } from 'vuex-react'

export default () => {
  const { state } = useStore()

  return (
    <div className="paddings area-second-component example-block">
      <h2>Second children component [2]</h2>

      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}