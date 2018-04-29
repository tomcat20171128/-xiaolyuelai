//app.js

var util = require('utils/ll.js');
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据
   
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    var _this = this;
   


    var that = this;
    //小程序初始化先判断用户是否登录    
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'sk',
          success: function (res) {
            var sk = res.data;
           
            
           
            util.req('user/vaild_sk', { "sk": sk }, function (data) {
              console.log(5155, data);

              if (data.status == 1) {
                that.globalData.sk = sk;
              } else {
                that.login();
                return;
              }
            })
           
          },
          fail: function () {
            that.login();
            return;
          }
        })

        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            that.globalData.userInfo = res.data;
          },
          fail: function () {
             that.login();
          }
        });
      },
      fail: function () {
        //登录态过期
        that.login() //重新登录
      }
    })


  },

  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (userinfo) {

            console.log(5151, userinfo);
            util.req('user/login', {
              "code": res.code,
              "encryptedData": userinfo.encryptedData,
              "iv": userinfo.iv
            }, function (data) {
              console.log(5151, res);
              console.log(5151, data);
              that.setUserInfo(data.user);
              that.setSk(data.sk);
            })
          },
          fail: function (res) {
            that.loginFail();
          }
        })
      }
    })
  },

  loginFail: function () {
    var that = this;
    wx.showModal({
      content: '登录失败，请允许获取用户信息,如不显示请删除小程序重新进入',
      showCancel: false
    });
    that.login();
  },
  setUserInfo: function (data) {   //将用户信息缓存保存
    this.globalData.userInfo = data;
    wx.setStorage({
      key: "userInfo",
      data: data
    })
  },
  setSk: function (data) {   //将用户信息缓存保存
    this.globalData.sk = data;
    wx.setStorage({
      key: "sk",
      data: data
    })
  },
  globalData: {
    userInfo: null,
    sk: null
  },



  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
  
})