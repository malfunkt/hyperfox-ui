import React from 'react'
import classNames from 'classnames'
import * as API from '../../lib/hyperfox'
import * as moment from 'moment'

export default class Table extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      records: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let patchState = {}

    // do we have any new records?
    if (nextProps.records.length === prevState.records.length) {
      let i = 0
      for (i = 0; i < nextProps.records.length; i++) {
        if (nextProps.records[i].UUID != prevState.records[i].UUID) {
          patchState.records = nextProps.records
          break
        }
      }
    } else {
      patchState.records = nextProps.records
    }

    return patchState
  }

  timeTaken(nanosecs) {
    switch (true) {
      case nanosecs > 1e9:
        return Math.ceil(nanosecs/1e9) + 's'

      case nanosecs > 1e6:
        return Math.ceil(nanosecs/1e6) + 'ms'

      case nanosecs > 1e3:
        return Math.ceil(nanosecs/1e3) + 'µs'
    }
    return nanosecs + 'ns'
  }

  shortUUID(uuid) {
    return uuid.substr(0, 8)
  }

  renderRows() {
    const { records } = this.state

    let rows = []
    for (let i = 0; i < records.length; i++) {
      let record = records[i]
      rows.push(
        <tr key={`row-${record.UUID}`} className='table-row'>
          <td>{this.shortUUID(record.UUID)}</td>
          <td>{record.method}</td>
          <td>{record.url}</td>
          <td>{record.contentType}</td>
          <td>{record.status}</td>
          <td>{record.size}</td>
          <td>{this.timeTaken(record.timeTaken)}</td>
          <td>{moment(record.time).fromNow()}</td>
          <td>
            <span className='icon'>
              <a href={`/records/${record.UUID}`}>
                <i className='oi' data-glyph='eye'></i>
              </a>
              <a href={API.RecordResponseURL(record.UUID)}>
                <i className='oi' data-glyph='data-transfer-download'></i>
              </a>
            </span>
          </td>
        </tr>
      )
    }

    return rows
  }

  render() {
    return (
      <table className='table is-fullwidth is-scrollable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Method</th>
            <th>URL</th>
            <th>Type</th>
            <th>Status</th>
            <th>Size</th>
            <th>Time</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='table-rows'>
          {this.renderRows()}
        </tbody>
      </table>
    )
  }
}

Table.defaultProps = {
  records: [],
}
