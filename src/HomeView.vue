
  <template>
    <div class="home-view">
      <!-- 头部导航栏 -->
      <van-nav-bar title="首页" right-text="更多" @click-right="showMore" />
       <!-- hhhhhhhh -->
      <!-- 轮播组件 -->
      <van-swipe class="swipe-container" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" class="swipe-image" />
        </van-swipe-item>
      </van-swipe>
  
      <!-- 页面内容 -->
      <div class="home-content">
        <h2>欢迎来到首页!</h2>
        <p>这里是应用的主页，您可以在这里浏览内容或执行操作。</p>
        <van-button type="primary" @click="goToProfile">查看个人资料</van-button>
      </div>

      <!-- 插槽：自定义格子展示内容 -->
     <van-row class="custom-grid">
       <van-col
         v-for="(item, index) in gridItems"
         :key="index"
         :span="8"
         class="custom-grid-item"
         @click="handleGridClick(item)"
       > 
         <slot name="grid-item" :item="item">
           <!-- 默认插槽内容 -->
           <div class="grid-item-content">
             <img :src="item.image" class="grid-image" />
             <div class="grid-text">{{ item.text }}</div>
           </div>
         </slot>
       </van-col>
     </van-row>
     
    </div>
  </template>
  
  <script>
  import { NavBar, Swipe, SwipeItem, Row, Col, Button,showToast } from 'vant';
  
  export default {
    name: 'HomeView',
    components: {
      [NavBar.name]: NavBar,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Row.name]: Row,
      [Col.name]: Col,
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
        { image: require('@/assets/img/mx.png'), text: '冥想' ,link: '/bvdtest1',},
        { image: require('@/assets/img/youga.jpg'), text: '太极拳' ,link: '/profile',},
        { image: require('@/assets/img/mx.png'), text: '五禽戏' ,link: '/wuqinxi',},
        { image: require('@/assets/img/mx.png'), text: '内容 1' ,link: '/profile',},
        { image: require('@/assets/img/mx.png'), text: '内容 1' ,link: '/profile',},
        { image: require('@/assets/img/mx.png'), text: '内容 1' },
        ],
      };
    },
    methods: {
      showMore() {
        this.$router.push('/profile');
      },
      goToProfile() {
        this.$router.push('/profile'); // 跳转到个人资料页面
      },
      handleGridClick(item) {
      // 格子点击事件处理函数
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
    padding: 20px;
  }
  .swipe-container {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  .swipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .custom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三列布局 */
  gap: 0px; /* 格子之间的间距 */
  margin-bottom: 20px;
}
.custom-grid-item {
  text-align: center;
  margin-bottom: 20px;
}
.grid-item-content {
  display: grid;
  place-items: center; /* 水平和垂直居中 */
  height: 100%; /* 确保父容器高度占满 */
}
.grid-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
.grid-text {
  margin-top: 0px;
  font-size: 10px;
  color: #333;
  text-align: center;
}
  .home-content {
    text-align: center;
    margin-top: 20px;
  }
  </style>