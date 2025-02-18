const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
  env: process.env.ENV
});
const db = app.database();

exports.main = async (event, context) => {
    console.log('收到参数：', event)
    try {
        const { service_type } = event
        console.log('查询服务类型:', service_type)
        const result = await db.collection('sitters')
            .where({ services: service_type })
            .get()
            
        console.log('查询结果:', result)
        return result
    } catch (err) {
        console.error('发生错误：', err)
        return err
    }
};