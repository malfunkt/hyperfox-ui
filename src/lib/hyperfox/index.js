const W3CWebSocket = require('websocket').w3cwebsocket
const qs = require('qs')

const QUERY_PARAMS = qs.parse(window.location.search, {ignoreQueryPrefix: true})

const HOSTNAME = () => {
  const hostname = QUERY_PARAMS['source'] || window.localStorage.getItem('source') || window.location.hostname
  window.localStorage.setItem('source', hostname)
  return hostname
}

const DEFAULT_API_PREFIX=`http://${HOSTNAME()}`
const DEFAULT_WS_PREFIX=`ws://${HOSTNAME()}/live`

const STATUS_DISCONNECTED   = 0
const STATUS_FAILURE        = 1
const STATUS_CONNECTING     = 2
const STATUS_CONNECTED      = 3

const MESSAGE_TYPE_STATUS   = 0
const MESSAGE_TYPE_ERROR    = 1
const MESSAGE_TYPE_DATA     = 2

const MAX_RETRIES           = 20

const AUTH_KEY = 'auth'

class Hyperfox {

  get STATUS_DISCONNECTED() {
    return STATUS_DISCONNECTED
  }

  get STATUS_FAILURE() {
    return STATUS_FAILURE
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
    this._retries = 0

    this._wsOnmessage = () => {}
  }

  _openWebsocket() {
    let ws = new W3CWebSocket(DEFAULT_WS_PREFIX + `?auth=${this.AuthToken()}`);
    this._retries++

    this._wsOnmessage({
      type: MESSAGE_TYPE_STATUS,
      data: STATUS_CONNECTING
    })

    ws.onopen = (e) => {
      this._retries = 0
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
      if (this._retries < MAX_RETRIES) {
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
      } else {
        this._wsOnmessage({
          type: MESSAGE_TYPE_STATUS,
          data: STATUS_FAILURE
        })
      }
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
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return res.json()
        }
        throw new Error('Failed to connect to backend')
      })
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

  SignURL(url) {
    return `${url}?auth=${this.AuthToken()}`
  }

  RecordRequestEmbedURL(uuid) {
    return this.SignURL(`${this.prefix}/records/${uuid}/request/embed`)
  }

  RecordRequestWireURL(uuid) {
    return this.SignURL(`${this.prefix}/records/${uuid}/request/raw`)
  }

  RecordRequestURL(uuid) {
    return this.SignURL(`${this.prefix}/records/${uuid}/request`)
  }

  RecordResponseEmbedURL(uuid) {
    return this.SignURL(`${this.prefix}/records/${uuid}/response/embed`)

  }

  RecordResponseWireURL(uuid) {
    return this.SignURL(`${this.prefix}/records/${uuid}/response/raw`)
  }

  RecordResponseURL(uuid) {
    return this.SignURL(`${this.prefix}/records/${uuid}/response`)
  }

  GetRecordMeta(uuid) {
    return this._fetch('GET', `/records/${uuid}`, {})
  }

  Records(params) {
    return this._fetch('GET', '/records', params)
  }
}

export default new Hyperfox()
