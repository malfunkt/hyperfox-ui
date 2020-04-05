const moment = require('moment')

module.exports = {
  timeTaken: (nanosecs) => {
    switch (true) {
      case nanosecs > 1e9:
        return Math.ceil(nanosecs/1e9) + 's'

      case nanosecs > 1e6:
        return Math.ceil(nanosecs/1e6) + 'ms'

      case nanosecs > 1e3:
        return Math.ceil(nanosecs/1e3) + 'µs'
    }
    return nanosecs + 'ns'
  },

  timeAgo: (time) => {
    return moment(time).fromNow()
  },

  size: (bytes) => {
    switch (true) {
      case bytes > 1e12:
        return Math.ceil(bytes/1e12) + 'Tb'

      case bytes > 1e9:
        return Math.ceil(bytes/1e9) + 'Gb'

      case bytes > 1e6:
        return Math.ceil(bytes/1e6) + 'Mb'

      case bytes > 1e3:
        return Math.ceil(bytes/1e3) + 'Kb'
    }
    return bytes + 'b'
  }
}
