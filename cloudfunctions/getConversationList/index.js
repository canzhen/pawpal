const cloudbase = require("@cloudbase/node-sdk");
const app = cloudbase.init({
  env: process.env.ENV
});
const db = app.database();

exports.main = async (event, context) => {
    const openId = event.userInfo.openId;

    try {
        // 获取当前用户参与的所有会话
        const { data: conversations } = await db.collection('conversations')
        .where({
            'participants.user_open_id': openId
        })
        .orderBy('updated_at', 'desc')
        .get()

        // 处理每个会话，获取对话对方的信息
        return {
            conversations: conversations.map(conv => {
                // 找到对话的另一方（非当前用户）
                const otherParticipant = conv.participants.find(p => p.user_open_id !== openId)
                
                return {
                    conversationId: conv._id,
                    name: otherParticipant.nickname,
                    avatar: otherParticipant.avatar,
                    lastMessage: conv.last_message.content,
                    // 处理时间显示
                    time: formatTime(new Date(conv.last_message.created_at)),
                    unreadCount: conv.unread_counts[openId] || 0
                }
            })
        }
    } catch (error) {
        console.error(error)
        return {
        error: error.message
        }
    }
};

function formatTime(date) {
    const now = new Date()
    const diff = now - date
    const oneDay = 24 * 60 * 60 * 1000
    
    if (diff < oneDay) {
      return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (diff < 2 * oneDay) {
      return '昨天'
    } else {
      return '星期' + '日一二三四五六'[date.getDay()]
    }
  }