var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../phone/phone-template")), t = {
    tapItem: function(e) {
        var t = e.currentTarget.dataset.itemindex;
        1 == t ? wx.navigateTo({
            url: "../course/action-course/action-course"
        }) : 2 == t ? wx.navigateTo({
            url: ""
        }) : 3 == t && wx.navigateTo({
            url: "../course/action-base/action-base"
        });
    }
};

t.clickPhone = e.default.clickPhone, Page(t);