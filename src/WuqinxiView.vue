<template>
  <van-nav-bar
      title="五禽戏"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
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
            src="https://via.placeholder.com/50"
            alt="Button 1"
            class="image"
          />
          <span class="button-text">按钮1</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToPage('/page2')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="https://via.placeholder.com/50"
            alt="Button 2"
            class="image"
          />
          <span class="button-text">按钮2</span>
        </van-button>
      </div>
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToPage('/page3')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="https://via.placeholder.com/50"
            alt="Button 3"
            class="image"
          />
          <span class="button-text">按钮3</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToPage('/page4')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="https://via.placeholder.com/50"
            alt="Button 4"
            class="image"
          />
          <span class="button-text">按钮4</span>
        </van-button>
      </div>
      <div class="button-row">
        <van-button
          class="image-button"
          @click="goToPage('/page5')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="https://via.placeholder.com/50"
            alt="Button 5"
            class="image"
          />
          <span class="button-text">按钮5</span>
        </van-button>
        <van-button
          class="image-button"
          @click="goToPage('/page6')"
          :loading="loading"
          loading-type="spinner"
          loading-size="16"
        >
          <img
            src="https://via.placeholder.com/50"
            alt="Button 6"
            class="image"
          />
          <span class="button-text">按钮6</span>
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
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
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