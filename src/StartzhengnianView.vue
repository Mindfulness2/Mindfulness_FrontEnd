<template>
    <van-nav-bar
      title="倒计时"
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
        <!-- SVG 进度圆环 -->
        <svg class="progress-ring" viewBox="0 0 200 200">
          <!-- 背景圆环 -->
          <circle
            class="ring-background"
            cx="100"
            cy="100"
            r="90"
            fill="transparent"
            stroke="#ddd"
            stroke-width="10"
            transform="rotate(-90 100 100)" 
          />
          <!-- 进度圆环 -->
          <circle
            class="ring-progress"
            cx="100"
            cy="100"
            r="90"
            fill="transparent"
            stroke="#409eff"
            stroke-width="10"
            stroke-linecap="round"
            :stroke-dasharray="`${progressDash}, ${totalLength}`"
            transform="rotate(-90 100 100)" 
          />
        </svg>
        <div class="time-display">{{ formatTime }}</div>
      </div>
  
      <div class="button-group">
        <van-button
          v-show="countdownStatus === 'start'"
          type="primary"
          class="countdown-button"
          @click="startCountdown"
        >
          开始倒计时
        </van-button>
  
        <van-button
          v-show="countdownStatus === 'pause'"
          type="primary"
          class="countdown-button"
          @click="resumeCountdown"
        >
          继续
        </van-button>
  
        <van-button
          v-show="countdownStatus === 'active'"
          type="default"
          class="countdown-button"
          @click="pauseCountdown"
        >
          暂停
        </van-button>
  
        <van-button
          type="danger"
          class="countdown-button"
          @click="handleEndOrComplete"
        >
          结束
        </van-button>
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
          完成
        </van-button>
        <van-button
          block
          type="default"
          class="popup-button"
          @click="cancelCountdown"
        >
          取消
        </van-button>
      </div>
    </van-popup>
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
        countdownStatus.value = "active";
        currentTime.value = startTime.value;
  
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
  
      const resumeCountdown = () => {
        if (countdownTimer.value) clearInterval(countdownTimer.value);
        countdownStatus.value = "active";
        countdownTimer.value = setInterval(() => {
          if (currentTime.value <= 0) {
            handleEndOrComplete();
          } else {
            currentTime.value--;
          }
        }, 1000);
      };
  
      const completeCountdown = () => {
        router.push("/talktoai"); // 跳转到下一级界面
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
        resumeCountdown,
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
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .countdown {
    position: relative;
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
  
  .progress-ring {
    width: 100%;
    height: 100%;
  }
  
  .ring-background, .ring-progress {
    stroke-linecap: round;
  }
  
  .time-display {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    font-weight: bold;
    color: #333;
    text-align: center;
    width: 100%;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    width: 70%;
  }
  
  .countdown-button {
    width: 80%;
    padding: 12px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  </style>