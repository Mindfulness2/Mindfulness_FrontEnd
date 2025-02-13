<template>
  <van-tabbar v-if="showNavbar" v-model="active">
    <van-tabbar-item  to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item  to="/function" icon="eye-o">功能</van-tabbar-item>
    <!-- <van-tabbar-item replace to="/friends" icon="friends-o">功能2</van-tabbar-item> -->
    <van-tabbar-item  to="/mine" icon="contact-o">我的</van-tabbar-item>
    <!-- <van-tabbar-item replace icon="setting-o" @click="goToLogin">我的</van-tabbar-item> -->
  </van-tabbar>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const active = ref('home'); // 默认值
    const route = useRoute();

    // 监听路由变化，动态更新 active
    watch(() => route.path, (newPath) => {
      if (newPath === '/home') {
        active.value = 'home';
      } else if (newPath === '/function') {
        active.value = 'function';
      } else if (newPath === '/mine') {
        active.value = 'mine';
      } else {
        active.value = ''; // 如果不在首页、功能页或我的页，清除 active 值
      }
    });

    return { active };
  },
  computed: {
    showNavbar() {
      const currentPath = this.$route.path;
      const hiddenPaths = ['/login', '/register', '/profile'];
      return !hiddenPaths.includes(currentPath);
    }
  }
};
</script>