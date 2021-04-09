import { mapToProps } from 'vuex-react'
import PropsMappedControls from './PropsMappedControls'

export default mapToProps({
  state: {
    name: 'jane.name',
  },
  actions: {
    makeHerHappy: 'jane.makeHerHappy',
    shootCompliment: 'jane.shootCompliment',
  },
})(PropsMappedControls)
