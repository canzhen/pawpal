Page({
    data: {
        conversations: [],
        inputValue: '',
        conversationId: ''
    },

    async loadConversations() {
        try {
          const { result } = await wx.cloud.callFunction({
            name: 'getConversationList'
          })
    
          if (result.error) {
            throw new Error(result.error)
          }
    
          this.setData({
            conversations: result.conversations
          })
        } catch (error) {
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
    },

    async loadMessages() {
        const { result } = await wx.cloud.callFunction({
          name: 'handleChat',
          data: {
            type: 'getMessages',
            conversationId: this.data.conversationId
          }
        })
    
        if (result.messages) {
          this.setData({
            messages: result.messages
          })
        }
    },
   
    onLoad: function() {
        this.loadConversations();
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