import React from 'react'

import API from '../../lib/hyperfox'
import * as utils from '../../lib/utils'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleDown,
  faDownload
} from '@fortawesome/free-solid-svg-icons'

const iframeStyle = {
  border: '1px solid #dbdbdb',
  borderRadius: '4px',
  width: '100%',
  height: '8em'
}

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
          names.map((name, i) => {
            return header[name].map(value => {
              return [
                <dt key={`dt-${i}`} title={name}>{name}</dt>,
                <dd key={`dd-${i}`}><input className='input' readOnly='readonly' onClick={(ev) => {ev.target.select()}} value={value} /></dd>
              ]
            })
          })
        }
      </dl>
    )
  }

  renderButtonRaw(url) {
    return (
      <a href={url}
        className='button'
      >
        <span className='icon'>
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </span>
        <span>Raw</span>
      </a>
    )
  }

  renderButtonDownload(url) {
    return (
      <a href={url}
        className='button'
      >
        <span className='icon'>
          <FontAwesomeIcon icon={faDownload} />
        </span>
        <span>Download body</span>
      </a>
    )
  }

  renderRecord(record) {
    return (
      <section className='section'>
        <div className='container is-widescreen'>
          <div className='content'>
            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  <tt>
                    {record.method}
                    &nbsp;
                    {record.url}
                  </tt>
                </p>
              </header>
              <div className='card-content'>
                <div className='columns'>
                  <div className='column'>
                    <dl>
                      <dt>UUID</dt> <dd>{record.uuid}</dd>
                      <dt>Content type</dt> <dd>{record.content_type}</dd>
                      <dt>Date</dt> <dd>{utils.timeAgo(record.date_end)}</dd>
                      <dt>Time taken</dt> <dd>{utils.timeTaken(record.time_taken)}</dd>
                      <dt>Size</dt> <dd>{utils.size(record.content_length)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  Client request
                </p>
              </header>
              <div className='card-content'>
                {this.renderHeaders(record.request_header)}
                <iframe title='request body' style={iframeStyle} src={API.RecordRequestEmbedURL(record.uuid)}></iframe>
                <p className='buttons'>
                  {this.renderButtonRaw(API.RecordRequestWireURL(record.uuid))}
                  {this.renderButtonDownload(API.RecordRequestURL(record.uuid))}
                </p>
              </div>
            </div>

            <div className='card'>
              <header className='card-header'>
                <p className='card-header-title'>
                  Server response
                </p>
              </header>
              <div className='card-content'>
                {this.renderHeaders(record.header)}
                <iframe title='response body' style={iframeStyle} src={API.RecordResponseEmbedURL(record.uuid)}></iframe>
                <p className='buttons'>
                  {this.renderButtonRaw(API.RecordResponseWireURL(record.uuid))}
                  {this.renderButtonDownload(API.RecordResponseURL(record.uuid))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
