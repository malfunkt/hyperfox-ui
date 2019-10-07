import React from 'react'

import classNames from 'classnames'

import * as moment from 'moment'

export default class Table extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: null,
      requests: this.props.requests || []
    }
  }

  componentDidMount() {
    this.props.dataSource().then(res => {
      this.setState({requests: res.requests.map(this.props.dataMapper)})
    })
    this.props.dataStream((data) => {
      console.log({data})
      this.pushRequest(this.props.dataMapper(data))
    })
  }

  handleSelectRow(rowID) {
    this.setState({selected: rowID})
    this.props.onSelectRow(rowID)
    return false
  }

  pushRequest(request) {
    this.setState(state => {
      const requests = state.requests.concat(request)
      return {requests}
    })
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

  handleRowClick(ev, id) {
    console.log({ev})
    console.log({id})
  }

  drawRows() {
    const { requests } = this.state

    let rows = []
    for (let i = 0; i < Math.min(requests.length, this.props.pageSize); i++) {
      let r = requests[i]
      rows.push(
        <tr key={`row-${r.ID}`} className='table-row' onClick={(ev) => { this.handleRowClick(ev, r.ID) }}>
          <td>{r.method}</td>
          <td>{r.url}</td>
          <td>{r.contentType}</td>
          <td>{r.status}</td>
          <td>{r.size}</td>
          <td>{this.timeTaken(r.timeTaken)}</td>
          <td>{moment(r.time).fromNow()}</td>
          <td>
            <span className='icon'>
              <i className='oi' data-glyph='data-transfer-download'></i>
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
          {this.drawRows()}
        </tbody>
      </table>
    )
  }
}

Table.defaultProps = {
  dataMapper: r => r,
  dataStream: () => {},
  dataSource: new Promise((resolve) => { resolve() }),
  requests: [],
  pageSize: 10,
  onSelectRow: (rowID) => {
    console.log({rowID})
  }
}
