const request = require('request')
const fs = require('fs')

request
  .get('https://pic1.zhimg.com/2b5163384bbca2b299e84e913ece8965_xs.jpg')
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('doodle.png'))