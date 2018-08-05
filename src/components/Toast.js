import React, { Component } from 'react'
import { connect } from 'react-redux'

import ui from 'utils/ui'

import './Toast.scss'

type Props = {
  toast: 'object',
}

class Toast extends Component<Props> {
  render() {
    const { toast } = this.props
    return toast && (
      <div
        key={new Date().getTime()}
        onClick={() => ui.hideToast()}
        className="Toast"
      >
        {toast.msg}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  toast: state.ui.toast,
})

export default connect(mapStateToProps)(Toast)
