Page({
    data: {
      currentTab: 'upcoming',
      bookings: [
        {
          id: 1,
          status: 'pending',
          statusText: '待确认',
          sitterName: '张阿姨',
          sitterAvatar: '/images/avatar1.png',
          serviceType: '寄养',
          date: '2024-02-20 - 2024-02-25',
          price: 120,
          address: '海淀区五道口'
        },
        {
          id: 2,
          status: 'confirmed',
          statusText: '已确认',
          sitterName: '李叔叔',
          sitterAvatar: '/images/avatar2.png',
          serviceType: '遛狗',
          date: '2024-02-18',
          price: 80,
          address: '朝阳区望京'
        },
        {
          id: 3,
          status: 'completed',
          statusText: '已完成',
          sitterName: '王奶奶',
          sitterAvatar: '/images/avatar3.png',
          serviceType: '寄养',
          date: '2024-02-10 - 2024-02-15',
          price: 600,
          address: '西城区西直门'
        }
      ]
    },
   
    switchTab(e) {
      const tab = e.currentTarget.dataset.tab
      this.setData({ currentTab: tab })
    },
   
    contactSitter(e) {
      const bookingId = e.currentTarget.dataset.id
      const booking = this.data.bookings.find(b => b.id === bookingId)
      wx.makePhoneCall({
        phoneNumber: '10000000000' // 这里替换为实际电话号码
      })
    },
   
    writeReview(e) {
      const bookingId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/write-review/write-review?id=${bookingId}`
      })
    },
   
    cancelBooking(e) {
      const bookingId = e.currentTarget.dataset.id
      wx.showModal({
        title: '确认取消',
        content: '确定要取消这个预约吗？',
        success: (res) => {
          if (res.confirm) {
            // 这里添加取消预约的逻辑
            console.log('取消预约:', bookingId)
          }
        }
      })
    }
   })