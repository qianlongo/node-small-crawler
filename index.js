const NodeSmallCrawler = require('./lib/crawler')
const defaultUrl = 'https://www.zhihu.com/question/66313867'
const defaultOutput = './imgs/'

module.exports = (url = defaultUrl, output = defaultOutput) => {
  return new NodeSmallCrawler(url, output)
}