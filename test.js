const path = require('path')
const crawler = require('./crawler')

const ids = [
  35846840,
  37709992,
  33644719,
  34243513,
  34078228,
  282657655
]
const wrapDirName = './imgs'

crawler({ dir: wrapDirName, id: '282657655' })