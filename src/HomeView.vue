<template>
  <div class="home-view">
    <!-- 固定顶部导航栏 -->
    <van-nav-bar
      title="Home"
      right-text="More"
      @click-right="showMore"
      class="fixed-nav-bar"
    />

    <!-- 主体内容 -->
    <div class="content-container">
      <!-- 展示图片 -->
      <div class="featured-image">
        <img src="@/assets/img/homep1.jpg" alt="封面图片" class="img-fluid" />
      </div>

      <!-- 滑动卡片展示 -->
      <van-swipe class="card-swipe" :autoplay="0" indicator-color="white">
        <van-swipe-item v-for="(item, index) in gridItems" :key="index">
          <div class="card-item">
            <div class="card-header">
              <div class="card-title">{{ item.text }}</div>
              <div class="card-description">{{ item.description }}</div>
            </div>
            <div class="card-image-container">
              <img :src="item.image" class="card-image" />
            </div>
            <van-button
              size="small"
              type="default"
              class="card-button"
              @click="handleGridClick(item)"
            >
              Let's Go
            </van-button>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { NavBar, Swipe, SwipeItem, Button, showToast } from 'vant';

export default {
  name: 'HomeView',
  components: {
    [NavBar.name]: NavBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
  },
  data() {
    return {
      images: [
        require('@/assets/img/img1.jpg'),
        require('@/assets/img/img2.jpg'),
        require('@/assets/img/img3.jpg'),
      ],
      gridItems: [
        {
          image: require('@/assets/img/homecp1.jpg'),
          text: 'Yoga',
          description:
            'Yoga is both a form of physical exercise and a comprehensive philosophy of life. It aims to help users achieve harmony and balance of body and mind through physical practice and breath control.',
          link: '/wuqinxi',
        },
        {
          image: require('@/assets/img/homecp2.jpg'),
          text: 'Tai Chi',
          description:
            'Emphasizing natural relaxation, Tai Chi focuses on the coordination of breathing and movements. It requires gentle, slow, and continuous actions. This method combines traditional philosophy, medical theory, and martial arts.',
          link: '/taiji',
        },
        {
          image: require('@/assets/img/homecp3.jpg'),
          text: 'Wu Qin Xi',
          description:
            'Based on the movements and demeanor of five animals—tiger, bear, deer, monkey, and bird—Wu Qin Xi aims to strengthen the body and regulate the flow of energy by imitating the characteristics of these animals.',
          link: '/yoga',
        },
        {
          image: require('@/assets/img/homecp4.jpg'),
          text: 'Baduanjin',
          description:
            'Baduanjin is a traditional Chinese fitness Qigong that mainly involves limb movements. It strengthens the body, regulates the flow of energy (Qi), and unblocks the meridians through a series of movements and breathing techniques.',
          link: '/baduanjing',
        },
        {
          image: require('@/assets/img/homecp5.jpg'),
          text: 'Meditation',
          description:
            'Meditation is a mental training practice that focuses on concentrating the mind. Its core goal is to help users focus their attention on the present moment, eliminate distractions and external disturbances, and achieve inner peace.',
          link: '/mingxiang',
        },
      ],
    };
  },
  methods: {
    showMore() {
      this.$router.push('/exp');
    },
    goToProfile() {
      this.$router.push('/profile'); // 跳转到个人资料页面
    },
    handleGridClick(item) {
      if (item.link) {
        this.$router.push(item.link); // 跳转到指定页面
      } else {
        showToast('暂无跳转链接');
      }
    },
  },
};
</script>

<style scoped>
.home-view {
  padding: 0;
}

/* 固定顶部导航栏 */
.fixed-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* 内容容器，避免被导航栏遮挡 */
.content-container {
  padding-top: 50px; /* 导航栏高度 */
  padding-bottom: 60px; /* 底部导航栏高度 */
}

.featured-image {
  width: 100%;
  margin-bottom: 0px;
}

.featured-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.card-swipe {
  height: 350px; /* 设置滑动区域高度 */
}

.card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #f9f9f9;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  text-align: center;
  margin-bottom: 0px; /* 减少标题与描述之间的间距 */
  padding-top: 0px; /* 减少标题与卡片顶部的距离 */
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0px; /* 减少标题与描述之间的间距 */
  color: #333;
  line-height: 1.4;
}

.card-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 1px; /* 减少描述与图片之间的间距 */
  text-align: center;
  line-height: 1.6;
}

.card-image-container {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1px; /* 减少图片与按钮之间的间距 */
}

.card-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
}

.card-button {
  width: 80%;
  background-color: #666;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px;
  font-size: 16px;
}
</style>