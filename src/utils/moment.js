import moment from 'moment'

const _moment = moment

console.log(_moment.langData('en')._relativeTime.s)

_moment.updateLocale('en', {
  relativeTime: {
    future: "just now",
    past:   "%s ago",
    s  : '%ds',
    ss : '%d seconds',
    m:  "a minute",
    mm: "%d minutes",
    h:  "an hour",
    hh: "%d hours",
    d:  "a day",
    dd: "%d days",
    M:  "a month",
    MM: "%d months",
    y:  "a year",
    yy: "%d years"
  }
})

export default _moment
