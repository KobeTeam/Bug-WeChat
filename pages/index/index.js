//index.js
// 主页面 含游戏主体内容

var common = require('../../utils/common.js')
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的数据
   */
  data: {
    spray: 0, //喷雾剂
    config: {}, //用户配置
    bugs: [], //小强配置
    nowBug: 1, //当前第几支小强
    newScore: 0, //当前/最后一句分数
    score: 0 //累计分数
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 赠送喷雾剂
   */
  bindGiveAway:function(){

  },

  /**
   * 跳转到礼物页面
   */
  bindGift:function(){

  },

  /**
   * 邀请按钮
   */
  bindInvite: common.bindInvite(),
  /**
   * 声音开关
   */
  bindSound:function(){ 

  },

  /**
   * 查看成绩
   */
  bindScore:function(){

  },
  
  /**
   * 开始游戏
   */
  bindStartGame:function(){

  }
  /**
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
   */
})
