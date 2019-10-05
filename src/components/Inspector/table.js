import React from 'react'

import classNames from 'classnames'

export default class Table extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: null,
      requests: this.props.requests || []
    }
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

  drawRows() {
    const { requests } = this.state

    let rows = []
    for (let i = 0; i < Math.min(requests.length, this.props.pageSize); i++) {
      let request = requests[i]
      let row = (
        <tr key={`row-${i}`} className='table-row'>
          <td>{request.ID}</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      )
      rows.push(row)
    }

    return rows
  }

  render() {
    return (
      <table className='table is-fullwidth is-scrollable'>
        <thead>
          <tr>
            <th>Method</th>
            <th>Source</th>
            <th>URL</th>
            <th>Time taken</th>
            <th><abbr title='Response'>Resp</abbr></th>
            <th>Action</th>
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
  requests: [],
  pageSize: 10,
  onSelectRow: (rowID) => {
    console.log({rowID})
  }
}
