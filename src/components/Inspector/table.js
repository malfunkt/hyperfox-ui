import React from 'react'

import classNames from 'classnames'

import * as API from '../../lib/hyperfox'

import * as moment from 'moment'

export default class Table extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      paginator: null,
      page: this.props.page || 1,
      pageSize:this.props.pageSize || 10,
      selected: null,
      setSelectedPage: () => {},
      setTotalPages: () => {},
      records: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let patchState = {}
    if (nextProps.page != prevState.page) {
      patchState.page = nextProps.page
    }
    return patchState
  }

  updateDataSource() {
    const params = {
      page_size: this.state.pageSize,
      page: this.state.page
    }
    this.props.dataSource(params).then(data => {
      console.log({data})
      this.setState({
        records: data.records.map(this.props.dataMapper)
      })
      this.props.setSelectedPage(data.page)
      this.props.setTotalPages(data.pages)
    })
  }

  componentDidMount() {
    this.updateDataSource()
  }

  componentDidUpdate(prevProps, prevState) {
    let update = false
    if (prevState.page != this.state.page) {
      update = true
    }
    if (update) {
      this.updateDataSource()
    }
  }

  handleSelectRow(rowID) {
    this.setState({selected: rowID})
    this.props.onSelectRow(rowID)
    return false
  }

  pushRequest(request) {
    this.setState(state => {
      const records = state.records.concat(request)
      return {records}
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

  shortUUID(uuid) {
    return uuid.substr(0, 8)
  }

  drawRows() {
    const { records } = this.state

    let rows = []
    const limit = Math.min(records.length, this.props.pageSize)
    for (let i = 0; i < limit; i++) {
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
          {this.drawRows()}
        </tbody>
      </table>
    )
  }
}

Table.defaultProps = {
  dataMapper: r => r,
  dataSource: new Promise((resolve) => { resolve() }),
  setSelectedPage: () => {},
  setTotalPages: () => {},
  page: 1,
  pageSize: 10,
}
