<template>
  <div class="chat-container">
    <div class="history-container">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in history"
          :key="index"
          :title="item.content"
          :label="item.time"
          :class="item.isMe ? 'me-message' : 'kimi-message'"
        />
      </van-cell-group>
    </div>
    <div class="input-container">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        rows="2"
        autosize
        type="textarea"
        @keypress.enter="sendMessage"
      />
      <van-button type="primary" size="small" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Cell, CellGroup, Field, Button } from 'vant';

export default {
  name: 'ChatWindow',
  components: {
    [Cell.name]: Cell,          // 局部注册 van-cell
    [CellGroup.name]: CellGroup, // 局部注册 van-cell-group
    [Field.name]: Field,        // 局部注册 van-field
    [Button.name]: Button,      // 局部注册 van-button
  },
  setup() {
    const history = ref([]);
    const message = ref('');

    // 模拟kimi回复函数
    const getKimiResponse = async (msg) => {
      try {
        const response = await fetch('https://api.kimi.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg }),
        });
        return response.json();
      } catch (error) {
        console.error('请求失败:', error);
        return { message: '抱歉，我暂时无法回复你。' };
      }
    };

    const sendMessage = async () => {
      if (!message.value.trim()) {
        return;
      }

      // 显示用户的消息
      history.value.push({
        content: message.value,
        time: new Date().toLocaleTimeString(),
        isMe: true,
      });

      // 发送请求并获取kimi的回复
      const response = await getKimiResponse(message.value);
      history.value.push({
        content: response.message,
        time: new Date().toLocaleTimeString(),
        isMe: false,
      });

      message.value = '';
    };

    return {
      history,
      message,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px) ; /* 50px 是假设的导航栏高度，根据实际调整 */
}

.history-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 40px;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
 
}

.me-message {
  background-color: #e5f4f7;
  color: #000;
}

.kimi-message {
  background-color: #f5f5f5;
  color: #006175;
}
</style>