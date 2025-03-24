<template>
  <van-nav-bar
      title="瑜伽课程"
      left-text="返回"
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
          @click="goToPage('/bvdtest1')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV1gb4y1B7jN.jpg"
            alt="Button 1"
            class="image"
          />
          <span class="button-text">课程1</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToPage('/bvdtest1')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV1U34y1U78j.jpg"
            alt="Button 2"
            class="image"
          />
          <span class="button-text">课程2</span>
        </van-button>
      </div>
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToPage('/bvdtest1')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV1V5411J7iF.jpg"
            alt="Button 3"
            class="image"
          />
          <span class="button-text">课程3</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToPage('/bvdtest1')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV14E411R7en.jpg"
            alt="Button 4"
            class="image"
          />
          <span class="button-text">课程4</span>
        </van-button>
      </div>
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToPage('/bvdtest1')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV17f4y1e7Ga.jpg"
            alt="Button 5"
            class="image"
          />
          <span class="button-text">课程5</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToPage('/bvdtest1')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="@/assets/img/yuga/BV197411E79U.png"
            alt="Button 6"
            class="image"
          />
          <span class="button-text">课程6</span>
        </van-button>
      </div>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const loading = ref(false);

const goToPage = (path) => {
  loading.value = true;
  setTimeout(() => {
    router.push(path);
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
}

.image-button img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.button-text {
  font-size: 14px;
  color: #333333;
}
</style>