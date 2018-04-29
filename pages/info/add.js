// pages/info/add.js
var app = getApp();
var util = require('../../utils/ll.js');
var page = 1;
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
    this.getList() 
  },
  add: function () {
    var that = this
    console.log(564, that.data.kl)
    wx.navigateTo({
      url: '/pages/geren/index'
    })
  },
  getCount1: function () {
    var that = this;
    util.req('FeiLei/one', { sk: app.globalData.sk }, function (data) {  //获取评论总数
      console.log(666, data.data)
      that.setData({ data1: data.data });
    })
  },
  getList: function () {
    var that = this;
    wx.showLoading({

      title: '加载中',

      mask: true

    });
    util.req('FeiLei/two2', { page: page, sk: app.globalData.sk }, function (data) {
      var list = data.data;
      wx.hideLoading();
      if (page == 1) {
        var arr = new Array();
      } else {
        var arr = that.data.list;
      }
      if (list != null) {
      list.forEach(function (item) {
        var li = {
         
          id: item.id,
          img: JSON.parse(item.img),
          
          time: util.getDateBiff(item.time * 1000),
          
        }
        arr.push(li);
      })
      that.setData({ list: arr });
      }
    })
  },
  del: function (e) {
    var that = this;
    wx.showModal({
      title: '删除提示',
      content: '确定删除?',
      success: function (res) {
        if (res.confirm) {
          var list = that.data.list;
          var id = list[e.target.dataset.id].id;
          util.req('dynamic/del2', { id: id, sk: app.globalData.sk }, function (data) {
            if (data.status == '1') {
              list.splice(e.target.dataset.id, 1);
              console.log(list);
              that.setData({ list: list });
              wx.showToast({
                title: '删除成功',
              })
            } else {
              util.isError(data.msg, that);
            }
          })
        }
      }
    })
  },
  previeimg: function (e) {
    var that = this;
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.id,
      urls: that.data.list[e.currentTarget.dataset.name].img
    })
  },
  onShow: function () {
    page = 1;
    this.getCount1();
    this.getList();

    if (this.data.data) {
      this.getCount(this.data.data.id);

      this.getComment(this.data.data.id);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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
   onPullDownRefresh: function () {
  
    this.getList();
    wx.stopPullDownRefresh();
  }
})