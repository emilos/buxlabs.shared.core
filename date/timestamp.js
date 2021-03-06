function timestamp (date, pattern = 'YYYY-MM-DD') {
  function method (key) {
    return ({
      YYYY: ['getFullYear', 4],
      YY: ['getFullYear', 2],
      MM: ['getMonth', 2, 1],
      DD: ['getDate', 2],
      HH: ['getHours', 2],
      mm: ['getMinutes', 2],
      ss: ['getSeconds', 2],
      ms: ['getMilliseconds', 3]
    })[key]
  }
  function assign () {
    const regex = /(?=(YYYY|YY|MM|DD|HH|mm|ss|ms))\1([:/]*)/
    const match = regex.exec(pattern)

    if (match) {
      const increment = method(match[1])
      const val = '00' + String(date[increment[0]]() + (increment[2] || 0))
      const res = val.slice(-increment[1]) + (match[2] || '')
      pattern = pattern.replace(match[0], res)
      assign()
    }
  }

  assign(pattern)
  return pattern
}

module.exports = timestamp
