let path = require('path')
let fs = require('fs')
let request = require('request')
const rp = require('request-promise')
class Crawler {
  constructor ({ dir, questionId = '49364343', offset = 0, limit = 1, timeout = 10000 } = payload) {
    this.uri = `https://www.zhihu.com/api/v4/questions/${questionId}/answers?limit=${limit}&offset=${offset}&include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%3F%28type%3Dbest_answerer%29%5D.topics&sort_by=default`
    this.isEnd = false
    Object.assign(this, { questionId, offset, limit, timeout })
    this.filePath = `${dir}/${questionId}`
    this.getAnswers()
    // this.mkdirSync()
    // this.downloadImg()
  }

  async getAnswers () {
    try {
      const { paging, data: answers } = await rp({ uri: this.uri, json: true, timeout: this.timeout })
      const { is_end: isEnd, next: uri } = paging

      this.uri = uri
      this.answers = answers
      this.isEnd = isEnd
      console.log(this)
    } catch (error) {
      console.log(`获取questionId为:${this.questionId}的数据出错`)
      console.log(error)
    }
  }

  downloadImg () {
    let { offset, id } = this

    console.log(offset)
    this.getPicsUrl({ offset, id })
      .then((picsUrl) => {
        console.log('========')
        console.log(picsUrl)
        this.saveImg(picsUrl)

        setTimeout(() => {
          console.log('休息7秒钟')
          this.offset += 1
          this.downloadImg()
        }, 7000)
      }).catch((error) => {
        console.log('出错了')
        console.log(error)
      })
  }

  saveImg (picsUrl = [], cb) {
    picsUrl.forEach((picUrl) => {
      let fileName = path.basename(picUrl)

      request({
        uri: picUrl
      })
        .pipe(fs.createWriteStream(`${this.filePath}/${fileName}`))
        .on('close', () => {
          console.log(`${picUrl} 已经下载完成`)
        })
    })
  }

  mkdirSync () {
    let filePath = path.resolve(this.filePath)

    if (fs.existsSync(filePath)) {
      console.log(filePath + '目录已经存在')
    } else {
      fs.mkdirSync(filePath);
      console.log(filePath + '目录创建成功')
    }
  }

  getPicsUrl ({ id, offset = 1, limit = 20} = {}) {
    return (
      new Promise((resolve, reject) => {
        request({
          uri: `https://www.zhihu.com/api/v4/questions/${id}/answers?include=data%5B%2A%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Crelevant_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%3Bdata%5B%2A%5D.mark_infos%5B%2A%5D.url%3Bdata%5B%2A%5D.author.follower_count%2Cbadge%5B%3F%28type%3Dbest_answerer%29%5D.topics&sort_by=default&limit=${limit}&offset=${offset}`,
          json: true,
          timeout: 500
        }, (error, response, { data } = body) => {
          if (error) {
            reject(error)
          }

          if (!error && data) {
            resolve(this.filterPicsUrl(this.flattenContent(data)))
          }
        })
      })
    )
  }

  flattenContent (data) {
    return Array.isArray(data) && data.reduce((content, it = {}) => content + it.content, '') || ''
  }

  filterPicsUrl (imgStr) {
    let imgRe = /<img.*?(?:>|\/>)/gi
    let dataOriginRe = /data-original=[\'\"]?([^\'\"]*)[\'\"]?/i
    let matchImgs = imgStr.match(imgRe)
    let result = []

    if (matchImgs) {
      try {
        matchImgs.forEach((img) => {
          let dataOriginVal = img.match(dataOriginRe)
  
          if (dataOriginVal && dataOriginVal[1]) {
            result.push(dataOriginVal[1])
          }
        })
      } catch (error) {}
    }

    return Array.from(new Set(result))
  }  
}

module.exports = (payload = {}) => {
  return new Crawler(payload)
}