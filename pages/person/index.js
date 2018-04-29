//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/ll.js');
Page({
  data: {
    left: false,
    right: false,
    activeIndex: 0,
    'shoucang': false,
  },
  changeswiper: function (e) {
    var index = e.detail.current;
    if (index > this.data.activeIndex) {
      this.setData({
        left: true
      })
    } else if (index < this.data.activeIndex) {
      this.setData({
        right: true
      })
    }
    setTimeout(() => {
      this.setData({
        activeIndex: index,
        left: false,
        right: false
      })
    }, 1000);
  },
  liuyan:function(e){
   
    wx.navigateTo({
      url: '/pages/info/index?kl=' + e.currentTarget.id
    })
  },
  zan: function (even) {
    var that = this;
   
    console.log(6545, even.currentTarget.id)
    var Commentdata = that.data.list;
    util.req('comment/zanp', {
      'uid': that.data.uid,
      'sk': app.globalData.sk
    }, function (data) {
    
      if (data.status == 1) {
       
        that.zanzan();
        that.setData({ ll: data });
        
      } else {
        console.log(data.msg);
        wx.showModal({
          title: '提示',
          content: data.msg,
          showCancel: false,
          success: function (res) {
          }
        });
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
  zanzan:function(){
    var that=this;
    util.req('comment/zanzan', {
      'uid': that.data.uid,
      'sk': app.globalData.sk
    }, function (data) {
      console.log(7722, data)
     
        that.setData({ ll: data });

      } 
    )
  },
  shoucang: function () {
    var that = this;
    
    util.req('fav/addfav1', { iid: that.data.uid, sk: app.globalData.sk }, function (data) {
      if (data.status == 1) {
        that.setData({ 'shoucang': true });
        wx.showToast({
          title: '收藏成功',

          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  qxshoucang: function () {
    var that = this;

    util.req('fav/delfav1', { iid: that.data.uid, sk: app.globalData.sk }, function (data) {
      if (data.status == 1) {
        that.setData({ 'shoucang': false });
        wx.showToast({
          title: '取消收藏成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  getList: function () {
    var that = this;
    util.req('FeiLei/two', { ko: that.data.uid }, function (data) {
      var list = data.data;
      console.log(564, that.data.uid)
        var arr = new Array();
     if(list!=null){

      list.forEach(function (item) {
        var li = {

          id: item.id,
          img: JSON.parse(item.img),

          time: util.getDateBiff(item.time * 1000),

        }
        arr.push(li);
      })
      that.setData({ list: arr });
      console.log(7722, arr)
     }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  kongjian: function (e) {
    var uu = e.currentTarget.id
    wx.navigateTo({
      url: '../kongjian/kongjian?uu='+uu
    })
  },
  onShow: function () {
    
    this.zanzan();
    this.getList()
  },
  onLoad: function (options) {
    var that = this;
    console.log(89566, options.uid)
    that.setData({ uid: options.uid });
 
    
    util.req('fav/isfav1', { iid: options.uid, sk: app.globalData.sk }, function (data) {
      if (data.status == 1) {
        that.setData({ 'shoucang': true });
      }
    }) 
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/5a2b3948158e7b700327e702/getSwiList/swiList",
    //   success: (res) => {
    //     this.setData({
    //       // console.log(res);
    //       swiList: res.data.data.swiList
    //     })
    //   }
    // })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh: function () {
    
    this.getList();
    wx.stopPullDownRefresh();
  }
})