const DEFAULT_API_PREFIX='http://10.0.0.88:8899'

class Hyperfox {
  constructor(props) {
    this.prefix = DEFAULT_API_PREFIX
  }

  _fetch(type, path, params) {
    return fetch(this.prefix + path)
      .then(res => res.json())
  }

  Pull(params) {
    return this._fetch('GET', '/pull', params)
  }
}

module.exports = new Hyperfox()
