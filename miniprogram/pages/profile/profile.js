Page({
    data: {
      userInfo: {
        avatarUrl: '',
        nickName: '',
        isSitter: false
      },
      wallet: {
        balance: 0.00
      },
      menuItems: [
        {
          title: '我的订单',
          items: [
            { id: 'all-orders', name: '全部订单', icon: '/images/order.png' }
          ]
        },
        {
          title: '我的钱包',
          items: [
            { id: 'wallet', name: '钱包余额', icon: '/images/wallet.png' }
          ]
        },
        {
          title: '更多服务',
          items: [
            { id: 'address', name: '地址管理', icon: '/images/address.png' },
            { id: 'settings', name: '设置', icon: '/images/settings.png' }
          ]
        }
      ]
    },
   
    onLoad: function() {
      this.getUserInfo()
      this.getWalletBalance()
    },
   
    getUserInfo: function() {
      // 这里可以从服务器或本地存储获取用户信息
      wx.getStorage({
        key: 'userInfo',
        success: (res) => {
          this.setData({
            userInfo: res.data
          })
        }
      })
    },
   
    getWalletBalance: function() {
      // 从服务器获取钱包余额
      // 示例数据
      this.setData({
        'wallet.balance': 128.50
      })
    },
   
    navigateToOrders: function(e) {
      wx.navigateTo({
        url: '/pages/orders/orders'
      })
    },
   
    navigateToWallet: function() {
      wx.navigateTo({
        url: '/pages/wallet/wallet'
      })
    },
   
    navigateToAddress: function() {
      wx.navigateTo({
        url: '/pages/address/address'
      })
    },
   
    navigateToSettings: function() {
      wx.navigateTo({
        url: '/pages/settings/settings'
      })
    },
   
    becomeSitter: function() {
      wx.showModal({
        title: '成为宠物保姆',
        content: '确定要申请成为宠物保姆吗？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/become-sitter/become-sitter'
            })
          }
        }
      })
    },
   
    onPullDownRefresh: function() {
      // 刷新页面数据
      Promise.all([
        this.getUserInfo(),
        this.getWalletBalance()
      ]).then(() => {
        wx.stopPullDownRefresh()
      })
    },
   
    contactService: function() {
      // 打开客服会话
      wx.openCustomerServiceChat({
        extInfo: {url: 'https://work.weixin.qq.com/kfid/xxx'},
        corpId: 'xxx',
        success(res) {}
      })
    }
   })