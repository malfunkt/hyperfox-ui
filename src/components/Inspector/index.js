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

      selectedPage: 1,
      pages: 4,
    }
  }

  tableDataSource() {
    return API.Pull().then(res => {
      return res.requests.map(r => {
        return {
          ID: r.id,
          method: r.method,
          status: r.status,
          url: r.url,
          timeTaken: r.time_taken,
          contentType: r.content_type,
          time: r.date_end
        }
      })
    })
  }

  render() {
    return (
      <div className="container is-widescreen">
        <Search term={this.state.terms} />

        <Table pageSize={10} dataSource={this.tableDataSource} />

        <Paginator />
      </div>
    )
  }
}
