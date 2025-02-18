Page({
    data: {
      currentTab: 'upcoming',
      bookings: []
    },

    async loadBookings() {
        try {
            const { result } = await wx.cloud.callFunction({
                name: 'getBookings',
                data: {
                    "phone_number": "4848629350"
                }
            })
            console.log('bookings: ', result.data)
            this.setData({ bookings: result.data })
        } catch (err) {
            console.error(err)
            wx.showToast({
                title: '加载失败',
                icon: 'none'
            })
        }
    },

    onLoad: function() {
        this.loadBookings()
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