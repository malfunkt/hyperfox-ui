import React from 'react';

import Paginator from './paginator'
import Table from './table'
import Search from './search'

import * as API from '../../lib/hyperfox'

const STATUS_DISCONNECTED = 0
const STATUS_IDLE         = 1
const STATUS_UPDATING     = 2

const TERM_LOOKUP_DELAY = 100

export default class Inspector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      terms: '',
      records: [],
      pageSize: 10,
      selectedPage: 1,
      totalPages: 1,
      status: STATUS_IDLE
    }
  }

  tableRowMapper(r) {
    return {
      UUID: r.uuid,
      method: r.method,
      status: r.status,
      url: r.url,
      size: r.content_length,
      timeTaken: r.time_taken,
      contentType: r.content_type,
      time: r.date_end
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let patchState = {}
    if (nextProps.page != prevState.page) {
      patchState.page = nextProps.page
    }
    return patchState
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.terms != this.state.terms) {
      this.scheduledUpdateDataSource()
      return
    }

    if (prevState.page != this.state.page) {
      this.updateDataSource()
    }
  }

  componentDidMount() {
    this.updateDataSource()
    API.Subscribe(data => {
      this.updateDataSource()
    })
  }

  scheduledUpdateDataSource() {
    if (this._updateTimer) {
      window.clearTimeout(this._updateTimer)
    }

    this._updateTimer = window.setTimeout(
      () => {
        this.updateDataSource()
        this._updateTimer = 0
      }, TERM_LOOKUP_DELAY
    )
  }

  updateDataSource() {
    const { terms, fromUUID, pageSize, selectedPage, status } = this.state

    if (status !== STATUS_IDLE) {
      console.log('-> IDLE')
      return
    }

    const params = {
      q: terms,
      from: fromUUID,
      page_size: pageSize,
      page: selectedPage
    }

    this.setState({status: STATUS_UPDATING}, () => {
      console.log('-> UPDATING')
      API.Records(params).then(data => {
        console.log('-> UPDATED')
        this.setState({
          records: data.records.map(this.tableRowMapper),
          selectedPage: data.page,
          totalPages: data.pages,
          status: STATUS_IDLE
        })
      })
    })
  }

  renderRecords() {
    return (
      <div>

        <Table
          records={this.state.records}
        />

        <Paginator
          onSelectPage={(selectedPage) => {
            this.setState({selectedPage}, () => {
              this.updateDataSource()
            })
          }}

          selected={this.state.selectedPage}
          pages={this.state.totalPages}
        />
      </div>
    )
  }

  render() {
    const {records, terms} = this.state

    return (
      <section className='section'>
        <div className='container is-widescreen'>

          <div className='notification is-warning'>
            Lost connection.
          </div>

          <Search
            onChange={value => {
              this.setState({terms: value})
              this.scheduledUpdateDataSource()
            }}
            terms={terms}
          />

          {records.length > 0 ? this.renderRecords() : (
            <div className='notification is-info'>
              No records were found.
            </div>
          )}

        </div>
      </section>
    )
  }
}
