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
      :title="savedName"
      :thumb="require('@/assets/img/NK.png')"
      class="preson-card"
      @click-thumb="goTopresonView"
    >
      <!-- 通过 style 调整 desc 的位置 -->
      <template #desc>
        <div style="margin-top: 10px;">Information</div>
      </template>
      <template #tags>
        <van-tag v-for="(tag, index) in tags" :key="index" plain type="primary" style="margin-top: 20px;" class="person-tag">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="goTologin">Login</van-button>
        <van-button size="mini" @click="goTologin">Exit</van-button>
      </template>
    </van-card>

    <div class="cella" style="padding-bottom: 50px;">
      <van-cell is-link title="History" @click="goToFraction" icon="chart-trending-o" class="cell-no-border" />
      <van-cell is-link title="AI Character" @click="goToAIImage" icon="user-circle-o" />
      <van-cell is-link title="My Team" @click="goToMygroup" icon="friends-o" class="cell-no-border" />
      <van-cell is-link title="Help" @click="goToHelp" icon="service-o" class="cell-no-border" />
      <van-cell is-link title="Setting" @click="goToSelectSet" icon="setting-o" />
      <van-cell is-link title="ServerSetting" @click="goToServer" icon="setting-o" class="cell-no-border" />
    </div>
  </div>
</template>

<script>
import { showToast } from 'vant';
import { NavBar, Button, Cell, Icon, Card, Tag } from 'vant';

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
      savedName: '', // 将 savedName 移到 data 中
      tags: ['关注：0', '粉丝：0', '训练时长：0']
    };
  },
  mounted() {
    // 在 mounted 钩子中获取用户名
    this.savedName = localStorage.getItem('userName') || 'Please Login';
    console.log('savedName:', this.savedName);
  },
  methods: {
    handleLeftClick() {
      showToast('左侧图标被点击');
    },
    handleRightClick1() {
      showToast('手表图标被点击');
    },
    handleRightClick2() {
      showToast('右侧图标被点击');
    },
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
    }
  }
};
</script>

<style scoped>
/* 设置页面背景图 */
.example-page {
  background-image: url('@/assets/img/background_mine.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

/* 将导航栏van-nav-bar固定在顶部 */
.custom-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
}

.content {
  text-align: center;
  padding-top: 42px;
  color: #0a0707;
  font-size: 10px;
}

/* 在你的样式文件中 */
.cella ::v-deep .van-cell__title {
  font-size: 15px;
}
.cella ::v-deep .van-cell__left-icon {
  font-size: 23px;
  margin-right: 16px;
  font-weight: 600;
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
  color: #000;
}

.right-icons .van-icon {
  margin-left: 20px;
}
.right-icons img {
  margin-left: 20px;
}

/* 设置卡片背景透明 */
.preson-card {
  background-color: transparent !important;
  border-radius: 10px;
  padding: 10px;
}

/* 设置单元格背景透明 */
.cella ::v-deep .van-cell {
  background-color: transparent !important;
}

/* 设置按钮背景透明 */
.van-button--primary {
  background-color: rgba(255, 69, 0, 0.7) !important;
  border: none !important;
}

::v-deep .van-card__thumb {
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-tag {
  background-color: rgba(255, 255, 255, 0.7);
  color: #808080 !important;
  padding: 3px 10px;
  border-radius: 50px;
  font-size: 10px;
  margin-right: 10px;
}
</style>