import React, { Component } from 'react'

class Dropdown extends Component<Props> {
  state = {
    isOpen: false,
  }

  render() {
    const { items = [] } = this.props
    return (
      <div className="Dropdown">
        <ul>
          {items.map(item => <li>{item.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default Dropdown
