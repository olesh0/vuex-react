import React, { useEffect } from 'react'
import { Provider } from 'vuex-react'

import store from './store'
import ChildrenComponent from './components/ChildrenComponent'
import SecondChildrenComponent from './components/SecondChildrenComponent'
import Controls from './components/Controls'

import './css/prettify.css'

const App = () => {
  useEffect(() => {
    document.title = "Vuex React - Example"
  }, [])

  return (
    <Provider store={store}>
      <div className="examples-wrapper">
        <Controls />

        <ChildrenComponent />
        <SecondChildrenComponent />
      </div>
    </Provider>
  )
}

export default App
