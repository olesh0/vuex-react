import React, { useState, useContext, createContext } from 'react'
import _ from 'lodash'

const StoreContext = createContext(null)

const generateState = (modules) => {
  const methods = {}
  const state = {}

  Object.keys(modules).forEach((moduleName) => {
    const {
      actions,
      state: moduleState,
    } = modules[moduleName]

    methods[moduleName] = actions
    state[moduleName] = moduleState
  })

  return {
    methods,
    state,
  }
}

const useGetter = ({ statePath, updateValue }) => {
  try {
    const { state } = useContext(StoreContext)

    const splittedPath = statePath.split('/')
    const value = _.get(state, splittedPath.join('.'))

    return [
      value,
      updateValue,
    ]
  } catch (e) {
    throw new Error(`Unknown getter ${statePath}`)
  }
}

export const Provider = ({ store: modules, children }) => {
  const { state: generatedState, methods } = generateState(modules)
  const [state, setState] = useState(generatedState)

  const updateValue = ({ statePath, newValue }) => {
    const _statePath = statePath.split('/').join('.')
    const updatedState = _.set(state, _statePath, newValue)

    return setState({ ...updatedState })
  }

  return (
    <StoreContext.Provider
      value={{
        state,
        useGetter: (statePath) => useGetter({
          statePath,
          updateValue: (newValue) => updateValue({
            statePath,
            newValue,
          }),
        }),
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  return useContext(StoreContext)
}
