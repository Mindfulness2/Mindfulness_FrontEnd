<template>
  <van-nav-bar
    title="正念倒计时"
    left-text="返回"
    left-arrow
    @click-left="$router.go(-1)"
    :border="false"
    safe-area-inset-top
  >
    <template #right>
      <div class="nav-right"></div>
    </template>
  </van-nav-bar>

  <div class="countdown-container">
    <div class="countdown">
      <div class="time-display">{{ formatTime }}</div>
    </div>

    <div class="button-group">
      <!-- 开始按钮 -->
      <div class="image-button" @click="startCountdown">
        <img src="@/assets/img/yun1.png" alt="开始" />
      </div>

      <!-- 暂停按钮 -->
      <div class="image-button" @click="pauseCountdown">
        <img src="@/assets/img/yun2.png" alt="暂停" />
      </div>

      <!-- 结束按钮 -->
      <div class="image-button" @click="handleEndOrComplete">
        <img src="@/assets/img/yun3.png" alt="结束" />
      </div>
    </div>
  </div>

  <van-popup
    v-model:show="showPopup"
    position="bottom"
    :style="{ height: '20%' }"
  >
    <div class="popup-content">
      <van-button
        block
        type="primary"
        class="popup-button"
        @click="completeCountdown"
      >
      Finish
      </van-button>
      <van-button
        block
        type="default"
        class="popup-button"
        @click="cancelCountdown"
      >
      Cancel
      </van-button>
    </div>
  </van-popup>
  <!-- 页面底部显示图片 -->
  <div class="bottom-image">
    <img :src="require('@/assets/img/GIF.gif')" alt="底部图片" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { NavBar, Button, Popup } from "vant";

export default {
  name: "CountdownApp",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  setup() {
    const router = useRouter();
    const startTime = ref(10); // 倒计时初始时间（秒）
    const currentTime = ref(startTime.value);
    const countdownTimer = ref(null);
    const countdownStatus = ref("start"); // 倒计时状态：start、active、pause
    const showPopup = ref(false); // 控制弹窗显示

    const totalLength = 2 * Math.PI * 90; // 圆的周长

    const elapsedTime = computed(() => startTime.value - currentTime.value);
    const progressDash = computed(() => (elapsedTime.value / startTime.value) * totalLength);

    // 格式化时间
    const formatTime = computed(() => {
      const minutes = Math.floor(currentTime.value / 60);
      const seconds = currentTime.value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    });

    const startCountdown = () => {
      if (countdownTimer.value) clearInterval(countdownTimer.value);
      
      // 如果当前状态是“暂停”，则直接恢复倒计时，不重置时间
      if (countdownStatus.value === "pause") {
        countdownStatus.value = "active";
      } else {
        // 如果是首次开始或重新开始，则重置时间
        currentTime.value = startTime.value;
        countdownStatus.value = "active";
      }

      countdownTimer.value = setInterval(() => {
        if (currentTime.value <= 0) {
          handleEndOrComplete();
        } else {
          currentTime.value--;
        }
      }, 1000);
    };

    const pauseCountdown = () => {
      clearInterval(countdownTimer.value);
      countdownStatus.value = "pause";
    };

    const handleEndOrComplete = () => {
      clearInterval(countdownTimer.value);
      countdownStatus.value = "start";
      showPopup.value = true; // 显示弹窗
    };

    const completeCountdown = () => {
      //router.push("/talktoai");
      router.push("/exp");
    };

    const cancelCountdown = () => {
      showPopup.value = false;
      countdownStatus.value = "pause"; // 恢复暂停状态
    };

    return {
      formatTime,
      countdownStatus,
      showPopup,
      startCountdown,
      pauseCountdown,
      handleEndOrComplete,
      completeCountdown,
      cancelCountdown,
      progressDash,
      totalLength,
    };
  },
};
</script>

<style scoped>
.countdown-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 90vh;
  background-color: #FEFDFC;
  /* background-image: url('@/assets/img/GIF.gif'); */
  /* background-size: cover; */
  /* background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('@/assets/img/bjt.jpg') no-repeat center center;
  background-size: cover; */
}

.countdown {
  position: relative;
  width: 200px;
  height: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.time-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  font-weight: bold;
  color: #4e749c;
  text-align: center;
  width: 100%;
}

.button-group {
  display: flex;
  flex-direction: row; /* 修改为水平排列 */
  gap: 20px; /* 按钮之间的间距 */
  align-items: center;
  justify-content: center;
  width: 80%;
}

.image-button {
  width: 30%; /* 每个按钮占据容器宽度的30% */
  height: 100px; /* 设置按钮高度 */
  cursor: pointer;
  background: #FEFDFC;
}

.image-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
}

.popup-button {
  width: 100%;
  padding: 12px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-right {
  flex: 1;
}
/* 页面底部图片样式 */
.bottom-image {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: #f5f5f5;
  margin-bottom: 50px;
}

.bottom-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>