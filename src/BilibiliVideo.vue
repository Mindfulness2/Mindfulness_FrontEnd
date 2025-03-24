<template>
    <div class="video-container">
      <iframe
        :src="videoUrl"
        frameborder="0"
        allowfullscreen
        @load="handleLoad"
        danmaku="0"
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BilibiliVideo',
    props: {
      videoId: {
        type: String,
        required: true, // 必须传入视频 ID
      },
    },
    computed: {
      videoUrl() {
        // 构造哔哩哔哩视频的嵌入 URL
        return `https://player.bilibili.com/player.html?bvid=${this.videoId}`; // 无弹幕
      },
    },
    methods: {
      handleLoad() {
        console.log('视频加载完成');
      },
    },
  };
  </script>
  
  <style scoped>
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 比例 */
    height: 0;
    overflow: hidden;
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  </style>