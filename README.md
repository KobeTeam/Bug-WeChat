# Bug-WeChat
BUG是一款微信小游戏

# App.js
~~~
{
  "pages": [
    "pages/index/index",
    "pages/logs/logs",
    "pages/gift/gift",
    "pages/giftExch/giftExch"
  ],
  "window": {
    "navigationBarTitleText":"小强",//导航栏标题文字内容
    "navigationBarBackgroundColor": "#fff",//导航栏背景颜色，如"#000000"
    "navigationBarTextStyle": "black",//导航栏标题颜色，仅支持 black/white
    "navigationStyle":"default",//导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮
    "backgroundColor":"#fff",//窗口的背景色
    "backgroundTextStyle": "dark",//下拉背景字体、loading 图的样式，仅支持 dark/light
    "enablePullDownRefresh":false //是否开启下拉刷新
  },
  "networkTimeout":{
    "request": 10000,//http请求超时
    "connectSocket":10000,//socket请求超时
    "uploadFile":10000,//上传文件请求超时
    "downloadFile": 10000//下载文件请求超时
  },
  "debug":true //调试
}
~~~