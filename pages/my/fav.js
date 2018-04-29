// pages/my/list.js
var app = getApp();
var util = require('../../utils/ll.js');
var page = 1;
var list = new Array();
Page({
  data:{
  tabs: ["全部", "车找人", "人找车"]
  },
  del:function(e){
    var that = this;
    var currentTarget = e.currentTarget.id;
    wx.showModal({
      title: '提示',
      content: '取消收藏?',
      success: function(res) {
        if (res.confirm) {
          util.req('fav/delFav',{sk:app.globalData.sk,iid:list[currentTarget].id},function(data){
            if(data.status == 1){
              list.splice(currentTarget,1);
              that.setData({list:list});
              wx.showToast({
                title: '取消收藏成功',
                icon: 'success',
                duration: 2000
              })
            }else{
                util.isError('取消收藏失败,请重试', that);
                return false;
            }
          })
        }
      }
    })
    return false;
  },
  jkl: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/person/index?uid=' + e.currentTarget.id
    })
  },
  onReachBottom:function(){
    if(!this.data.nomore){
      page++;
      this.getList();
    }
  },
  getList(){
    var that = this;
    util.req('fav/myFav1',{sk:app.globalData.sk,page:page},function(data){
     console.log('kljl',data,data)
      if(data.data !== null){
        that.setData({ list: data.data });

        } 

        
      
    })
  },  
  onPullDownRefresh: function(){
    page = 1;
    this.getList();
    wx.stopPullDownRefresh();
  },
  onShow:function(){
    page = 1;
    this.getList();
  }
})