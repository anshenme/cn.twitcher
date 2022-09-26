const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

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

        //想要递增id怎么办，先查询再加一
        let res = await db.collection("test-group").count();
        let groupId = parseInt(res.total) + 1;

        //严格项目需要事务功能，查询文档

        await db.collection("test-group").add({
            data: {
                leader: u.nickname,
                region: u.region,
                code: u.code,
                age: u.age,
                info: u.info,
                member: 1,
                _openId: openId,
                groupId,
            },
        });
        await db.collection("test-form").add({
            data: {
                leader: u.nickname,
                genfer: u.genfer === "nv",
                region: u.region,
                code: u.code,
                age: u.age,
                info: u.info,
                isLeader: true,
                _openId: openId,
                groupId,
            },
        });
        return {
            success: true,
            groupId,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: error.message,
        };
    }
};