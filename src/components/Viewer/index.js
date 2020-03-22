import React from 'react';

import * as API from '../../lib/hyperfox'

export default class Viewer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      record: null
    }
  }

  componentDidMount() {
    const {uuid} = this.props.match.params
    API.GetRecordMeta(uuid).then((record) => {
      this.setState({record})
    })
  }

  renderHeaders(header) {
    let names = []

    for (var name in header) {
      names.push(name)
    }
    names.sort()

    return (
      <dl>
        {
          names.map((name) => {
            return header[name].map(value => {
              return [<dt>{name}</dt>, <dd>{value}</dd>]
            })
          })
        }
      </dl>
    )

    console.log({names})

    return <span />
  }

  renderMedia() {
    return (
      <div className='card-image'>
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
        </figure>
      </div>
    )
  }

  renderRecord(record) {
    console.log({record})
    return (
      <div>
        <div className="card-content">

          <p className="title">
            <span>{record.method}</span>
            <span>{record.url}</span>
          </p>

          <p className="subtitle">
            {record.content_type}
          </p>


          <div className="content">

            <div className="columns">
              <div className="column">
                <dl>
                  <dt>UUID:</dt> <dd>{record.uuid}</dd>
                  <dt>Method:</dt> <dd>{record.method}</dd>
                  <dt>URL:</dt> <dd>{record.url}</dd>
                  <dt>Time Taken:</dt> <dd>{record.time_taken}</dd>
                </dl>
              </div>
            </div>

            <div>
              Request
              {this.renderHeaders(record.request_header)}
              <iframe src={API.RecordRequestEmbedURL(record.uuid)}></iframe>
              <a href={API.RecordRequestURL(record.uuid)}
                className="button">Raw</a>
              <a href={API.RecordRequestURL(record.uuid)}
                className="button">Download body</a>
            </div>

            <div>
              Response
              {this.renderHeaders(record.header)}
              <iframe src={API.RecordResponseEmbedURL(record.uuid)}></iframe>
              <a href={API.RecordResponseURL(record.uuid)}
                className="button">Raw</a>
              <a href={API.RecordResponseURL(record.uuid)}
                className="button">Download body</a>
            </div>

            <time datetime="2016-1-1">{record.date_end}</time>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {record} = this.state

    return (
      <div className='card'>
        {record ? this.renderRecord(record) : <span />}
      </div>
    )
  }
}
