<template>
  <div class="example-page">
    <van-nav-bar class="custom-nav-bar">
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
      <h1></h1>
      
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
        <van-button size="mini" @click="goTologin">退出</van-button>
      </template>
    </van-card>

    <div class="cella" style="padding-bottom: 50px;"> <!-- 确保最后一个单元格不会被底部导航栏遮挡 -->
      <!-- <van-cell is-link title="我的收藏" @click="goToHistory" icon="star-o" />
      <van-cell is-link title="历史记录" @click="goToHistory" icon="todo-list-o" class="cell-no-border" /> -->
      <van-cell is-link title="历史建议" @click="goToFraction" icon="chart-trending-o" class="cell-no-border" />
      <van-cell is-link title="AI形象选择" @click="goToAIImage" icon="user-circle-o" />
      <!-- <van-cell is-link title="我的钱包" @click="goToHistory" icon="pending-payment" class="cell-no-border" />
      <van-cell is-link title="福利中心" @click="goToHistory" icon="point-gift-o" class="cell-no-border" />
      <van-cell is-link title="购物中心" @click="goToSelectGender" icon="shop-collect-o" />-->
      <van-cell is-link title="我的团队" @click="goToMygroup" icon="friends-o" class="cell-no-border" /> 
      <van-cell is-link title="帮助中心" @click="goToHelp" icon="service-o" class="cell-no-border" />
      <van-cell is-link title="设置" @click="goToSelectSet" icon="setting-o" />
      <van-cell is-link title="ServerSetting" @click="goToServer" icon="setting-o" class="cell-no-border" />
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
    goToMygroup() {
      this.$router.push('/mygroup');
    },
    goToHelp() {
      this.$router.push('/help');
    },
    goTologin() {
      this.$router.push('/login');
    },
    goToSelectSet() {
      this.$router.push('/setting');
    },
    goToServer() {
      this.$router.push('/server');
    },
  },
};
</script>

<style scoped>
/* 设置页面背景图 */
.example-page {
  background-image: url('@/assets/img/background_mine.jpg'); /* 替换为你的背景图路径 */
  background-size: cover; /* 让背景图自适应页面大小 */
  background-position: center; /* 让背景图居中 */
  min-height: 100vh; /* 确保背景图覆盖整个页面 */
}

/* 将导航栏van-nav-bar固定在顶部 */
.custom-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white; /* 导航栏背景色 */
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

/* 设置卡片背景透明 */
.preson-card {
  background-color: transparent !important; /* 设置卡片背景透明 */
  border-radius: 10px; /* 添加圆角 */
  padding: 10px; /* 添加内边距 */
}

/* 设置单元格背景透明 */
.cella ::v-deep .van-cell {
  background-color: transparent !important; /* 设置单元格背景透明 */
}

/* 设置按钮背景透明 */
.van-button--primary {
  background-color: rgba(255, 69, 0, 0.7) !important; /* 半透明橙色按钮 */
  border: none !important;
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
  background-color: rgba(255, 255, 255, 0.7); /* 半透明白色背景 */
  color: #808080 !important; /* 灰色文字，使用 !important 确保样式生效 */
  padding: 3px 10px; /* 内边距 */
  border-radius: 50px; /* 椭圆形 */
  font-size: 10px; /* 字体大小 */
  margin-right: 10px; /* 两个tag间增加10px的距离 */
}
</style>