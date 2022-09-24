Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    clickPhone: function(e) {
        console.log("点击了客服电话"), wx.makePhoneCall({
            phoneNumber: "13834248642"
        });
    }
};

exports.default = e;