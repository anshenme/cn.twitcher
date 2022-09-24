var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../phone/phone-template")), e = require("../../../utils/util.js"), n = {
    onLoad: function(t) {
        var n = getApp().globalData.windowHeight + 49 - 10, o = this;
        e.getDatasOnDB("researchStudyPolicyInfo", function(t) {
            o.setData({
                datas: t[0].datas,
                height: n
            });
        });
    },
    enterDetail: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.showLoading({
            title: "文件打开中..."
        }), wx.downloadFile({
            url: e,
            success: function(t) {
                console.log("d"), wx.openDocument({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.hideLoading();
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "文件打开失败，请稍后重新打开文件 ",
                            icon: "none"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "文件打开失败，请稍后重新打开文件",
                    icon: "none"
                });
            }
        });
    }
};

n.clickPhone = t.default.clickPhone, Page(n);