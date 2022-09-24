Page({
    data: {
        navbar: [ "研学特色", "研学课程" ],
        currentTab: 0
    },
    navbarTap: function(n) {
        this.setData({
            currentTab: n.currentTarget.dataset.idx
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});