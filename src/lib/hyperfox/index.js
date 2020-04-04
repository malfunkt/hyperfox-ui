const DEFAULT_API_PREFIX='http://' + window.location.hostname + ':8899'
const DEFAULT_WS_PREFIX='ws://' + window.location.hostname + ':8899/live'

let W3CWebSocket = require('websocket').w3cwebsocket
let qs = require('qs')

class Hyperfox {
  constructor(props) {
    this.prefix = DEFAULT_API_PREFIX

    this._wsOnmessage = () => {}
    this._openWebsocket()
  }

  _openWebsocket() {
    let ws = new W3CWebSocket(DEFAULT_WS_PREFIX);

    ws.onopen = (e) => {
      console.log('GOT SOCKET')
      if (e.data) {
        console.log('OPEN WS', JSON.parse(e.data))
      }
    }

    ws.onmessage = (e) => {
      console.log({e})
      let data = JSON.parse(e.data)
      if (data) {
        this._wsOnmessage(data)
      }
    }

    ws.onerror = (e) => {
      console.log({e})
    }

    ws.onclose = (e) => {
      console.log({e})
      console.log("connection closed (" + e.code + ")");
    }
  }

  _fetch(type, path, params) {
    const queryString = qs.stringify(params)
    return fetch(this.prefix + path + '?' + queryString)
      .then(res => res.json())
  }

  Subscribe(callback) {
    this._wsOnmessage = callback
  }

  RecordRequestEmbedURL(uuid) {
    return `${this.prefix}/records/${uuid}/request/embed`
  }

  RecordRequestWireURL(uuid) {
    return `${this.prefix}/records/${uuid}/request/wire`
  }

  RecordRequestURL(uuid) {
    return `${this.prefix}/records/${uuid}/request`
  }

  RecordResponseEmbedURL(uuid) {
    return `${this.prefix}/records/${uuid}/response/embed`
  }

  RecordResponseWireURL(uuid) {
    return `${this.prefix}/records/${uuid}/response/wire`
  }

  RecordResponseURL(uuid) {
    return `${this.prefix}/records/${uuid}/response`
  }

  GetRecordMeta(uuid) {
    return this._fetch('GET', `/records/${uuid}`, {})
  }

  Records(params) {
    return this._fetch('GET', '/records', params)
  }
}

module.exports = new Hyperfox()
