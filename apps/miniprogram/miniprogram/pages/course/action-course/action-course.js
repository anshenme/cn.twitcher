var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../phone/phone-template")), a = require("../../../utils/util.js"), e = {
    data: {
        navbar: [ "古建筑", "文物遗迹", "土特产" ],
        currentTab: 0,
        type: "1",
        datas: [],
        datass: []
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
        var a = t.currentTarget.dataset.idx + 1;
        this.data.type = a, console.log(this.data.type), this.requestCourseList();
    },
    tapItem: function(t) {
        var a = this, e = t.currentTarget.dataset.idx;
        console.log(e);
        var n = "";
        if (1 == a.data.type) {
            var s = encodeURIComponent(JSON.stringify(a.data.datass[e]));
            console.log(s), n = "../../course/course-list/course-list?data=" + s;
        } else n = "../../commonPages/webViewPage/webViewPage?url=" + this.data.datas[e].articleurl;
        wx.navigateTo({
            url: n
        });
    },
    requestCourseList: function() {
        var t = this;
        if (1 == t.data.type) e = "1"; else if (2 == t.data.type) e = "2"; else if (3 == t.data.type) var e = "3";
        1 == t.data.type ? a.getDatasOnDB("researchStudyTypeInfo", function(a) {
            console.log(a), t.data.datass = a, t.setData({
                listDatas: a,
                tab: t.data.type
            });
        }) : a.getDatasOnDBWithWhere("new_courseInfo", {
            type: e
        }, function(a) {
            console.log(a), t.data.datas = a, 0 == t.data.datas.length ? t.setData({
                listDatas: null,
                tab: t.data.type
            }) : t.setData({
                listDatas: a,
                tab: t.data.type
            });
        });
    },
    onLoad: function(t) {
        var e = this;
        e.data.type;
        a.getDatasOnDBWithWhere("bannerInfo", {
            _id: "coursePageBanner"
        }, function(t) {
            console.log(t[0].imageUrls), e.setData({
                imageUrls: t[0].imageUrls
            });
        }), a.getDatasOnDB("researchStudyTypeInfo", function(t) {
            console.log(t), e.data.datass = t, e.setData({
                listDatas: t,
                tab: e.data.type
            });
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

e.clickPhone = t.default.clickPhone, Page(e);