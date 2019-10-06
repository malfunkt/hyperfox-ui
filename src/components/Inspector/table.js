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
    this.props.dataSource().then(requests => {
      this.setState({requests: requests})
    })
  }

  handleSelectRow(rowID) {
    this.setState({selected: rowID})
    this.props.onSelectRow(rowID)
    return false
  }

  pushRequest(request) {
    this.setState(state => {
      const rows = state.requests.concat(request)
      return {rows}
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

  drawRows() {
    const { requests } = this.state

    let rows = []
    for (let i = 0; i < Math.min(requests.length, this.props.pageSize); i++) {
      let r = requests[i]
      rows.push(
        <tr key={`row-${i}`} className='table-row'>
          <td>{r.method}</td>
          <td>{r.url}</td>
          <td>{r.contentType}</td>
          <td>{r.status}</td>
          <td>{moment(r.time).fromNow()}</td>
          <td>{this.timeTaken(r.timeTaken)}</td>
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
            <th>Content type</th>
            <th>Response code</th>
            <th>Date</th>
            <th>Time taken</th>
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
  dataSource: new Promise((resolve) => { resolve() }),
  requests: [],
  pageSize: 10,
  onSelectRow: (rowID) => {
    console.log({rowID})
  }
}
