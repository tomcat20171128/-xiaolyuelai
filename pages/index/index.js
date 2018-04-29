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
     'suo':true,
    'shoucang': false,
   
  },
  onLoad: function (options) {
   
    var that = this;
    wx.setNavigationBarTitle({ title: options.name })
    this.setData({ data: options.iid
    
    
     });
    util.req('fav/isfav', { iid: options.iid, sk: app.globalData.sk }, function (data) {
      if (data.status == 1) {
        that.setData({ 'shoucang': true });
      }
    })
   
  },
 
  add: function () {
    wx.navigateTo({
      url: '/pages/dynamic/add'
    })
  },
  details: function (e) {
    var that = this;
    wx.navigateTo({
      url: 'detail?kk=' + e.currentTarget.id +'&&fenid='+that.data.data
    })
  },
  person: function (e) {
    var that=this;
    if (e.currentTarget.id!=-1){
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
    console.log(65657, Commentdata[event.currentTarget.id].id)
    util.req('comment/zan', {
      'cid': Commentdata[event.currentTarget.id].id,
      'sk': app.globalData.sk
    }, function (data) {
      
      if (data.status == 1) {
        console.log(65657, event.currentTarget.id)
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
  zan2: function (event) {
    var that = this;
    var Commentdata = this.data.list;
   
    util.req('comment/zan2', {
    
      'sk': app.globalData.sk
    }, function (data) {
      console.log(65657, data)
      if (data.status == 1) {
       
      } else {
        console.log(data.msg);
      
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
  jkl:function(){

    var that = this;
    util.req('FeiLei/fenid', {  fenid: that.data.data }, function (data) {

      var jkl = data.data

      var arr = new Array();
      jkl.forEach(function (item) {
        var li = {
         
          img: JSON.parse(item.img),
    
          uid: item.fid,
          id: item.id
        }
        arr.push(li);
      })
      console.log(65656, arr)
      // if (arr.img.length==1){
      //   arr.img['w']=1
      // }else{
      //   arr.img['w'] = 0
      // }

 
      that.setData({ jkl: arr });
      })
  },
  add: function (e) {
    var _this = this;
    wx.showActionSheet({
      itemList: ['选择图文', '选择视频'],
      success: function (res) {
        //   console.log(res.tapIndex)
        let xindex = res.tapIndex;
        if (xindex == 0) {
          wx.navigateTo({
            url: '../dynamic/add?iid=' + _this.data.data
          })
        } else if (xindex == 1) {
          wx.navigateTo({
            url: '../photo/add-video?iid=' + _this.data.data
          })
        }

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

 getzan:function(){
   var that = this;
   
   util.req('comment/zan3', {

     'sk': app.globalData.sk
   }, function (data) {
    
     console.log(677778, data.data)
     that.setData({ list6: data.data });
     
   })

 },
  getList: function () {
    var that = this;
    wx.showLoading({

      title: '加载中',

      mask: true

    });
    util.req('dynamic/getlist3', { page: page, fenid: that.data.data, 'sk': app.globalData.sk }, function (data) {
      wx.hideLoading();
      
      
      var list = data.list;
      
      if (page == 1) {
        var arr = new Array();
      } else {
        var arr = that.data.list;
      }
      if (list!=null){
      list.forEach(function (item) {
        var li = {
          avatarUrl: item.avatarUrl,
          content: item.content,
          id: item.id,
          video: JSON.parse(item.video),
          videoj: JSON.parse(item.videoj),
          img:JSON.parse(item.img),
          nickName: item.nickName,
          weizhi: item.weizhi,
          time: util.getDateBiff(item.time * 1000),
          zan: item.zan,
          uid:item.uid,
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

  // videoPlay: function (obj) {
  //   console.log("playingID = " + playingID);
  //   console.log(754,obj);

  //   playingID = obj.currentTarget.id;
   
  //   //暂停音频的播放
  //   if (this.audioContext) {
  //     this.audioContext.pause();
  //   }
  //   //暂停上一条视频的播放
  //   if (this.videoContext) {
  //     console.log(89898,this.videoContext);
  //     this.videoContext.pause();
  //   }
  //   this.videoContext = wx.createVideoContext(obj.currentTarget.id);
  // },

  // //视频结束播放
  // videoEndPlay: function (obj) {
  //   this.videoContext.seek(0);
  // },


  onReady: function () {
   
  },
  onShow: function (options) {
 
    this.jkl()
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
    console.log(1212, that.data.list[that.data.nowid].id)
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