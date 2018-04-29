// pages/membercenter/quanbu.js
const util = require("../../utils/ll.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  zaima: function (e) {
    var id = e.currentTarget.id;

    var name = e.target.dataset.name;
    console.log(7894156, name)
    wx.navigateTo({
      url: "../../pages/index/index?iid=" + id + "&name=" + name

    })
  },
  getList2: function () {
    var that = this;
    util.req('FeiLei/zanzan1', {}, function (data) {
      console.log('***', data)
      var list = data.data;
      that.setData({
        dataList: list
      });

    })
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
  this.getList2()
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
  
  }
})