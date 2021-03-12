import React from 'react'
import { Provider } from 'vuex-react'

import store from './store'
import ChildrenComponent from './ChildrenComponent'
import SecondChildrenComponent from './SecondChildrenComponent'
import Controls from './Controls'

import './css/prettify.css'

const App = () => {
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
