const request = require('request')
const fs = require('fs')

request
  .get('https://pic1.zhimg.com/80/v2-930893744da21a9846a01db821faac90_hd.jpg')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('doodle.png'))