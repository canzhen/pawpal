const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
  env: process.env.ENV
});
const db = app.database();

exports.main = async (event, context) => {
    console.log('收到参数：', event)
    const { phone_number } = event
    try {
        // 1. get useId based on phone number
        const userRes = await db.collection('users')
          .where({ phoneNumber: phone_number })
          .get()
    
        if (userRes.data.length === 0) {
          return {
            code: 404,
            msg: '未找到该用户',
            data: []
          }
        }
    
        const userId = userRes.data[0]._id
    
        // 2. get petIds given userId
        const petOwnersRes = await db.collection('petOwners')
          .where({ userId: userId })
          .get()
    
        if (petOwnersRes.data.length === 0) {
          return {
            code: 200,
            msg: '用户无关联宠物',
            data: []
          }
        }
    
        const petIds = petOwnersRes.data[0].petIds

        // 3. find bookings given petIds
        // const bookingsRes = await db.collection('bookings')
        //   .where({ petId: _.in(petIds) })
        //   .get()
        const bookingsRes = await db.collection('bookings')
            .where({ petId: "0b732e7f67b3f424011f5ae7242026cc" })
            .get()

         // 如果没有 bookings，返回空数组
        if (bookingsRes.data.length === 0) {
            return {
            code: 200,
            msg: '未找到预约记录',
            data: []
            }
        }

        return {
          code: 200,
          msg: '查询成功',
          data: bookingsRes.data,
        }
    
      } catch (err) {
        return {
          code: 500,
          msg: err.message,
          data: []
        }
      }
};