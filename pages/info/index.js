var app = getApp();
var util = require('../../utils/ll.js');
var page = 1;
Page({
  data: {
    seecomment: false,
    reply: ''
  },
  add: function () {
    var that=this
    console.log(564, that.data.kl)
    wx.navigateTo({
      url: '/pages/comment/index?kl='+that.data.kl
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
  getList: function () {
    var that = this;
    wx.showLoading({

      title: '加载中',

      mask: true

    });
    util.req('dynamic/getList4', { page: page, kl: that.data.kl, sk: app.globalData.sk }, function (data) {
      var list = data.list;
      wx.hideLoading();
      if (page == 1) {
        var arr = new Array();
      } else {
        var arr = that.data.list;
      }
      if (list != null) {
      list.forEach(function (item) {
        var li = {
          avatarUrl: item.avatarUrl,
          content: item.content,
          id: item.id,
          img: JSON.parse(item.img),
          nickName: item.nickName,
          time: util.getDateBiff(item.time * 1000),
          zan: item.zan,
          comments: item.comment,
          uid:item.uid,
          kl:item.kl
        }
        arr.push(li);
      })
      that.setData({ list: arr });
      console.log(65351, list)
      }
    })
  },

  jj:function(e){
    var that=this
    util.req('dynamic/de', {  sk: app.globalData.sk }, function (data) {
         
      that.setData({ de: data });
    })
  },
  del: function (e) {
    var that = this;
   
    var list = that.data.list;
    console.log(89533, this.data.de)
    var uid = this.data.de;
    var kl = that.data.kl;
    if(uid==kl){
      wx.showModal({
        title: '删除提示',
        content: '确定删除?',
        success: function (res) {
          if (res.confirm) {
            var list = that.data.list;

            var id = list[e.target.dataset.id].id;
            util.req('dynamic/del1', { id: id, sk: app.globalData.sk }, function (data) {
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
    }else{
      wx.showModal({
        title: '删除提示',
        content: '确定删除?',
        success: function (res) {
          if (res.confirm) {
            var list = that.data.list;

            var id = list[e.target.dataset.id].id;
            util.req('dynamic/del', { id: id, sk: app.globalData.sk }, function (data) {
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
    }
 
  },
  onLoad: function (options) {
    
   
    this.setData({ kl: options.kl });
    this.getList();
  },
  onReachBottom: function () {
    if (!this.data.nomore) {
      page++;
      this.getList();
    }
  },
  info:function(){
   var that=this

   util.req('FeiLei/mycount', { sk: app.globalData.sk }, function (data) {
     that.setData({ infoCount: data.data });
   })
  },
  getCount1: function () {
    var that = this;
    util.req('FeiLei/three', { kl: that.data.kl }, function (data) {  //获取评论总数
      console.log(666, data.data)
      that.setData({ data1: data.data });
    })
  },
  onReady: function () {
    this.getList()
  },
  onShow: function () {
    page = 1;
    this.getCount1();
    this.getList();
    this.jj();
    if (this.data.data) {
      this.getCount(this.data.data.id);

      this.getComment(this.data.data.id);
    }
  },
  seecomment: function (e) {
    console.log(e);
    var reply = (!e.target.dataset.name) ? '' : '回复' + e.target.dataset.name;
    this.setData({
      'reply': reply,
      'seecomment': true,
      'nowid': e.currentTarget.id
    });
  },
  comment: function (e) {
    var that = this;
    var content = e.detail.value;
    if (content == '') {
      return false;
    }
    util.req('comment/add2', {
      'iid': that.data.list[that.data.nowid].id,
      'reply': (that.data.reply).replace('回复', ''),
      'type': 'dynamic',
      'content': e.detail.value,
      'sk': app.globalData.sk
    }, function (data) {
      that.getList();
      if (data.status == 1) {
        var list = that.data.list;
       
        list[that.data.nowid].comments.unshift({ id: data.id, iid: that.data.list[that.data.nowid].id, content: e.detail.value, nickName: app.globalData.userInfo.nickName, reply: (that.data.reply).replace('回复', '') })
      }
     
      that.setData({ list: list });
     
    })
    
  },
  hidecomment: function () {
    this.setData({ 'seecomment': false });
  },
  onPullDownRefresh: function () {
    page = 1;
    this.getList();
    wx.stopPullDownRefresh();
  }
})