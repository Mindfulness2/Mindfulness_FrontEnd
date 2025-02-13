<template>
  <div class="example-page">
    <van-nav-bar  class="custom-nav-bar">
      <!-- 左侧插槽 -->
      <template #left>
        <img src="@/assets/img/adduser.png" class="custom-icon" @click="handleLeftClick" style="width: 28px; height: 28px;" />
      </template>

      <!-- 右侧插槽 -->
      <template #right>
        <div class="right-icons">
          <img src="@/assets/img/watch.png" @click="handleRightClick1" style="width: 23px; height: 23px;" />
          <van-icon name="scan" size="23" @click="handleRightClick2" color="black" style="font-weight: 700;" />
          <van-icon name="setting" size="23" @click="handleRightClick2" color="black" />
        </div>
      </template>
    </van-nav-bar>
    <!-- 页面内容 -->
    <div class="content">
      <h1>欢迎访问我的页面（仅测试，待删除）</h1>
      <van-button type="primary" round block @click="onButtonClick" style="font-size: 10px;">
        点此登录（测试）
      </van-button>
    </div>
    <van-card
       
      title="张三"
      :thumb="require('@/assets/img/NK.png')"
      class="preson-card"
      @click-thumb="goTopresonView"
    >
      <!-- 通过 style 调整 desc 的位置 -->
      <template #desc>
        <div style="margin-top: 10px;">个人信息</div>
      </template>
      <template #tags>
        <van-tag v-for="(tag, index) in tags" :key="index" plain type="primary" style="margin-top: 20px;"
        class="person-tag"
        >{{ tag }}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="goTologin">登录</van-button>
        <van-button size="mini" @click="goToSun">退出</van-button>
      </template>
    </van-card>

    <div class="cella" style="padding-bottom: 50px;"> <!-- 确保最后一个单元格不会被底部导航栏遮挡 -->
      <van-cell is-link title="我的收藏" @click="goToHistory" icon="star-o" />
      <van-cell is-link title="历史记录" @click="goToHistory" icon="todo-list-o" class="cell-no-border" />
      <van-cell is-link title="历史分数" @click="goToFraction" icon="chart-trending-o" class="cell-no-border" />
      <van-cell is-link title="AI形象选择" @click="goToAIImage" icon="user-circle-o" />
      <van-cell is-link title="我的钱包" @click="goToHistory" icon="pending-payment" class="cell-no-border" />
      <van-cell is-link title="福利中心" @click="goToHistory" icon="point-gift-o" class="cell-no-border" />
      <van-cell is-link title="购物中心" @click="goToSelectGender" icon="shop-collect-o" />
      <van-cell is-link title="我的团队" @click="goToSelectGender" icon="friends-o" class="cell-no-border" />
      <van-cell is-link title="帮助中心" @click="goToSelectGender" icon="service-o" class="cell-no-border" />
      <van-cell is-link title="设置" @click="goToSelectGender" icon="setting-o" />
    </div>
  </div>
</template>

<script>
import { showToast } from 'vant';
import { NavBar, Button } from 'vant';
import { Cell } from 'vant';
import { Icon } from 'vant';
import { Card, Tag } from 'vant';

export default {
  name: 'MineView',
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Tag.name]: Tag
  },
  data() {
    return {
      tags: ['关注：0', '粉丝：0','训练时长：0'],
    };
  },
  methods: {
    onButtonClick() {
      showToast('按钮被点击了！');
      this.$router.push('/login');
    },
    goToHistory() {
      this.$router.push('/history');
    },
    goToAIImage() {
      this.$router.push('/aiimage');
    },
    goToSelectGender() {
      this.$router.push('/selectgender');
    },
    goToFraction() {
      this.$router.push('/fraction');
    },
    goTopresonView() {
      this.$router.push('/aiimage');
    },
    goTologin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/*将导航栏van-nav-bar固定在顶部*/ 
.custom-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.content {
  text-align: center;
  padding-top: 42px; /* 确保内容不被顶部导航栏遮挡 */
  color: #0a0707;
  font-size: 10px;
}
/* 在你的样式文件中 */
.cella ::v-deep .van-cell__title {
  font-size: 15px; /* 设置字体大小 */
}
.cella ::v-deep .van-cell__left-icon {
  font-size: 23px; /* 设置图标大小 */
  margin-right: 16px; /* 设置图标与文字之间的距离 */
  font-weight: 600; /* 设置图标的粗细 */
}

.van-cell.cell-no-border::after,
.van-cell-group .van-cell.cell-no-border::after {
  border-bottom: none;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}

.custom-nav-bar {
  background-color: #fff; /* 自定义背景颜色 */
}

.right-icons {
  display: flex;
  align-items: center;
  color: #000; /* 图标颜色 */
}

.right-icons .van-icon {
  margin-left: 20px; /* 调整图标之间的间距 */
}
.right-icons .img {   
  margin-left: 20px; /* 调整图标之间的间距 */
}
.preson-card {
  background-color: white; /* 设置卡片背景颜色为白色 */
}
::v-deep .van-card__thumb {
  border-radius: 50%; /* 设置为圆形 */
  overflow: hidden; /* 确保内容不会溢出 */
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片充满容器并裁剪 */
}
.person-tag {
  background-color: #ffffff; /* 白色背景 */
  color: #808080 !important; /* 灰色文字，使用 !important 确保样式生效 */
  padding: 3px 10px; /* 内边距 */
  border-radius: 50px; /* 椭圆形 */
  font-size: 10px; /* 字体大小 */
  margin-right: 10px; /* 两个tag间增加10px的距离 */
}
</style>
