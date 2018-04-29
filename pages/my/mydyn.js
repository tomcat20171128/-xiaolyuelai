var app = getApp();
var util = require('../../utils/ll.js');
var page = 1;
var playingID = -1;
var comment = new Array();
var list = new Array();
Page({
  data: {
    seecomment: false,
    reply: '',
    'data.id': 0,

    'shoucang': false,

  },
  onLoad: function (options) {
    var that = this;
    this.setData({ uu: options.uu });

    console.log(895, options.iid)
    this.setData({ data: options.iid });
    util.req('fav/isfav', { iid: options.iid, sk: app.globalData.sk }, function (data) {
      if (data.status == 1) {
        that.setData({ 'shoucang': true });
      }
    })
   
  },
  getzan: function () {
    var that = this;

    util.req('comment/zan3', {

      'sk': app.globalData.sk
    }, function (data) {

      console.log(677778, data.data)
      that.setData({ list6: data.data });

    })

  },
  del: function (e) {
    var that = this;
    var currentTarget = e.currentTarget.id;
    console.log(6542, e.currentTarget.id)
    wx.showModal({
      title: '提示',
      content: '确定删除?',
      success: function (res) {
        if (res.confirm) {
          util.req('info/del1', { sk: app.globalData.sk, id: e.currentTarget.id }, function (data) {
            if (data.status == 1) {
              list.splice(currentTarget, 1);
              that.setData({ list: list });
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              }),
              that.getList()
            } else {
              util.isError('删除失败,请重试', that);
              return false;
            }
          })
        }
      }
    })
    return false;
  },
  add: function () {
    wx.navigateTo({
      url: '/pages/dynamic/add'
    })
  },
  details: function (e) {

    wx.navigateTo({
      url: 'detail?kk=' + e.currentTarget.id
    })
  },
  person: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/person/index?uid=' + e.currentTarget.id
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
  zan: function (event) {
    var that = this;
    var Commentdata = this.data.list;
    util.req('comment/zan', {
      'cid': Commentdata[event.currentTarget.id].id,
      'sk': app.globalData.sk
    }, function (data) {
      console.log(7722, data)
      if (data.status == 1) {
        Commentdata[event.currentTarget.id].zan = data.zan;
        Commentdata[event.currentTarget.id].iszan = true;

        that.setData({ list: Commentdata });
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
  shoucang: function () {
    var that = this;

    util.req('fav/addfav', { iid: that.data.data, sk: app.globalData.sk }, function (data) {
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

    util.req('fav/delfav', { iid: that.data.data, sk: app.globalData.sk }, function (data) {
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
  add: function (e) {
    var _this = this;
    wx.showActionSheet({
      itemList: ['选择图片', '选择视频'],
      success: function (res) {
        //   console.log(res.tapIndex)
        let xindex = res.tapIndex;
        if (xindex == 0) {
          wx.navigateTo({
            url: '../dynamic/add'
          })
        } else if (xindex == 1) {
          wx.navigateTo({
            url: '../photo/add-video'
          })
        }

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },


  getList: function () {
    var that = this;
    wx.showLoading({

      title: '加载中',

      mask: true

    });
    util.req('dynamic/getList', { page: page, sk: app.globalData.sk }, function (data) {
      wx.hideLoading();
      var list = data.list;

      if (page == 1) {
        var arr = new Array();
      } else {
        var arr = that.data.list;
      }
      if(list!=null){
      list.forEach(function (item) {
        var li = {
          avatarUrl: item.avatarUrl,
          content: item.content,
          id: item.id,
          video: JSON.parse(item.video),
          videoj: JSON.parse(item.videoj),
          weizhi: item.weizhi,
          img: JSON.parse(item.img),
          nickName: item.nickName,
          time: util.getDateBiff(item.time * 1000),
          zan: item.zan,
          uid: item.uid,
          comments: item.comment
        }
        arr.push(li);
      })
      console.log(89898, arr)
      // if (arr.img.length==1){
      //   arr.img['w']=1
      // }else{
      //   arr.img['w'] = 0
      // }

      that.setData({ list: arr });
      }
    })

  },
  onReady: function () {
    this.getList()
  },
  // videoPlay: function (obj) {
  //   console.log("playingID = " + playingID);
  //   console.log(754, obj);

  //   playingID = obj.currentTarget.id;

  //   //暂停音频的播放
  //   if (this.audioContext) {
  //     this.audioContext.pause();
  //   }
  //   //暂停上一条视频的播放
  //   if (this.videoContext) {
  //     console.log(89898, this.videoContext);
  //     this.videoContext.pause();
  //   }
  //   this.videoContext = wx.createVideoContext(obj.currentTarget.id);
  // },

  // //视频结束播放
  // videoEndPlay: function (obj) {
  //   this.videoContext.seek(0);
  // },



  onShow: function (options) {
    this.getzan()
    this.onPullDownRefresh();
  },
  onReachBottom: function () {
    if (!this.data.nomore) {
      page++;
      this.getList();
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
    util.req('comment/add', {
      'iid': that.data.list[that.data.nowid].id,
      'reply': (that.data.reply).replace('回复', ''),
      'type': 'dynamic',
      'content': e.detail.value,
      'sk': app.globalData.sk
    }, function (data) {
      if (data.status == 1) {
        var list = that.data.list;
        list[that.data.nowid].comments = (list[that.data.nowid].comments) ? list[that.data.nowid].comments : (new Array());
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