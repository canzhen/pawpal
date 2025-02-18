Page({
    data: {
      services: [
        { id: 1, name: '寄养', type: 'boarding', icon: '/images/boarding.png' },
        { id: 2, name: '遛狗', type: 'walking', icon: '/images/walking.png' },
        { id: 3, name: '上门照看', type: 'visiting', icon: '/images/visiting.png' },
        { id: 4, name: '美容洗澡', type: 'grooming', icon: '/images/grooming.png' }
      ],
      sitters: []
    },
  
    async loadSitters() {
        try {
            const { result } = await wx.cloud.callFunction({
                name: 'getSitters',
                data: {
                    service_type: 'boarding'
                }
            })
            console.log('sitters: ', result.data)
            this.setData({ sitters: result.data })
        } catch (err) {
            console.error(err)
            wx.showToast({
                title: '加载失败',
                icon: 'none'
            })
        }
    },
    
    async createBooking(e) {
        const { sitterId } = e.currentTarget.dataset
        try {
            const { result } = await wx.cloud.callFunction({
            name: 'createBooking',
            data: {
                sitter_id: sitterId,
                service_type: 'boarding',
                start_time: '2024-02-20',
                end_time: '2024-02-25',
                price: 120
            }
            })
            wx.showToast({
            title: '预约成功'
            })
        } catch (err) {
            console.error(err)
            wx.showToast({
            title: '预约失败',
            icon: 'none'
            })
        }
    },


    onLoad: function() {
        this.loadSitters()
    },
  
    onSearchInput: function(e) {
      const searchText = e.detail.value
      // 处理搜索输入
    },
  
    onServiceTap: function(e) {
      const type = e.currentTarget.dataset.type
      // 处理服务类型选择
    },
  
    onSitterTap: function(e) {
      const sitterId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/sitter-detail/sitter-detail?id=${sitterId}`
      })
    }
  })