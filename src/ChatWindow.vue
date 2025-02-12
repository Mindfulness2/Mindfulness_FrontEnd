<template>
  <!-- 聊天窗口容器 -->
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <!-- 聊天历史 -->
        <div ref="chatContainer" class="chat-container">
          <div v-for="(message, index) in chatHistory" :key="index">
            <!-- 用户消息 -->
            <div v-if="message.sender === 'user'" class="user-message">
              {{ message.content }}
            </div>
            <!-- Kimi 消息 -->
            <div v-else-if="message.sender === 'kimi'" class="kimi-message">
              {{ message.content }}
            </div>
          </div>
        </div>

        <!-- 输入框 -->
        <v-text-field
          v-model="newMessage"
          label="输入消息"
          variant="solo"
          full-width
          class="mt-4"
        >
          <template #append>
            <v-btn
              @click="sendMessage"
              color="primary"
              :disabled="!newMessage"
              prepend-icon="mdi-send"
            >
              发送
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'ChatWindow',
  setup() {
    const chatHistory = ref([]);
    const newMessage = ref('');
    const chatContainer = ref(null);

    // 初始化聊天历史
    chatHistory.value = [
      {
        sender: 'kimi',
        content: '欢迎使用聊天窗口！',
      },
    ];

    // 发送消息到后端获取 Kimi 响应
    async function sendMessage() {
      const userMessage = {
        sender: 'user',
        content: newMessage.value,
      };
      chatHistory.value.push(userMessage);

      // 清空输入框
      newMessage.value = '';

      // 模拟与后端交互（这里替换为实际的 API 调用）
      try {
        const response = await axios.post(
          '/api/getKimiResponse', // 替换为 Kimi 的实际 API 地址
          { userMessage: userMessage.content }
        );
        
        const kimiMessage = {
          sender: 'kimi',
          content: response.data.reply,
        };
        chatHistory.value.push(kimiMessage);
      } catch (error) {
        console.error('API 请求失败:', error);
        const kimiMessage = {
          sender: 'kimi',
          content: '抱歉，我暂时无法连接到服务器。',
        };
        chatHistory.value.push(kimiMessage);
      }

      // 滚动到底部
      scrollToBottom();
    }

    // 滚动到底部
    const scrollToBottom = () => {
      setTimeout(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      }, 100);
    };

    // 初始滚动到底部
    onMounted(() => {
      scrollToBottom();
    });

    return {
      chatHistory,
      newMessage,
      chatContainer,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.chat-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  padding: 12px;
  margin-bottom: 20px;
  background-color: white; /* 确保背景色不是透明 */
}

.user-message {
  background-color: #e0e0e0;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 8px 0;
  text-align: right;
}

.kimi-message {
  background-color: #00ff002d;
  color: #007000;
  padding: 8px 12px;
  border-radius: 15px;
  margin: 8px 0;
  text-align: left;
}
</style>