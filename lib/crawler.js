const https = require('https')
const path = require('path')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

class Crawler {
  constructor (url, output) {
    this.url = url
    this.output = output

    this.downloadImgs()
  }

  // 下载图片到本地
  downloadImgs () {
    
  }

  // 生成存储图片的文件目录
  genImgsDirectory (directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdir(directory, (error) => {
        console.log(error || `文件目录：${directory} 创建成功`)
      })
    }
  }
}

module.exports = Crawler