Page({
    data: {},
    onLoad: function(n) {
        var o = decodeURIComponent(n.url);
        this.setData({
            url: o
        }), console.log(n.url);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});