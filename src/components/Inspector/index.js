import React from 'react'

import Paginator from './paginator'
import Table from './table'
import Search from './search'
import * as qs from 'qs'
import API from '../../lib/hyperfox'

const TERM_LOOKUP_DELAY = 100

const QUERY_STATUS_IDLE     = 0
const QUERY_STATUS_QUERYING = 1

export default class Inspector extends React.Component {

  constructor(props) {
    super(props)

    const queryParams = qs.parse(props.location.search, {ignoreQueryPrefix: true});

    this.state = {
      terms: queryParams.q || '',
      records: [],
      pageSize: 10,
      selectedPage: queryParams.page || 0,
      totalPages: 1,
      queryStatus: QUERY_STATUS_IDLE,
      status: API.STATUS_DISCONNECTED
    }

    if (queryParams.auth) {
      API.SetAuthToken(queryParams.auth)
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
    if (nextProps.page !== prevState.page) {
      patchState.page = nextProps.page
    }
    return patchState
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.terms !== this.state.terms) {
      this.scheduledUpdateDataSource()
      return
    }

    if (prevState.page !== this.state.page) {
      this.updateDataSource()
    }
  }

  messageReader(message) {
    switch (message.type) {
      case API.MESSAGE_TYPE_STATUS:
        this.setState({status: message.data})
        if (message.data === API.STATUS_CONNECTED) {
          this.updateDataSource()
        }
      break
      case API.MESSAGE_TYPE_ERROR:
        console.log(message.data)
      break
      case API.MESSAGE_TYPE_DATA:
        this.updateDataSource()
      break
      default:
        console.log(`unknown message type "${message.type}"`)
      break
    }
  }

  componentDidMount() {
    API.Subscribe(data => {
      this.messageReader(data)
    })
    API.Connect()
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
    const {
      terms,
      fromUUID,
      pageSize,
      selectedPage,
      queryStatus
    } = this.state

    if (queryStatus !== QUERY_STATUS_IDLE) {
      return
    }

    const params = {
      q: terms,
      from: fromUUID,
      page_size: pageSize,
      page: selectedPage
    }

    let queryParams = {}
    if (terms !== '') {
      queryParams.q = terms
    }
    if (selectedPage > 0) {
      queryParams.page = selectedPage
    }
    this.props.history.push(`/?${qs.stringify(queryParams)}`)

    this.setState({queryStatus: QUERY_STATUS_QUERYING}, () => {
      API.Records(params).then(data => {
        this.setState({
          records: data.records.map(this.tableRowMapper),
          selectedPage: data.page,
          totalPages: data.pages,
          queryStatus: QUERY_STATUS_IDLE
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

  buttonRetry() {
    window.location.reload()
  }

  render() {
    const {
      records,
      terms,
      status,
      queryStatus
    } = this.state

    let body
    switch (status) {
      case API.STATUS_FAILURE:
        body = (
          <div className='notification is-danger content'>
            <p>
              Sorry, Hyperfox is not available or you're not authorized to connect to it.
            </p>
            <p className='buttons'>
              <button
                type='button'
                className='button is-danger is-inverted is-outlined'
                onClick={this.buttonRetry}
              >
                Retry
              </button>
            </p>
          </div>
        )
      break
      case API.STATUS_CONNECTED:
        const showRecords = records.length > 0

        const noRecordsFound = (
          <div className='notification is-info'>
            No records matched your search.
          </div>
        )

        const waitingForRecords = (
          <div className='notification is-primary'>
            Hyperfox ready! Waiting for captured requests.
          </div>
        )

        const zeroRecords = () => {
          if (terms !== '') {
            return noRecordsFound
          }
          return waitingForRecords
        }

        body = (
          <div>
            <Search
              onChange={value => {
                this.setState({terms: value, selectedPage: 1})
                this.scheduledUpdateDataSource()
              }}
              terms={terms}
            />
            {showRecords ? this.renderRecords() : zeroRecords()}
          </div>
        )
      break
      default:
        body = (
          <progress className='progress' max={100}>10%</progress>
        )
      break
    }

    return (
      <section className='section'>
        <div className='container is-widescreen'>
          {body}
        </div>
      </section>
    )
  }
}

Inspector.defaultProps = {
  selectedPage: 0
}
