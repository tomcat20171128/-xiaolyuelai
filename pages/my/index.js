//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/ll.js');

Page({
  onShow: function () {
    var that = this;
    that.setData({
      userInfo:app.globalData.userInfo
    });

    util.req('FeiLei/mycount',{sk:app.globalData.sk},function(data){
      that.setData({infoCount:data.data});
    })

    util.req('appointment/mycount', { sk: app.globalData.sk }, function (data) {
      that.setData({ appointmentCount: data.data });
    })

    

  },
  open:function(e){
    var that=this
    var kl=e.currentTarget.id
    wx.navigateTo({
      url: '/pages/info/index?kl=' + kl 
    })
  },
  getCount1: function () {
    var that = this;
    util.req('FeiLei/one', { sk: app.globalData.sk }, function (data) {  
      console.log(666, data.data)
      that.setData({ data1: data.data });
    })
  },
  onShow: function () {
  
    this.getCount1();
    
  },
  onLoad:function(){
    this.getCount1();
  },
   onPullDownRefresh: function () {
     
     app.login();
    wx.stopPullDownRefresh();
  }
})
