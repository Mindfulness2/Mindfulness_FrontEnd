<template>
  <div class="simple-page">
    <!-- 返回按钮 -->
    <van-nav-bar
      title="忠！诚！"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    
    <!-- 页面内容 -->
    <div class="content">
      <h1>晚睡！</h1>
      <img src="@/assets/img/NK.png" alt="晚睡！" />
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'SimplePage',
  components: {
    [NavBar.name]: NavBar,
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
  },
};
</script>

<style scoped>
.content {
  text-align: center; /* 居中对齐 */
  margin-top: 50px;
}
img {
  max-width: 100%; /* 确保图片自适应屏幕宽度 */
  height: auto;
  margin-top: 20px;
}
</style>