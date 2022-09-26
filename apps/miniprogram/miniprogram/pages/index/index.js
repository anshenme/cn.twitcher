const db = wx.cloud.database()
Page({
  data: {
    groupId: "",
    banner: [],
    num: '',
    steps: [],
  },
  onLoad: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    } else {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "getMyGroup",
          },
        })
        .then((res) => {
          if (res.result?.groupId) {
            wx.setStorageSync("groupId", res.result.groupId);
            this.setData({
              groupId: res.result.groupId,
            });
          }
        });
    }
    this.get_banner()
  },
  //获取轮播图
  get_banner(){
    //这个this指向的是Page()方法里面的整个对象，形如Page({this})
    //赋值给that，that也指向了同样的对象
    let that = this  
    db.collection('banner').get({
      success:function(res){
         //获取成功
         //通过setData()方法赋值给data里面的banner数组
         console.log(res)
         that.setData({
            banner:res.data
         })
      },
      fail(er){
         console.log('获取失败，所以执行fail函数了，也就是打印了我这句话')
      }
    })
  },
onShow: function (params) {
    let groupId = wx.getStorageSync("groupId");
    if (groupId) {
      this.setData({
        groupId: groupId,
      });
    }
  },
});