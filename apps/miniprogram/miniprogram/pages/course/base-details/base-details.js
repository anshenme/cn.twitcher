var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../phone/phone-template")), e = {
    data: {
        dataSource: {},
        courseInfo: {},
        articleurl: ""
    },
    tapItem: function(a) {
        var e = a.currentTarget.id, t = this;
        wx.cloud.database().collection("new_courseInfo").where({
            id: e
        }).get({
            success: function(a) {
                t.data.articleurl = a.data[0].articleurl, wx.navigateTo({
                    url: "../../commonPages/webViewPage/webViewPage?url=" + t.data.articleurl
                });
            }
        });
    },
    onLoad: function(a) {
        var e = this;
        e.data.dataSource = JSON.parse(decodeURIComponent(a.data)), console.log(e.data.dataSource.course[0]), 
        e.setData({
            bannerUrls: e.data.dataSource.bannerurl,
            courseList: e.data.dataSource.course[0],
            name: e.data.dataSource.name,
            desc: e.data.dataSource.description,
            address: e.data.dataSource.address,
            time: e.data.dataSource.time,
            ticket: e.data.dataSource.ticket,
            latitude: e.data.dataSource.latitude,
            longitude: e.data.dataSource.longitude,
            markers: e.data.dataSource.markers
        });
    }
};

e.clickPhone = a.default.clickPhone, Page(e);