const moment = require('moment')

module.exports = {
  timeTaken: (nanosecs) => {
    switch (true) {
      case nanosecs < 1e3:
        return `${nanosecs}ns`

      case nanosecs < 1e6:
        return `${Math.ceil(nanosecs/1e3)}µs`

      case nanosecs < 1e9:
        return `${Math.ceil(nanosecs/1e6)}ms`

      default:
        return `${Math.ceil(nanosecs/1e9)}s`
    }
  },

  timeAgo: (time) => {
    return moment(time).fromNow()
  },

  size: (bytes) => {
    switch (true) {
      case bytes < 1e3:
        return `${bytes}b`

      case bytes < 1e6:
        return `${Math.ceil(bytes/1e3)}Kb`

      case bytes < 1e9:
        return `${Math.ceil(bytes/1e6)}Mb`

      default:
        return `${Math.ceil(bytes/1e9)}Gb`
    }
  }
}
