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

export const useGetter = (statePath) => {
  try {
    const { state, updateState } = useContext(StoreContext)

    const _statePath = statePath.split('/').join('.')
    const value = _.get(state, _statePath)

    return [
      value,
      (newValue) => updateState({ ..._.set(state, _statePath, newValue) }),
    ]
  } catch (e) {
    throw new Error(`Unknown getter ${statePath}`)
  }
}

export const useAction = (actionPath) => {
  const { methods } = useContext(StoreContext)

  return _.get(methods, actionPath.split('/').join('.'))
}

export const Provider = ({ store: modules, children }) => {
  const { state: generatedState, methods } = generateState(modules)
  const [state, setState] = useState(generatedState)

  return (
    <StoreContext.Provider
      value={{
        state,
        methods,
        updateState: setState,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  return useContext(StoreContext)
}
