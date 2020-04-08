const HOSTNAME = window.location.hostname

const DEFAULT_API_PREFIX=`http://${HOSTNAME}:8899`
const DEFAULT_WS_PREFIX=`ws://${HOSTNAME}:8899/live`

const W3CWebSocket = require('websocket').w3cwebsocket
const qs = require('qs')

const STATUS_DISCONNECTED   = 0
const STATUS_CONNECTING     = 1
const STATUS_CONNECTED      = 2

const MESSAGE_TYPE_STATUS   = 0
const MESSAGE_TYPE_ERROR    = 1
const MESSAGE_TYPE_DATA     = 2

const AUTH_KEY = 'auth'

class Hyperfox {

  get STATUS_DISCONNECTED() {
    return STATUS_DISCONNECTED
  }

  get STATUS_CONNECTING() {
    return STATUS_CONNECTING
  }

  get STATUS_CONNECTED() {
    return STATUS_CONNECTED
  }

  get MESSAGE_TYPE_STATUS() {
    return MESSAGE_TYPE_STATUS
  }

  get MESSAGE_TYPE_ERROR() {
    return MESSAGE_TYPE_ERROR
  }

  get MESSAGE_TYPE_DATA() {
    return MESSAGE_TYPE_DATA
  }

  constructor(props) {
    this.prefix = DEFAULT_API_PREFIX
    this.status = STATUS_DISCONNECTED

    this._wsOnmessage = () => {}
  }

  _openWebsocket() {
    let ws = new W3CWebSocket(DEFAULT_WS_PREFIX + `?auth=${this.AuthToken()}`);

    this._wsOnmessage({
      type: MESSAGE_TYPE_STATUS,
      data: STATUS_CONNECTING
    })

    ws.onopen = (e) => {
      this._wsOnmessage({
        type: MESSAGE_TYPE_STATUS,
        data: STATUS_CONNECTED
      })
    }

    ws.onmessage = (e) => {
      let data = JSON.parse(e.data)
      if (data) {
        this._wsOnmessage({
          type: MESSAGE_TYPE_DATA,
          data: data
        })
      }
    }

    ws.onerror = (e) => {
      this._wsOnmessage({
        type: MESSAGE_TYPE_ERROR,
        data: e
      })
    }

    ws.onclose = (e) => {
      this._wsOnmessage({
        type: MESSAGE_TYPE_STATUS,
        data: STATUS_DISCONNECTED
      })

      window.setTimeout(
        () => {
          this._openWebsocket()
        },
        1000
      )
    }
  }

  _fetch(type, path, params) {
    const queryString = qs.stringify(params)
    const url = `${this.prefix}${path}?${queryString}`
    const init = {
      headers: {
        'Authorization': `Bearer ${this.AuthToken()}`
      }
    }
    return fetch(url, init)
      .then(res => res.json())
  }

  AuthToken() {
    return window.localStorage.getItem(AUTH_KEY)
  }

  SetAuthToken(auth) {
    window.localStorage.setItem(AUTH_KEY, auth)
  }

  Connect() {
    this._openWebsocket()
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

export default new Hyperfox()
