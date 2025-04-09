<template>
  <van-nav-bar
    title="Mindfulness Countdown"
    left-text="Back"
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
      <!-- Start Button -->
      <div class="image-button" @click="startCountdown">
        <img src="@/assets/img/yun1.png" alt="Start" />
      </div>

      <!-- Pause Button -->
      <div class="image-button" @click="pauseCountdown">
        <img src="@/assets/img/yun2.png" alt="Pause" />
      </div>

      <!-- End Button -->
      <div class="image-button" @click="handleEndOrComplete">
        <img src="@/assets/img/yun3.png" alt="End" />
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
  <!-- Bottom Image -->
  <div class="bottom-image">
    <img :src="require('@/assets/img/GIF.gif')" alt="Bottom Image" />
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
    const startTime = ref(10); // Initial countdown time (seconds)
    const currentTime = ref(startTime.value);
    const countdownTimer = ref(null);
    const countdownStatus = ref("start"); // Countdown status: start, active, pause
    const showPopup = ref(false); // Control popup visibility

    const totalLength = 2 * Math.PI * 90; // Circumference of the circle

    const elapsedTime = computed(() => startTime.value - currentTime.value);
    const progressDash = computed(() => (elapsedTime.value / startTime.value) * totalLength);

    // Format time
    const formatTime = computed(() => {
      const minutes = Math.floor(currentTime.value / 60);
      const seconds = currentTime.value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    });

    const startCountdown = () => {
      if (countdownTimer.value) clearInterval(countdownTimer.value);
      
      // If the current status is "pause", resume countdown without resetting time
      if (countdownStatus.value === "pause") {
        countdownStatus.value = "active";
      } else {
        // If starting for the first time or restarting, reset time
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
      showPopup.value = true; // Show popup
    };

    const completeCountdown = () => {
      //router.push("/talktoai");
      router.push("/exp");
    };

    const cancelCountdown = () => {
      showPopup.value = false;
      countdownStatus.value = "pause"; // Restore pause state
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
  flex-direction: row; /* Horizontal alignment */
  gap: 20px; /* Spacing between buttons */
  align-items: center;
  justify-content: center;
  width: 80%;
}

.image-button {
  width: 30%; /* Each button occupies 30% of the container width */
  height: 100px; /* Button height */
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
/* Bottom image styles */
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
