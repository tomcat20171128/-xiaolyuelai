var app = getApp();
var util = require('../../utils/ll.js');
var page = 1;
var playingID = -1;
var comment = new Array();
Page({
  data: {
    seecomment: false,
    reply: '',
    'data.id': 0,

    'shoucang': false,

  },
  onLoad: function (options) {
    var that = this;
   
    console.log(89555, options.fenid)
    that.setData({ kk: options.kk });
    that.setData({ fenid: options.fenid });
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
  person: function (e) {
    var that = this;
    if (e.currentTarget.id != -1) {
      wx.navigateTo({
        url: '/pages/person/index?uid=' + e.currentTarget.id
      })
    }
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
  
  


  getList: function () {
    var that = this;
    
    util.req('dynamic/getlist1', { page: page, fenid:that.data.fenid,kk: that.data.kk }, function (data) {
      console.log(89898, data)
      var list = data.list;

      var arr = new Array();
      list.forEach(function (item) {
        var li = {
          avatarUrl: item.avatarUrl,
          content: item.content,
          id: item.id,
          video: JSON.parse(item.video),
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

    

    })

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
    this.getList();
    this.getzan()
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
    console.log(963, e.target.dataset.id )
    this.setData({
      'reply': reply,
      'seecomment': true,
      'nowid': e.currentTarget.id,
      reid: e.target.dataset.id
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
      'reid':that.data.reid,
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