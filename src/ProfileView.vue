<template>
  <van-nav-bar title="Talk To AI" left-text="Back" left-arrow @click-left="goBack" />

  <div class="container">
    <img :src="require('@/assets/img/imggif1.gif')" alt="Looping GIF" />
  </div>

  <div class="chat-container">
    <!-- Chat messages area -->
    <div class="messages-container" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index"
        :class="['message-wrapper', message.role === 'user' ? 'user-message-wrapper' : 'ai-message-wrapper']">
        <div :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
          {{ message.content }}
        </div>
      </div>
    </div>

    <!-- Input area -->
    <div class="input-container">
      <div class="input-wrapper">
        <textarea v-model="userInput" placeholder="输入消息..." @keydown.enter.prevent="handleEnterKey"
          class="message-input">
        </textarea>
        <div class="button-group">
          <button class="send-button" @click="sendMessage" :disabled="!userInput.trim()">
            <i class="send-icon">➤</i>
          </button>
          <!-- <button class="voice-button" @click="toggleVoiceInput">
            <i class="mic-icon" :class="{ 'recording': isRecording }">🎤</i>
          </button> -->
          <button @click="toggleVoiceInput" :disabled="isSending">
            {{ isRecording ? '🛑' : '🎤' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

const ipAddress = ref(localStorage.getItem("userIP") || ""); const savedIP = ref("");
onMounted(() => {
  savedIP.value = localStorage.getItem("userIP") || "localhost";
});


const userInput = ref('');
const messages = ref([
  { role: 'ai', content: 'Hello! I am an AI assistant, how can I help you?' }
]);

const messagesContainer = ref(null);
const isRecording = ref(false);
let recognition = null;

const goBack = () => {
  window.history.back(); // 返回上一页
};

// 初始化语音识别
const initSpeechRecognition = () => {
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
      };

      recognition.onend = () => {
        isRecording.value = false;
      };

      recognition.onerror = (event) => {
        console.error('语音识别错误:', event.error);
        isRecording.value = false;
      };
    } else {
      console.warn('浏览器不支持语音识别');
    }
  } catch (error) {
    console.error('初始化语音识别失败:', error);
  }
};

// 切换语音输入
const toggleVoiceInput = () => {
  if (!recognition) {
    initSpeechRecognition();
    if (!recognition) return;
  }

  if (isRecording.value) {
    recognition.stop();
  } else {
    try {
      recognition.start();
      isRecording.value = true;
    } catch (error) {
      console.error('启动语音识别失败:', error);
    }
  }
};

// 处理Enter键发送消息
const handleEnterKey = (event) => {
  if (!event.shiftKey) {
    sendMessage();
  }
};

// 格式化对话历史，将其转化为合适的prompt
const formatPrompt = (messages) => {
  return messages.map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`).join("\n");
};

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) return;

  const userMessage = { role: "user", content: userInput.value };
  messages.value.push(userMessage);
  userInput.value = "";

  try {
    const response = await fetch(`http://${ipAddress.value || "localhost"}:11434/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama3.2:3b", prompt: formatPrompt(messages.value) }),
    });

    if (!response.body) throw new Error("❌ API 响应为空");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const aiMessage = { role: "ai", content: "" };
    messages.value.push(aiMessage);

    let buffer = "";
    let reading = true;
    while (reading) {
      const { value, done } = await reader.read();
      if (done) {
        reading = false;
        break;
      }
      buffer += decoder.decode(value, { stream: true });
      let lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.response) {
            aiMessage.content += json.response;
            messages.value = [...messages.value]; // 触发响应式更新
            await nextTick();
          }
        } catch (error) {
          console.warn("❌ 解析 JSON 出错:", error, "内容:", line);
        }
      }
    }
  } catch (error) {
    console.error("❌ 与 Ollama 通信时出错:", error);
    messages.value.push({ role: "ai", content: "抱歉，与AI服务通信时出错。请稍后再试。" });
  }
};

// 监听消息变化，自动滚动到底部
watch(messages, () => {
  scrollToBottom();
}, { deep: true });

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 组件挂载时初始化
onMounted(() => {
  scrollToBottom();
  initSpeechRecognition();
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-wrapper {
  display: flex;
  width: 100%;
}

.user-message-wrapper {
  justify-content: flex-end;
}

.ai-message-wrapper {
  justify-content: flex-start;
}

.message {
  max-width: 70%;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  word-break: break-word;
  line-height: 1.4;
}

.user-message {
  background-color: #0084ff;
  color: white;
  border-top-right-radius: 0.2rem;
}

.ai-message {
  background-color: #e5e5ea;
  color: #333;
  border-top-left-radius: 0.2rem;
}

.input-container {
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  background-color: white;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  background-color: #f0f0f0;
  border-radius: 1.5rem;
  padding: 0.5rem 0.8rem;
}

.message-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  min-height: 1.5rem;
  max-height: 6rem;
  padding: 0.5rem 0;
  font-family: inherit;
  font-size: 1rem;
}

.button-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.send-button,
.voice-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  padding: 0;
}

.send-button {
  background-color: #0084ff;
  color: white;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.voice-button {
  background-color: #e5e5ea;
}

.send-icon,
.mic-icon {
  font-size: 1rem;
}

.recording {
  color: red;
}

@media (max-width: 600px) {
  .message {
    max-width: 85%;
  }
}
</style>