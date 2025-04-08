<template>
  <van-nav-bar
      title="Video"
      left-text="Back"
      left-arrow
      @click-left="goBack"
    />
    <div>
      <BilibiliVideo :videoId="videoId" />
    </div>
  </template>
  
  <script>
  import BilibiliVideo from './BilibiliVideo.vue';
  
  export default {
    name: 'BvdTestComponent',
    components: {
      BilibiliVideo,
    },
    data() {
      return {
        videoId: '', // 用于存储动态获取的videoId
      };
    },
    watch: {
      '$route.query.videoId'(newVal) {
        this.videoId = newVal; // 监听查询参数的变化，动态更新videoId
      }
    },
    created() {
      this.videoId = this.$route.query.videoId; // 初始化时获取查询参数中的videoId
    },
    methods: {
      goBack() {
        this.$router.go(-1); // 返回上一页
      },
    },
  };
  </script>
 