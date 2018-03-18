//app.js
App({
  globalData: {
    sysNetWork:false,//后台系统网络是否联通
    wxNetWork:false,//微信网络是否联通

    initSpeed:0, //初始化进度/当前进度
    initPeedOK:4,//总进度值

    userInfo: null,//用户微信信息
    userOldInfo:null,//用户微信历史数据
    spray: 0, //喷雾剂 系统存储
    config:{}, //用户配置 本地缓存
    bugs: [], //小强配置 系统存储
    nowBug:1, //当前第几支小强 不存储
    newScore: 0, //当前/最后一句分数 本地缓存
    score: 0 //累计分数 系统存储
  },
  /**
   * 初始化函数
   */
  onLaunch: function (opt) {
    wx.showShareMenu({ withShareTicket: true })//开启转发获取 shareTicket

    wx.login({ //调用登录
      success: res => {
        if(res.code){
          this.globalData.wxNetWork = true; //wx网络通
          this.getUserSysInfo(res);
        }else{
          this.checkNetWork()
          console.log("获取用户登录态失败!"+res.errMsg)
        }
      },
      fail:res=>{
        this.checkNetWork()
        console.log("获取用户登录态失败" + res.errMsg)
      }
    })

    wx.getSetting({ //获取用户以往授权情况
      success:res =>{
        this.globalData.wxNetWork = true; //wx网络通
        if (res.authSetting['scope.userInfo']) {//已有用户信息获取授权
          this.getUserWxInfo()
        }else{//用户信息未授权
          wx.authorize({//发起授权
            scope: 'scope.userInfo',
            success:res=>{//已有用户信息获取授权
              this.getUserWxInfo()//获取微信数据
            },
            fail: res => { this.getAuthUserInfo() }//授权失败 引导授权
          })
        }
      },
      fail:res=>{//获取权限失败 可能是网络断开
        this.checkNetWork()
      }
    })

    this.getUserLocalInfo();//获取用户本地信息

  },
  onShow: function (opt){//展示程序回调
  },
  onHide: function () {//隐藏程序回调
  },
  onError: function (msg) {//错误回调
    console.log(msg)
  },
  /**
   * 引导设置用户信息权限
   */
  getAuthUserInfo:function(res){
    wx.showModal({
      title: '用户设置',
      content: res ? res.msg : '请打开用户信息',
      showCancel:false,
      success:res=>{
        if(res.confirm){
          wx.openSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                this.getUserWxInfo()
              }else{
                res.msg = "只有打开用户信息，才能记录您的分数哟"
                this.getAuthUserInfo(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   * 获取微信用户信息
   */
  getUserWxInfo:function(){
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo;
        this.globalData.userOldInfo = res.userInfo;
        wx.setStorage({ //将当期用户存入缓存
          key: 'userOldInfo',
          data: res.userInfo
        })
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userWxInfoReadyCb) {this.userWxInfoReadyCb();}
      },
      fail: res => {
        this.checkNetWork()
      }
    });
    
    
  },

  /**
   * 获取用户后台信息
   */
  getUserSysInfo: function (res){
    wx.request({ //发送到小程序后台 获取用户全部数据
      url: 'https://no2.so/userLogin',
      method: 'POST',
      data: {
        code: res.code
      },
      success: res => {
        this.globalData.sysNetWork = true; //小程序后台通
        var data = res.data;
        var state = data.status; //请求响应状态
        var msg = data.msg; //响应说明
        this.globalData.spray = data.spray ? data.spray:10;//喷雾剂数目
        this.globalData.bugs = data.bugs ? data.bugs:null;//小强配置
        this.globalData.score = data.score ? data.score:400;//累计分数
        this.initSpeed();
      },
      fail: res => {
        this.globalData.sysNetWork = false; //小程序后不通台通
        console.log("小程序后台不通");
      }
    })
  },

  /**
   * 获取用户本地信息
   */
  getUserLocalInfo:function(){
    wx.getStorage({ //获取用户配置信息 异步
      key: 'config',
      success: res => {
        if (res.data) {
          this.globalData.config = res.data;
        }
      },
      complete:res=>{
        this.initSpeed();
      }
    });
    wx.getStorage({ //获取当前/最后一句分数 异步
      key: 'newScore',
      success: res => {
        if (res.data) {
          this.globalData.newScore = res.data;
        }
      },
      complete: res => {
        this.initSpeed();
      }
    });
    wx.getStorage({ //获取历史用户数据 异步
      key: 'userOldInfo',
      success: res => {
        if (res.data) {
          this.globalData.userOldInfo = res.data;
          if (this.loadUserOldInfo) { this.loadUserOldInfo();}
        }
      }
    });
  },

  /**
   * 计算初始化进度
   */
  initSpeed:function(){
    this.globalData.initSpeed++;
    if (this.globalData.initSpeed == this.globalData.initPeedOK){
      this.globalData.initSpeed=-1;
      if (this.userAllInfoReadyCb) {this.userAllInfoReadyCb()}
    }
  },

  /**
   * 检查网络，并提示
   */
  checkNetWork:function(){
    this.globalData.wxNetWork = false; //wx网络未通
    wx.showModal({
      content:'请检查网络',
      showCancel: false,
      success: res => {
        if (res.confirm) {}
      }
    })
  }
})