var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../phone/phone-template")), a = require("../../utils/util.js"), t = {
    onLoad: function(e) {
        var t = "https://v.alltuu.com/album?id=1003400104&from=singlemessage&isappinstalled=0";
        t = encodeURIComponent(t);
        var n = this;
        a.getDatasOnDBWithWhere("bannerInfo", {
            _id: "casePageBanner"
        }, function(e) {
            console.log(e[0].imageUrls), n.setData({
                imageUrls: e[0].imageUrls,
                url: t
            });
        }), a.getDatasOnDB("caseInfo", function(e) {
            console.log(e), n.setData({
                datas: e
            });
        });
    },
    enterAlbum: function(e) {
        console.log(e.currentTarget.dataset.albumurl);
        var a = e.currentTarget.dataset.albumurl;
        wx.navigateTo({
            url: "../commonPages/webViewPage/webViewPage?url=" + a
        });
    }
};

t.clickPhone = e.default.clickPhone, Page(t);