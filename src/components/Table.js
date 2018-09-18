import React, { Component, Fragment } from 'react'
import ReactTable from 'react-table'

import Button from 'components/Button'

import './Table.scss'

type Props = {

}

class Table extends Component<Props> {
  render() {
    const { title, onClick } = this.props
    return (
      <div className="Table">
        <div className="Table__header">
            <Fragment>
              {title && (
                <span className="Table__title">
                  {title}
                </span>
              )}
              <Button
                icon="icon-refresh"
                className="Table__refreshButton"
                title="Refresh"
                onClick={onClick}
              />
            </Fragment>

        </div>
        <ReactTable
          {...this.props}
          resizable={false}
          sortable={false}
          minRows={1}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </div>
    )
  }
}

export default Table
