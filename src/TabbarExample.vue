<template>
  <van-tabbar v-if="showNavbar" v-model="active">
    <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/function" icon="eye-o">功能</van-tabbar-item>
    <!-- <van-tabbar-item replace to="/friends" icon="friends-o">功能2</van-tabbar-item> -->
    <van-tabbar-item replace to="/mine" icon="contact-o">我的</van-tabbar-item>
    <!-- <van-tabbar-item replace icon="setting-o" @click="goToLogin">我的</van-tabbar-item> -->
  </van-tabbar>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const active = ref('home'); // 初始化 active 为 'home'
    return { active }; // 返回 active 供模板使用
    
  },
  computed: {
    // 判断是否显示导航栏
    showNavbar() {
      const currentPath = this.$route.path;
      // 隐藏导航栏的路径
      const hiddenPaths = ['/login', '/register', '/profile'];
      return !hiddenPaths.includes(currentPath);
    },
  },
};
</script>