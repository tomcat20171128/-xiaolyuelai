// pages/photo/add-video.js
var app = getApp();
var util = require('../../utils/ll.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: false,
    size: 0,
    albumIndex: -1,
    albums: [],
    files: [], 
    files1: [],
    content: '',
    departure: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    console.log(895, options.iid)
    that.setData({ list: options.iid });
  },

  getList: function () {
    var that = this;
    util.req('FeiLei/zanzan2', { iid: that.data.list }, function (data) {
      console.log(895, data.data)
      that.setData({
        filess: data.data
      });
    })
  }

  ,
  sexDeparture: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          departure: res.address
        })
      }
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
  onShow: function (options) {
    this.getList();
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
   * 选择 / 拍摄视频
   * @author abei<abei@nai8.me>
   */
  addVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      compressed:true,
      success: function (res) {
        that.setData({
          video: res.tempFilePath,
          size: (res.size / (1024 * 1024)).toFixed(2)
        })
        wx.showLoading({

          title: '视频上传中',

          mask: true

        });



        wx.uploadFile({
          url: 'https://ywchn.cn/index.php/api/upload',
          method: 'POST',
          filePath: that.data.video,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'user': app.globalData.userInfo.id
          },
          success: function (res) {
            wx.hideLoading();

            var data = JSON.parse(res.data);
            console.log(data);
            if (data.status == 1) {
              that.setData({
                files: that.data.files.concat(data.data),
                files1: that.data.files.concat(data.data1)

              });
              util.clearError(that);
            } else {
              console.log(data.msg);
              util.isError(data.msg, that);
            }
          },
          fail: function () {
            util.isError('视频上传失败', that);
          }
        })





      }
    })
  },
  bindinput: function (e) {
    this.setData({ content: e.detail.value });
  },
  bindfocus: function () {
    util.clearError(this);
  },
  formSubmit: function (e) {
    var that = this;
    var desc = e.detail.value.desc;



    if (that.data.video == false) {
      wx.showModal({
        title: '珍珠助手',
        content: '请录制或选择一个小视频'
      })
      return false;
    }

    

    var content = that.data.content;

 
    util.req('dynamic/add', {
      'content': content,
      'video': JSON.stringify(that.data.files),
      'videoj': JSON.stringify(that.data.files1),
      "weizhi": that.data.departure,
      'img': JSON.stringify([]),
      'fenid': that.data.list,
      'sk': app.globalData.sk
    }, function (data) {
      if (data.status == 1) {
        wx.navigateBack({
          delta: 1
        })
      }
    })



  },






  bindPickerChange: function (e) {
    this.setData({
      albumIndex: e.detail.value
    })
  },
})