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
        <p>{{ message.text }}</p>
        <span class="timestamp">{{ message.time }}</span>
      </div>
    </div>
  </div>

  <!-- 输入框和发送按钮 -->
  <div class="chat-input">
    <input
      type="text"
      placeholder="输入消息..."
      v-model="newMessage"
      @keypress.enter="sendMessage"
    />
    <button @click="sendMessage">发送</button>
  </div>
</div>
</template>

<script>
export default {
data() {
  return {
    messages: [], // 聊天记录
    newMessage: '', // 当前输入的消息
    avatar: require('@/assets/img/NK.png'), // AI头像路径
  };
},
methods: {
  goBack() {
    this.$router.back(); // 返回上一页
  },
  sendMessage() {
    if (this.newMessage.trim() === '') return;

    // 添加用户消息
    this.messages.push({
      author: 'user',
      text: this.newMessage,
      time: this.formatTime(new Date()),
    });

    // 模拟 AI 回复
    setTimeout(() => {
      this.messages.push({
        author: 'ai',
        text: '我是AI助手，为您提供帮助，以下是根据您的问题所建立的回复：',
        time: this.formatTime(new Date()),
      });
      // 自动滚动到底部
      this.scrollToBottom();
    }, 1000);

    // 清空输入框
    this.newMessage = '';
    this.scrollToBottom();
  },
  formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },
  scrollToBottom() {
    const element = this.$refs.chatHistory;
    element.scrollTop = element.scrollHeight;
  },
},
mounted() {
  // 初始滚动到底部
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

/* 调整图片大小 */
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
padding: 8px 10px;
border-radius: 10px;
max-width: 70%;
position: relative;
display: flex;
align-items: flex-start;
flex-direction: column; /* 垂直排列消息内容 */
}

.message-content {
display: flex;
flex-direction: column;
align-items: flex-start;
}

/* 用户发送的消息靠右 */
.message.user {
background-color: #e2f0f9;
align-self: flex-end;
}

/* AI发送的消息靠左 */
.message.ai {
background-color: #f9f9f9;
align-self: flex-start;
margin-left: 40px; /* 向右移动一点 */
}
.message.ai::before {
content: '';
position: absolute;
left: -10px;
top: 10px;
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
top: 5px;
left:-40px; /* 调整头像位置，使其位于消息框右侧 */
}

.message p {
margin: 0;
font-size: 14px;
}

.timestamp {
color: #888;
font-size: 10px;
margin-left: 5px;
}

.chat-input {
padding: 10px;
background-color: #fff;
display: flex;
border-top: 1px solid #ddd;
}

.chat-input input {
flex: 1;
padding: 8px;
border: none;
border-radius: 20px;
margin-right: 10px;
font-size: 14px;
}

.chat-input button {
padding: 8px 16px;
border: none;
border-radius: 20px;
background-color: #07c160;
color: #fff;
font-size: 14px;
cursor: pointer;
}

.chat-input button:hover {
background-color: #06ae56;
}
</style>