// pages/msg/index.js
var util = require('../../utils/ll.js');
var app = getApp();
Page({
  data:{},
  msg:function(){
    var that = this;
    util.req('msg/getall', { sk: app.globalData.sk }, function (data) {
     
      var zan = 0;
      var comment = 0;
      var notice = 0;
      if (data.data == null) {
        var data = { zan: zan, comment: comment, notice: notice };
        that.setData({ data: data });
        return false;      
      }
      data.data.forEach(function (item) {
        if (item.type == 'zan') {
          zan = item.count;
        }
        if (item.type == 'comment') {
          comment = item.count;
        }
        if (item.type == 'notice') {
          notice = item.count;
        }
      })
      var data = { zan: zan, comment: comment, notice: notice };
      that.setData({ data: data });
  })
  },
  msg2: function () {
    var that = this;
    util.req('msg/getall2', { sk: app.globalData.sk }, function (data) {
    
     
      var notice = 0;
      if (data.data == null) {
        var data = { notice: notice };
        that.setData({ data1: data });
        return false;
      }
      data.data.forEach(function (item) {
       
        if (item.type == 'notice') {
          notice = item.count;
        }
      })
      var data = { notice: notice };
      that.setData({ data1: data });
    
    })
   
  },
  onShow: function () {
    this.msg();
    this.msg2();
  },
  onPullDownRefresh: function () {
    this.msg();
    wx.stopPullDownRefresh();
  },

})