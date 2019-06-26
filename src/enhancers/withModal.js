import React, { Component, createRef } from 'react'

import './withModal.scss'

const ESC = 27

// TODO: Refactoring use to createPortal later.
const withModal = (WrappedComponent, isWhole) => class extends Component {
  constructor(props) {
    super(props)

    this.modalWrapper = createRef()
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  closeModal = () => {
    document.removeEventListener('keyup', this.handleKeyUp)
    this.props.closeModal()
  }

  handleKeyUp = ({ keyCode }) => {
    if (keyCode === ESC) this.closeModal()
  }

  handleClick = ({ target }) => {
    if (target === this.modalWrapper.current) this.closeModal()
  }

  render() {
    return (
      <div
        ref={this.modalWrapper}
        className={isWhole ? 'WholeModal' : 'Modal'}
        onClick={this.handleClick}
      >
        <div className="Modal__content">
          <WrappedComponent
            {...this.props}
            onCloseModal={this.closeModal}
          />
        </div>
      </div>
    )
  }
}

export default withModal
