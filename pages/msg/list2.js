// pages/msg/list.js
var util = require('../../utils/ll.js');
var app = getApp();
var id = 0;
var page = 1;
var arr = new Array();
Page({
  data: {},
  
  getList2: function () {
    var that = this;
    wx.showLoading({

      title: '加载中',

      mask: true

    });
    util.req('msg/get2', { type1:'notice',sk: app.globalData.sk, page: page }, function (data) {
      wx.hideLoading();
      console.log('sdfsd',data)
      if (data.data == null) {
        that.setData({ 'isnull': true, 'nomore': true });
        return false;
      }
      if (page == 1) {
        arr = new Array();
      }

      data.data.forEach(function (item) {
        arr.push({

          content: item.content,
          url: item.url,
        })
      })

      that.setData({ 'msg1': arr });
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
 
   
    this.getList2();
  },
  onPullDownRefresh: function () {
    page = 1;
   
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    if (!this.data.nomore) {
      page++;
     
    }
  }



})