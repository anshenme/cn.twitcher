var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../phone/phone-template")), t = {
    data: {
        dataSource: {}
    },
    tapItem: function(a) {
        var t = a.currentTarget.id, e = this;
        wx.cloud.database().collection("new_courseInfo").where({
            id: t
        }).get({
            success: function(a) {
                e.data.articleurl = a.data[0].articleurl, wx.navigateTo({
                    url: "../../commonPages/webViewPage/webViewPage?url=" + e.data.articleurl
                });
            }
        });
    },
    onLoad: function(a) {
        var t = this;
        t.data.dataSource = JSON.parse(decodeURIComponent(a.data)), console.log(t.data.dataSource), 
        wx.setNavigationBarTitle({
            title: t.data.dataSource.title
        }), 0 == t.data.dataSource.course.length ? t.setData({
            listDatas: null
        }) : t.setData({
            listDatas: t.data.dataSource.course[0]
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
};

t.clickPhone = a.default.clickPhone, Page(t);