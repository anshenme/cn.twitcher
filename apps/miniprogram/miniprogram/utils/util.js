module.exports = {
    getDatasOnDB: function(t, e) {
        this.getDatasOnDBWithWhere(t, {}, e);
    },
    getDatasOnDBWithWhere: function(t, e, n) {
        wx.showLoading({
            title: "加载中..."
        });
        wx.cloud.database().collection(t).where(e).get({
            success: function(t) {
                wx.hideLoading(), n(t.data);
            },
            fail: function(t) {
                wx.showToast({
                    title: "数据加载失败",
                    icon: "none"
                });
            },
            complete: function(t) {
                wx.hideLoading();
            }
        });
    }
};