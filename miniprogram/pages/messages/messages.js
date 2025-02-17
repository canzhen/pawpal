Page({
    data: {
      messages: [
        {
          id: 1,
          sitterName: '张阿姨',
          avatar: '/images/avatar1.png',
          lastMessage: '好的，我会准时到达的，请不用担心',
          lastTime: '10:30',
          unreadCount: 2
        },
        {
          id: 2,
          sitterName: '李叔叔',
          avatar: '/images/avatar2.png',
          lastMessage: '狗狗今天很乖，我带他去公园玩了',
          lastTime: '昨天',
          unreadCount: 0
        },
        {
          id: 3,
          sitterName: '王奶奶',
          avatar: '/images/avatar3.png',
          lastMessage: '已经给小猫洗完澡了，一切顺利',
          lastTime: '星期一',
          unreadCount: 1
        }
      ]
    },
   
    onLoad: function() {
      // 可以在这里从服务器获取消息列表
      // this.loadMessages()
    },
   
    goToChat: function(e) {
      const { id, sitter } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/chat/chat?id=${id}&sitter=${sitter}`
      })
    },
   
    loadMessages: function() {
      // 从服务器加载消息的示例代码
      /*
      wx.request({
        url: 'your-api-url/messages',
        success: (res) => {
          this.setData({
            messages: res.data
          })
        }
      })
      */
    },
   
    onPullDownRefresh: function() {
      // 下拉刷新
      this.loadMessages()
      wx.stopPullDownRefresh()
    },
   
    onShow: function() {
      // 每次页面显示时更新消息列表
      // this.loadMessages()
    },
   
    clearUnread: function(messageId) {
      // 清除未读消息数的示例代码
      const messages = this.data.messages.map(msg => {
        if (msg.id === messageId) {
          return { ...msg, unreadCount: 0 }
        }
        return msg
      })
      this.setData({ messages })
    }
   })