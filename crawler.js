var https = require('https'),
    request = require('request'),
    cheerio = require('cheerio'),
    path = require('path'),
    fs = require('fs'),
    // ,url = 'https://www.zhihu.com/question/35846840'; 汉服
    // ,url = 'https://www.zhihu.com/question/37709992'; // 长得好看
    // ,url = 'https://www.zhihu.com/question/33644719'; // 校花
    // ,url = 'https://www.zhihu.com/question/34243513'; // 你见过最漂亮的女生长什么样？
    // ,url = 'https://www.zhihu.com/question/34078228'; // 发一张你认为很漂亮的美女照片
    defaultUrl = 'https://www.zhihu.com/question/34243513'; // 发一张你认为很漂亮的美女照片
    url = process.argv[2];

let app = {
  init (url) {
    this.filePath = this.generateFilePath(this.parseFileName(url));
    this.getAllHtml(url, this.filterHtml);
  },
  getAllHtml (url, callback) {
    let sHtml = '',
        _this = this;
    https.get(url, (res) => {
      res.on('data', (data) => {
        sHtml += data;
      });
      res.on('end', () => {
        callback.bind(_this, sHtml)();
      })
    }).on('error', (err) => {
      console.log(err);
    });
  },
  filterHtml (sHtml, filePath) {
    let $ = cheerio.load(sHtml),
        $Imgs = $('img'),
        imgData = [],
        _this = this;
        
      $Imgs.each((i, e) => {
        let imgUrl = $(e).attr('src');

        imgData.push(imgUrl);
        _this.downloadImg(imgUrl, _this.filePath, function (err) {
          console.log(imgUrl + 'has be down');
        });
      });
      console.log(imgData);
  },
  parseFileName (fileName) {
    return path.basename(fileName);
  },
  generateFilePath (path) {
    if (fs.existsSync(path)) {
      console.log(path + '目录已经存在');
    } else {
      fs.mkdirSync(path);
      console.log(path + '目录创建成功');
    }
    return path;
  },
  downloadImg (imgUrl, filePath, callback) {
    let fileName = this.parseFileName(imgUrl);
    request(imgUrl).pipe(fs.createWriteStream('./' + filePath + '/'+fileName)).on('close', callback && callback);
  }
};
app.init(url || defaultUrl);

