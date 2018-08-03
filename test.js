const crawler = require('./crawler')
// https://www.zhihu.com/question/28202126/answer/47733159
const ids = [
  35846840,
  37709992,
  33644719,
  34243513,
  34078228,
  282657655,
  35255031,
  23147606,
  30182415,
  27284934,
  31005941,
  28202126,
  28560777,
  28586345,
  29134042
]
const wrapDirName = './imgs'

crawler({ dir: wrapDirName, id: '29134042' })