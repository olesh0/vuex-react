import React from 'react'
import { PrettyPrintProps } from '../PrettyPrintProps'

export default (props) => {
  return (
    <div className="example-block paddings mapped-controls">
      <h2>Mapped controls</h2>

      <PrettyPrintProps data={props} label="Received props" />

      {Object.keys(props).filter((prop) => typeof props[prop] === 'function').map((actionKey) => (
        <button
          onClick={props[actionKey]}
          key={actionKey}
        >
          {actionKey}
        </button>
      ))}
    </div>
  )
}
