const DEFAULT_API_PREFIX='http://10.0.0.88:8899'
const DEFAULT_WS_PREFIX='ws://10.0.0.88:8899/ws'

let W3CWebSocket = require('websocket').w3cwebsocket

class Hyperfox {
  constructor(props) {
    this.prefix = DEFAULT_API_PREFIX

    this._wsOnmessage = () => {}
    this._openWebsocket()
  }

  _openWebsocket() {
    let ws = new W3CWebSocket(DEFAULT_WS_PREFIX);

    ws.onopen = (e) => {
      if (e.data) {
        console.log('OPEN WS', JSON.parse(e.data))
      }
    }

    ws.onmessage = (e) => {
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
    return fetch(this.prefix + path)
      .then(res => res.json())
  }

  Subscribe(callback) {
    this._wsOnmessage = callback
  }

  Pull(params) {
    return this._fetch('GET', '/pull', params)
  }
}

module.exports = new Hyperfox()
