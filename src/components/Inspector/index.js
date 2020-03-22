import React from 'react';

import Paginator from './paginator'
import Table from './table'
import Search from './search'

import * as API from '../../lib/hyperfox'

export default class Inspector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      terms: '',

      pageSize: 10,
      selectedPage: 1,
      totalPages: 1,
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

  render() {
    return (
      <div className="container is-widescreen">
        <Search term={this.state.terms} />

        <Table
          page={this.state.selectedPage}
          pageSize={this.state.pageSize}

          setSelectedPage={selectedPage => {
            this.setState({selectedPage})
          }}
          setTotalPages={totalPages => {
            this.setState({totalPages})
          }}

          dataMapper={this.tableRowMapper}
          dataSource={
            (params) => {
              return API.Records(params)
            }
          }
        />

        <Paginator
          onSelectPage={(selectedPage) => {
            this.setState({selectedPage})
          }}
          selected={this.state.selectedPage}
          pages={this.state.totalPages}
        />
      </div>
    )
  }
}
