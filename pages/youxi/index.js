//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    scrollId : 'red',
    isScrollX: true,
    
    bannerList  : [
      {
        url :　"../../images/banner_1.jpg"
      }
      
    ],
    activeBannerIndex : 0,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindChange : function(e){
      this.setData({activeBannerIndex : e.detail.current});
  },
  youxi: function (e) {
    var id=  e.currentTarget.id
    console.log('sdfjsd',id)
    if(id==1){
      wx.navigateTo({
        url: '../tiaozhuan/tiaozhuan'
      })


    }else if(id==2){
      wx.navigateTo({
        url: '../tiaozhuan/tiaozhuan1'
      })
    }
    else if (id == 3) {
      wx.navigateTo({
        url: '../tiaozhuan/tiaozhuan2'
      })
    }
    else if (id == 4) {
      wx.navigateTo({
        url: '../tiaozhuan/tiaozhuan3'
      })
    }
  },
  onLoad: function (options) {
    
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
   
  }



  


 
})
