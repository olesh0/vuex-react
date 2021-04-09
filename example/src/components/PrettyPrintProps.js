import React from 'react'
import '../css/pretty-print-props.css'

export const PrettyPrintProps = ({ data, label }) => {
  const list = Object.keys(data)

  return (
    <div className="list">
      {label && <div className="pretty-props-label">{label}</div>}

      {list.map((key) => {
        const isAction = typeof data[key] === 'function'

        return (
          <div
            key={key}
            className={[
              'item',
              isAction && 'is-action'
            ].join(' ')}
            onClick={() => isAction && data[key]()}
          >
            <span className="key">{key}</span>
            <span className="value">
              {!isAction ? data[key] : `f ${key}()`}
            </span>
          </div>
        )
      })}
    </div>
  )
}
