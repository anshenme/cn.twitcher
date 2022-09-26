const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

module.exports = async (event) => {

    try {
        let u = event.data;

        //userID一般来说自行实现，小程序提供了openid直接使用方便
        let wxContext = cloud.getWXContext;
        let openId = wxContext.OPENID;

        //防止加入两个小组
        let exist = await db.collection("test-form").where({
            _openid: openId,
        })
            .get();
        if (exist.data[0] && exist.data[0].groupId) {
            return {
                success: false,
                errorMessage: "已有小组",
            };
        }
        //有可能已经满了，要先查询一下
        let res = await db.collection("test-gtoup").where({
            groupId: u.groupId,
        }).get();

        if ((res.data[0].member || 1) > 5) {
            return {
                success: false,
                errorMessage: "填写信息时小组已满",
            };
        }

        //更新小组成员数量
        await db.collection("test-group")
            .where({
                groupId: u.groupId,
            })
            .update({
                data: {
                    member: _.inc(1),
                },
            });
        await db.collection("test-form").add({
            data: {
                nickname: u.nickname,
                genfer: u.genfer === "nv",
                region: u.region,
                code: u.code,
                age: u.age,
                info: u.info,
                isLeader: false,
                _openId: openId,
                groupId: u.groupId,
            },
        });
        return {
            success: true,
            code: res.data[0].code,
            groupId: u.groupId,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            errorMessage: error.message,
        };
    }
};