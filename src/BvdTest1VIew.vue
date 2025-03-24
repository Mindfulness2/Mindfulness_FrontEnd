<template>
  <van-nav-bar
      title="Video"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div>
      <BilibiliVideo videoId="BV1h7oyYbEU7" />
    </div>
  </template>
  
  <script>
  import BilibiliVideo from './BilibiliVideo.vue';
  
  export default {
    name: 'BvdTestComponent',
    components: {
      BilibiliVideo,
    },
    methods: {
      goBack() {
        this.$router.go(-1); // 返回上一页
      },
    },
  };
  </script>
 