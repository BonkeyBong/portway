import React from 'react'
import SampleChild from './SampleChild'

import './SampleComponent.scss'

class AppContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <SampleChild />
  }
}

export default AppContainer
