import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Toast from 'components/Toast'
import ui from 'utils/ui'

import Header from 'components/Header'
import Footer from 'components/Footer'

import * as blockActions from 'actions/block'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  componentDidMount() {
    const { getValidators } = this.props
    getValidators()
  }

  render() {
    const { children } = this.props

    return [
      <Toast key="Toast" />,
      <div className="App" key="App">
        <Header />
        <section className="App__section">
          {children}
        </section>
        <Footer />
      </div>
    ]
  }
}



const mapDispatchToProps = dispatch => ({
  getValidators: () => dispatch(blockActions.getValidators()),
})

export default connect(null, mapDispatchToProps)(App)
