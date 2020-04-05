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

  rangeWidth(minWidth, maxWidth) {
    return {
      'minWidth': `${minWidth}px`,
      'maxWidth': `${maxWidth}px`,
      'overflow': 'hidden',
      'textOverflow': 'ellipsis',
      'whiteSpace': 'nowrap'
    }
  }

  renderRows() {
    const { records } = this.state

    let rows = []
    for (let i = 0; i < records.length; i++) {
      let record = records[i]
      let timeTaken = this.timeTaken(record.timeTaken)
      let timeAgo = moment(record.time).fromNow()
      rows.push(
        <tr key={`row-${record.UUID}`} className='table-row'>
          <td style={this.rangeWidth(10, 60)}>
            <tt>{record.UUID}</tt>
          </td>
          <td style={this.rangeWidth(10, 60)}>
            <tt>{record.method}</tt>
          </td>
          <td style={this.rangeWidth(80, 100000)} title={record.url}>
            <tt>{record.url}</tt>
          </td>
          <td style={this.rangeWidth(60, 220)} title={record.contentType}>
            <tt>{record.contentType}</tt>
          </td>
          <td style={{...this.rangeWidth(40, 60), ...{'textAlign': 'center'}}}>
            <tt>{record.status}</tt>
          </td>
          <td style={{...this.rangeWidth(20, 60), ...{'textAlign': 'right'}}}>
            <tt>{record.size}</tt>
          </td>
          <td style={{...this.rangeWidth(40, 80), ...{'textAlign': 'right'}}} title={timeTaken}>
            <tt>{timeTaken}</tt>
          </td>
          <td style={{...this.rangeWidth(40, 120), ...{'textAlign': 'right'}}} title={timeAgo}>
            <tt>{timeAgo}</tt>
          </td>
          <td style={this.rangeWidth(40, 120)}>
            <a href={`/records/${record.UUID}`}>
              <span className='icon has-text-info'>
                <i className='fas fa-info-circle'></i>
              </span>
            </a>
            <a href={API.RecordResponseURL(record.UUID)}>
              <span className='icon has-text-success'>
                <i className='fas fa-download'></i>
              </span>
            </a>
          </td>
        </tr>
      )
    }

    return rows
  }

  render() {
    return (
      <div className='table-container'>
        <table className='table is-fullwidth is-scrollable is-hoverable'>
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
      </div>
    )
  }
}

Table.defaultProps = {
  records: [],
}
