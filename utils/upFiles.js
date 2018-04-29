

var chooseImage = (t, count) =>{
    wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],


        
        success: (res) => {
            var imgArr = t.data.upImgArr || [];
            let arr = res.tempFiles;
            // console.log(res)
            arr.map(function(v,i){
                v['progress'] = 0;
                imgArr.push(v)
            })
            t.setData({
                upImgArr: imgArr,
                
            })

            let upFilesArr = getPathArr(t);
            if (upFilesArr.length > count-1) {
                let imgArr = t.data.upImgArr;
                let newimgArr = imgArr.slice(0, count)
                t.setData({
                    upFilesBtn: false,
                    upImgArr: newimgArr,
                    
                   
                })
            }
         
        },
    });
}
var chooseVideo = (t,count) => {
    wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        compressed:true,
        camera: 'back',
        success: function (res) {


          t.setData({
          
            size: (res.size / (1024 * 1024)).toFixed(2)
          })
          if (t.data.size > 2) {
            wx.showModal({
              title: '珍珠助手',
              content: '很抱歉，最大允许2M，当前为' + (t.data.size + 'M')
            })
            return false;
          }
            let videoArr = t.data.upVideoArr || [];
            let videoInfo = {};
            videoInfo['tempFilePath'] = res.tempFilePath;
            videoInfo['size'] = res.size;
            videoInfo['height'] = res.height;
            videoInfo['width'] = res.width;
            videoInfo['thumbTempFilePath'] = res.thumbTempFilePath;
            videoInfo['progress'] = 0;
            videoArr.push(videoInfo)
          

            t.setData({

              upVideoArr: videoArr,
            })


            let upFilesArr = getPathArr(t);
           
            if (upFilesArr.length > count - 1) {
                t.setData({
                    upFilesBtn: false,
                   
                })
            } 
           
           
            // console.log(res)
        }
    })
}

// 获取 图片数组 和 视频数组 以及合并数组
var getPathArr = t => {
    let imgarr = t.data.upImgArr || [];
    let upVideoArr = t.data.upVideoArr || [];
    let imgPathArr = [];
    let videoPathArr = [];
    imgarr.map(function (v, i) {
        imgPathArr.push(v.path)
    })
    upVideoArr.map(function (v, i) {
        videoPathArr.push(v.tempFilePath)
    })
    let filesPathsArr = imgPathArr.concat(videoPathArr);
    return filesPathsArr;
}

/**
 * upFilesFun(this,object)
 * object:{
 *    url     ************   上传路径 (必传)
 *    filesPathsArr  ******  文件路径数组
 *    name           ******  wx.uploadFile name
 *    formData     ******    其他上传的参数
 *    startIndex     ******  开始上传位置 0
 *    successNumber  ******     成功个数
 *    failNumber     ******     失败个数
 *    completeNumber  ******    完成个数
 * }
 */

var upFilesFun = (t, data, progress) =>{
    let _this = t;
    let url = "http://localhost/yiwang/index.php/Home/Upload/index"; 
    let filesPath = data.filesPathsArr ? data.filesPathsArr : getPathArr(t);
    let name = data.name || 'file';
    let formData = data.formData || {};
    let startIndex = data.startIndex ? data.startIndex : 0;
    let successNumber = data.successNumber ? data.successNumber : 0;
    let failNumber = data.failNumber ? data.failNumber : 0;
    
    wx.uploadFile({
        url: url, 
        filePath: filesPath[startIndex],
        name: name,
        
       
        success: function (res) {
      
          var data = JSON.parse(res.data);
         
           console.log(7777,res.data)

          
           // console.log('success', successNumber)
         
           wx.hideLoading();
           successNumber++;
           if (data.status == 0) {
             successNumber--;
           } 
          
           console.log(999, successNumber)
           if (startIndex == filesPath.length - 1) {
             // console.log('completeNumber', startIndex)
             // console.log('over',res)

            

             if (data.status == 1) {
               var data = res.data

               wx.navigateTo
                 ({
                   url: "../index/index?ll=1&successNumber=" + successNumber
                 })
             } else {
               wx.navigateTo
                 ({
                   url: "../index/index?ll=2&successNumber=" + successNumber
                 })
             }



           } 
           
        },


        fail: function(res){
          wx.navigateTo
            ({
              url: "../index/index?ll=2&successNumber" + successNumber
            })
            failNumber++;
            // console.log('fail', filesPath[startIndex])
            // console.log('failstartIndex',startIndex)
            // console.log('fail', failNumber)
            // console.log('fail', res)
        },
        complete: function(res){
            
            if (startIndex == filesPath.length - 1 ){
                // console.log('completeNumber', startIndex)
                // console.log('over',res)
              
                console.log('成功：' + successNumber + " 失败：" + failNumber)
            
              


            }else{
                startIndex++;                
                // console.log(startIndex)
                data.startIndex = startIndex;
                data.successNumber = successNumber;
                data.failNumber = failNumber;
                upFilesFun(t, data, progress);
            }
           
        }
    })
 
    
}
module.exports = { chooseImage, chooseVideo, upFilesFun, getPathArr}