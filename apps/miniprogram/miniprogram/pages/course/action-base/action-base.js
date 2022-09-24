var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../phone/phone-template")), t = require("../../../utils/util.js"), e = {
    data: {
        navbar: [ "景点", "美食", "民宿" ],
        currentTab: 0,
        type: "1",
        datas: [],
        dataSource: {},
        page: 1,
        totalPage: 0,
        isHideLoadMore: !0
    },
    navbarTap: function(a) {
        this.setData({
            currentTab: a.currentTarget.dataset.idx
        }), this.data.datas = [], this.data.page = 1;
        var t = a.currentTarget.dataset.idx + 1;
        this.data.id = 0, this.data.type = t, console.log(this.data.type), this.requestBaseList();
    },
    tapItem: function(a) {
        var t = a.currentTarget.dataset.idx, e = encodeURIComponent(JSON.stringify(this.data.datas[t]));
        console.log(e), wx.navigateTo({
            url: "../../course/base-details/base-details?data=" + e
        });
    },
    requestBaseList: function() {
        var a = wx.cloud.database(), t = this;
        if (1 == t.data.type) e = "1"; else if (2 == t.data.type) e = "2"; else if (3 == t.data.type) var e = "3";
        a.collection("baseInfo").where({
            type: e
        }).limit(10).count({
            success: function(a) {
                t.data.totalPage = Math.ceil(a.total / 10), console.log("总页数===" + t.data.totalPage);
            }
        }), a.collection("baseInfo").where({
            type: e
        }).skip(10 * (t.data.page - 1)).limit(10).get({
            success: function(a) {
                wx.hideLoading(), console.log(a.data), 1 == t.data.page ? t.data.datas = a.data : t.data.datas = t.data.datas.concat(a.data), 
                0 == t.data.datas.length ? t.setData({
                    listDatas: null
                }) : t.setData({
                    listDatas: t.data.datas
                });
            },
            fail: function(a) {},
            complete: function(a) {
                wx.hideNavigationBarLoading();
            }
        });
    },
    onLoad: function(a) {
        var e = wx.cloud.database(), o = this, n = o.data.type;
        e.collection("baseInfo").where({
            type: n
        }).limit(10).count({
            success: function(a) {
                o.data.totalPage = Math.ceil(a.total / 10);
            }
        }), t.getDatasOnDBWithWhere("bannerInfo", {
            _id: "coursePageBanner"
        }, function(a) {
            console.log(a[0].imageUrls), o.setData({
                imageUrls: a[0].imageUrls
            });
        }), t.getDatasOnDBWithWhere("baseInfo", {
            type: n
        }, function(a) {
            console.log(a), o.data.datas = a, o.setData({
                listDatas: a
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("加载更多");
        var a = this;
        a.data.totalPage == a.data.page ? a.data.isHideLoadMore = !0 : (a.data.isHideLoadMore = !1, 
        a.data.page++, a.requestBaseList()), a.setData({
            isHideLoadMore: a.data.isHideLoadMore
        });
    },
    onShareAppMessage: function() {}
};

e.clickPhone = a.default.clickPhone, Page(e);