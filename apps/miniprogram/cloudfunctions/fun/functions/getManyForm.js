const cloud = require("wx-server-sdk");

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();
const _ = db.command;

module.exports = async (event) => {
    try {
        let wxContext = cloud.getWXContext();
        let openId = wxContext.OPENID || "test";
        let u = event.data;
        let res = await db.collection("test-form").where({
            groupId: u.groupId,
        })
            .get();
        let form = res.data.find((item) => item._openid === openId);
        if (!form) {
            return {
                success: true,
                groupList: res.data,
            };
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};