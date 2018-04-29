const util = require("../../utils/ll.js");
var app = getApp();
var page = 1;
Page({

    data:{
        dataList: [],


 


    },
    zaima: function (e) {
      var id = e.currentTarget.id;
     
      var list = this.data.dataList;

      var name = list[e.target.dataset.id].name;
      console.log(7894156, name)
      wx.navigateTo ({
        url: "../../pages/index/index?iid="+id+"&name="+name

      })
    },
    zaima1: function (e) {
      var id = e.currentTarget.id;

     

      var name = e.target.dataset.name;
      console.log(7894156, name)
      wx.navigateTo({
        url: "../../pages/index/index?iid=" + id + "&name=" + name

      })
    },

    getList: function(){
      var that = this;
      util.req('fav/myFav', { sk: app.globalData.sk, page: page }, function (data) {
        console.log('kkkk123', data);
        that.setData({
          pp: data.data
        });

      })
    },
    getList1: function () {
      var that = this;
      wx.getStorage({
        key: 'sk',
        success: function (res) {
          var sk = res.data;
      
      util.req('fav/myFav', { sk:sk, page: page }, function (data) {
        console.log('kkkk222', data);
        that.setData({
          pp: data.data
        });

      })
        }

      })
    },
    getList2: function () {
      var that = this;
      util.req('FeiLei/zanzan', {  }, function (data) {
       console.log('***',data)
        var list = data.data;
       
      
        that.setData({
             dataList: list
          
           });

      })},
      quanbu:function(e){
        wx.navigateTo({
          url: "quanbu"

        })

      },
    // onLoad: function (options) {
    //   var that = this
     
    //   wx.request({
    //     url: 'http://localhost/pinche/index.php/Api/FeiLei/fenlei',
    //     data: {

    //     },
    //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     header: { 'content-type': 'application/json' }, // 设置请求的 header
    //     success: function (res) {
    //       that.setData({
    //         dataList: res.data.square_list
    //       });
    //       console.log(64351354, res.data.square_list)
    //       setTimeout(function () {
            
    //         wx.stopPullDownRefresh();
    //       }, 1000);

    //     },
    //     fail: function (res) {
    //       // fail
    //       pageNo--;
    //     },
    //     complete: function (res) {
    //       // complete
    //       wx.stopPullDownRefresh()
    //     }
    //   })

    // },
  onLoad: function (options) {
 
   
    this.getList2();
  },
    onShow: function () {
      page = 1;
      var that=this
      this.getList1();
     
      setTimeout(function () {
        that.getList();
        wx.stopPullDownRefresh();
      },1500);
      
    },
   onPullDownRefresh: function () {
      page = 1;
      this.getList();
     
      this.getList2();
      wx.stopPullDownRefresh();
    }

});