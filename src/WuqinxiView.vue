<template>
  <van-nav-bar
      title="YOGA"
      left-text="Back"
      left-arrow
      @click-left="goBack"
      class="fixed-nav-bar"
    />
    <div class="header-image">
     <img src="@/assets/img/homep2.jpg" alt="封面图片" class="img-fluid" />
    </div>
    <div class="button-container">
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToVideoPage('BV1gb4y1B7jN')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV1gb4y1B7jN.jpg"
            alt="Button 1"
            class="image"
          />
          <span class="button-text">Course 1</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToVideoPage('BV1U34y1U78j')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV1U34y1U78j.jpg"
            alt="Button 2"
            class="image"
          />
          <span class="button-text">Course 2</span>
        </van-button>
      </div>
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToVideoPage('BV1V5411J7iF')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV1V5411J7iF.jpg"
            alt="Button 3"
            class="image"
          />
          <span class="button-text">Course 3</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToVideoPage('BV14E411R7en')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV14E411R7en.jpg"
            alt="Button 4"
            class="image"
          />
          <span class="button-text">Course 4</span>
        </van-button>
      </div>
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToVideoPage('BV17f4y1e7Ga')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV17f4y1e7Ga.jpg"
            alt="Button 5"
            class="image"
          />
          <span class="button-text">Course 5</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToVideoPage('BV197411E79U')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV197411E79U.png"
            alt="Button 6"
            class="image"
          />
          <span class="button-text">Course 6</span>
        </van-button>
      </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const loading = ref(false);

const goToVideoPage = (videoId) => {
  loading.value = true;
  setTimeout(() => {
    router.push({ path: '/bvdtest1', query: { videoId } }); // 使用查询参数传递videoId
    loading.value = false;
  }, 1); // 模拟加载时间
};
const goBack = () => {
  router.go(-1); // 返回上一页
};
</script>
  
<style scoped>
.fixed-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header-image {
  margin-top: 50px; /* 确保内容不会被导航栏遮挡 */
  width: 100%;
  margin-bottom: 0px;
}

.header-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding-bottom: 60px;
  border: 2px solid #8B4513; /* 棕色边框 */
  border-radius: 10px; /* 圆角边框 */
  border-bottom: 2px solid #8B4513; /* 棕色底边框 */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.button-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.image-button {
  flex: 1;
  max-width: 48%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* 添加相对定位 */
  overflow: hidden; /* 防止图片超出按钮框 */
}

.image-button img {
  width: 100%; /* 图片宽度设置为100%，铺满按钮框 */
  height: 100%; /* 图片高度设置为100%，铺满按钮框 */
  object-fit: cover; /* 保持图片的宽高比例，裁剪多余部分 */
  border-radius: 8px; /* 与按钮框的圆角保持一致 */
}

.button-text {
  font-size: 14px;
  color: #333333;
  position: absolute; /* 绝对定位 */
  top: 93%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 精确居中 */
}
</style>