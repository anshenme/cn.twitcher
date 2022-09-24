App({
    globalData: {
        windowHeight: 0,
        windowWidth: 0,
        environment: "test-aa5d52"
    },
    onLaunch: function() {
        wx.cloud ? wx.cloud.init({
            traceUser: !0,
            env: this.globalData.environment
        }) : console.error("请使用 2.2.3 或以上的基础库以使用云能力");
        var t = this;
        wx.getSystemInfo({
            success: function(n) {
                t.globalData.windowHeight = n.windowHeight, t.globalData.windowWidth = n.windowWidth;
            }
        });
    }
});