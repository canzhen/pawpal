Page({
    data: {
      isLogin: false,
      userInfo: {
        avatarUrl: '',
        nickName: '',
        isSitter: false,
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

    async checkLoginStatus() {
        console.log('im at checkLoginStatus')
        try {
          const app = getApp();
          // 获取缓存中的用户信息
          const userInfo = wx.getStorageSync('userInfo');
          if (userInfo) {
            this.setData({
              userInfo,
              isLogin: true
            });
            // 获取用户钱包余额
            this.getWalletBalance();
          }
        } catch (error) {
          console.error('检查登录状态失败', error);
        }
    },
   
    onLoad: function() {
        console.log('im at onLoad')
        this.checkLoginStatus();
        this.getWalletBalance()
    },

    async handleLogout() {
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 1. 清除本地存储
            wx.removeStorageSync('userInfo');
            wx.removeStorageSync('openid');
            
            // 2. 重置页面状态
            this.setData({
              userInfo: null,
              isLogin: false,
              openid: ''
            });
            
            // 3. 提示用户
            wx.showToast({
              title: '已退出登录',
              icon: 'success'
            });
          }
        }
      });
    },

    async handleLogin() {
        console.log('im at handleLogin')
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
              const userInfo = res.userInfo;

              console.log('userInfo: ', userInfo)
              
              // 保存用户信息到本地
              wx.setStorageSync('userInfo', userInfo);
              
              // 更新页面状态
              this.setData({
                userInfo,
                isLogin: true
              });
      
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              console.error('获取用户信息失败', err);
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              });
            }
        });
    },
   
    async getWalletBalance() {
        this.setData({
            'wallet.balance': 128.50
        })
        // try {
        //   const db = wx.cloud.database();
        //   const { data } = await db.collection('wallets').where({
        //     _openid: this.data.userInfo.openid
        //   }).get();
    
        //   if (data.length > 0) {
        //     this.setData({
        //       balance: data[0].balance.toFixed(2)
        //     });
        //   }
        // } catch (error) {
        //   console.error('获取钱包余额失败', error);
        // }
    },
   
    navigateToOrders() {
        if (!this.data.isLogin) {
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        wx.navigateTo({
          url: '/pages/orders/list'
        });
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
   
    handleBecomePetsitter() {
        if (!this.data.isLogin) {
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          });
          return;
        }
        wx.navigateTo({
          url: '/pages/petsitter/apply'
        });
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