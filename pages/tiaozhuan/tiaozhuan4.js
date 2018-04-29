// pages/tiaozhuan/tiaozhuan4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgalist: ['http://image.135editor.com/files/users/423/4238182/201804/fn8nKC3f_tOw5.png' 
    ],
     motto: 'Hello World',
    scrollId: 'red',
    isScrollX: true,
    bannerList: [
      {
        url: "../../images/banner_2.jpg"
      }

    ],
    activeBannerIndex: 0,
    userInfo: {}
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindChange: function (e) {
    this.setData({ activeBannerIndex: e.detail.current });
  },
  /** 
   * 预览图片var app = getApp()
   */
  previeimg: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  }  ,
   
  onLoad: function (options) {
  
  },
  previewImage:function(){},
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
  
  }
})