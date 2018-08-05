# node-small-crawler

> 一个可以从知乎上下载图片的小工具

# 开始前

> 请确认你已经安装了nodejs


# clone并且安装依赖

```
git clone https://github.com/qianlongo/node-small-crawler.git
cd node-small-crawler && npm install

```

# 跑起来

> 打开index.js,你会看到这段代码

``` javascript
require('./crawler')({
  dir: './imgs', // 图片需要存放的位置
  questionId: '34078228', // 想要下载的知乎问题id，比如https://www.zhihu.com/question/49364343/answer/157907464，输入49364343即可
  proxyUrl: 'https://www.zhihu.com' // 当请求知乎的数量达到一定的阈值的时候，会被知乎认为是爬虫（好像是封ip），这时如果你如果有一个代理服务器来转发请求数据，便又可以继续下载了。
})

```

> npm run start, 接下来就可以从控制台看到不断地在下载图片了。




![](http://odssgnnpf.bkt.clouddn.com/aaaa.png)
![](http://odssgnnpf.bkt.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-01-08%2023.06.55.png)
