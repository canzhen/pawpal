const { envList } = require("../../envList");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

Page({
    data: {
      services: [
        { id: 1, name: '寄养', type: 'boarding', icon: '/images/boarding.png' },
        { id: 2, name: '遛狗', type: 'walking', icon: '/images/walking.png' },
        { id: 3, name: '上门照看', type: 'visiting', icon: '/images/visiting.png' },
        { id: 4, name: '美容洗澡', type: 'grooming', icon: '/images/grooming.png' }
      ],
      sitters: [
        {
          id: 1,
          name: '张阿姨',
          avatar: '/images/avatar1.png',
          location: '海淀区-五道口',
          rating: 4.9,
          reviews: 38,
          description: '经验丰富的宠物保姆，家有大院子，经常带狗狗户外活动',
          price: 120
        },
        {
          id: 2,
          name: '李叔叔',
          avatar: '/images/avatar2.png',
          location: '朝阳区-望京',
          rating: 4.8,
          reviews: 45,
          description: '退休教师，喜欢小动物，有5年养狗经验，家里现养金毛一只',
          price: 150
        },
        {
          id: 3,
          name: '王阿姨',
          avatar: '/images/avatar3.png',
          location: '西城区-西直门',
          rating: 4.95,
          reviews: 26,
          description: '专业宠物美容师，可提供洗澡美容服务，家有独立宠物活动区',
          price: 180
        }
      ]
    },
  
    onLoad: function() {
      // 可以在这里从服务器加载数据
      // this.loadSitters()
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