<template>
  <van-nav-bar
    title="AI对话"
    left-text="返回"
    left-arrow
    @click-left="goBack"
  />
  <div class="container">
    <img :src="require('@/assets/img/imggif1.gif')" alt="Looping GIF" />
  </div>

  <div class="chat-container">
    <!-- 聊天记录容器 -->
    <div class="chat-history" ref="chatHistory">
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.author]">
        <!-- AI头像 -->
        <img :src="avatar" class="ai-avatar" v-if="message.author === 'ai'" />

        <!-- 消息内容 -->
        <div class="message-content">
          <div v-if="message.type === 'audio'" class="audio-message">
            <div class="bubble">
              <div class="button-container" @click="toggleAudio(message)">
                <span class="play-icon" :class="{ 'playing' : message.isPlaying }"></span>
                <span class="duration">{{ message.duration }}″</span>
              </div>
            </div>
          </div>
          <p v-else>{{ message.text }}</p>
          <span class="timestamp">{{ message.time }}</span>
        </div>
      </div>
    </div>

    <!-- 录音按钮 -->
    <div class="chat-input">
      <button @click="toggleRecording" :class="{ 'recording' : isRecording }">
        <img 
          :src="isRecording ? require('@/assets/img/stop.png') : require('@/assets/img/macfeng.png')"
          alt="录制按钮"
          class="button-icon"
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [], // 聊天记录
      avatar: require('@/assets/img/NK.png'), // AI头像路径
      mediaRecorder: null, // 录音实例
      audioChunks: [], // 存储录音片段
      isRecording: false, // 录音状态
      recognition: null, // 语音识别实例
      currentAudio: null, // 当前播放的音频
      startTime: null, // 录音开始时间
    };
  },
  methods: {
    goBack() {
      this.$router.back(); // 返回上一页
    },
    // 切换录音状态
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    // 开始录音
    async startRecording() {
      try {
        // 请求麦克风权限
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.startTime = Date.now(); // 记录开始时间

        // 监听数据可用事件
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };

        // 监听停止事件
        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(audioBlob);

          // 手动计算时长
          const endTime = Date.now();
          const duration = Math.floor((endTime - this.startTime) / 1000);

          // 添加用户消息
          this.messages.push({
            author: 'user',
            type: 'audio',
            src: audioUrl,
            time: this.formatTime(new Date()),
            duration: duration, // 手动计算的时长
            isPlaying: false,
          });

          // 模拟 AI 回复
          setTimeout(() => {
            this.messages.push({
              author: 'ai',
              text: '收到你的音频消息，正在处理中...',
              time: this.formatTime(new Date()),
            });
            this.scrollToBottom();
          }, 1000);

          // 清空录音片段
          this.audioChunks = [];
          this.scrollToBottom();
        };

        // 开始录音
        this.mediaRecorder.start();
        this.isRecording = true;
      } catch (error) {
        console.error('无法开始录音：', error);
        alert('无法访问麦克风，请检查权限设置');
      }
    },
    // 停止录音
    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    formatTime(date) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    scrollToBottom() {
      const element = this.$refs.chatHistory;
      element.scrollTop = element.scrollHeight;
    },
    // 播放/暂停音频
    toggleAudio(message) {
      if (message.type !== 'audio') return;

      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio = null;
      }

      if (message.isPlaying) {
        // 暂停播放
        this.currentAudio.pause();
        message.isPlaying = false;
      } else {
        // 播放音频
        const audio = new Audio(message.src);
        audio.play();
        message.isPlaying = true;
        this.currentAudio = audio;

        // 监听播放结束
        audio.onended = () => {
          message.isPlaying = false;
          this.currentAudio = null;
        };
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height:  100px; 
}

.container img {
  max-width: 30%; /* 控制图片宽度 */
}

.chat-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 150px; /* 下调高度 */
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 确保默认靠左 */
}

.message {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 70%;
  position: relative;
}

/* 用户发送的消息靠右 */
.message.user {
  align-self: flex-end;
  margin-right: 10px;
}

/* AI发送的消息靠左 */
.message.ai {
  align-self: flex-start;
  margin-left: 40px; /* 向右移动一点 */
  margin-right: 10px;
}

.message.ai::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 10px 5px 0;
  border-color: transparent #f9f9f9 transparent transparent;
}

/* AI头像样式 */
.ai-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  top: 7px;
  left: -40px; /* 调整头像位置，使其位于消息框右侧 */
}

.message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 文本消息样式 */
.message p {
  margin: 0;
  font-size: 14px;
  word-break: break-word;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #e2f0f9;
}

/* AI文本消息样式 */
.message.ai p {
  background-color: #f9f9f9;
}

/* 语音消息样式 */
.audio-message {
  display: flex;
  align-items: center;
}

.bubble {
  position: relative;
  width: 120px;
  height: 35px;
  background-color: #e2f0f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble:before {
  content: '';
  position: absolute;
  top: 13px;
  right: -7px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px;
  border-color: transparent transparent transparent #e2f0f9;
}

.message.ai .bubble {
  background-color: #f9f9f9;
}

.message.ai .bubble:before {
  border-color: transparent #f9f9f9 transparent transparent;
  left: -7px;
  right: auto;
}

.button-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 10px;
}

.play-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 0 6px 9px;
  border-color: transparent transparent transparent #333;
  margin-right: 10px;
}


.duration {
  font-size: 12px;
  color: #888;
}

.timestamp {
  display: block;
  font-size: 10px;
  color: #999;
  margin-top: 5px;
  white-space: nowrap;
}

.chat-input {
  padding: 10px;
  background-color: #fff;
  display: flex;
  border-top: 1px solid #ddd;
  justify-content: center; /* 按钮居中 */
}

.chat-input button:hover {
  background-color: #66b1ff;
}

.chat-input button.recording {
  background-color: #f56c6c;
}

.chat-input button.recording:hover {
  background-color: #f78989;
}
.chat-input button {
  width: 50px; /* 调整按钮宽度 */
  height: 50px; /* 调整按钮高度 */
  border-radius: 50%; /* 圆形按钮 */
  border: none;
  cursor: pointer;
  background-color: #31a75e; /* 深蓝色背景 */
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 2px 8px rgba(46, 196, 96, 0.1); /* 添加阴影 */
}

.chat-input button:hover {
  background-color: #41a546; /* 鼠标悬停时颜色加深 */
  transform: translateY(-1px); /* 微微上移 */
}

.chat-input button.recording {
  background-color: #c0392b; /* 录制时深红色背景 */
}

.chat-input button.recording:hover {
  background-color: #e74c3c; /* 录制时鼠标悬停颜色 */
}

.chat-input .button-icon {
  width: 25px; /* 图标宽度 */
  height: 25px; /* 图标高度 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>