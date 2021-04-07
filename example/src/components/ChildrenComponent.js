import React from 'react'
import { useStore } from 'vuex-react'

export default () => {
  const { state } = useStore()

  return (
    <div className="paddings area-first-component example-block">
      <h2>Children component 1</h2>

      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}
