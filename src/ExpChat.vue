<template>
    <div class="page-wrapper">
        <!-- 固定顶部：导航栏和 GIF -->
        <div class="top-fixed">
            <van-nav-bar title="Chat" left-text="Back" left-arrow @click-left="goBack" />
            <div class="gif-container">
                <img :src="require('@/assets/img/2.gif')" alt="Looping GIF" />
            </div>
        </div>

        <!-- 中间滚动区域：聊天消息 -->
        <div class="chat-container">
            <div class="messages-container" ref="messagesContainer">
                <div v-for="(message, index) in messages" :key="index"
                    :class="['message-wrapper', message.role === 'user' ? 'user-message-wrapper' : 'ai-message-wrapper']">
                    <div :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
                        {{ message.content }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 固定底部：输入栏 -->
        <div class="input-fixed">
            <div class="input-container">
                <div class="input-wrapper">
                    <textarea v-model="userInput" placeholder="Input message..." @keydown.enter.prevent="handleEnterKey"
                        class="message-input"></textarea>
                    <div class="button-group">
                        <button class="send-button" @click="sendMessage" :disabled="!userInput.trim()">
                            <i class="send-icon">➤</i>
                        </button>
                        <button @click="toggleVoiceInput" :disabled="isSending">
                            {{ isRecording ? '🛑' : '🎤' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';


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

// 发送消息
const sendMessage = async () => {
    if (!userInput.value.trim()) return;

    const userMessage = { role: "user", content: userInput.value };
    messages.value.push(userMessage);
    userInput.value = "";

    try {
        // 将历史消息中的 "ai" 转换为 "assistant"
        const mappedMessages = messages.value.map(msg =>
            msg.role === "ai" ? { ...msg, role: "assistant" } : msg
        );

        const payload = {
            model: "ft:LoRA/Qwen/Qwen2.5-32B-Instruct:s35lsgeihi:mindfulness:snbtwzwckaxeashhweyv",
            messages: [
                { role: "system", content: "You are a psychotherapist." },
                ...mappedMessages, // 使用转换后的消息
            ],
            stream: false,
            max_tokens: 4096,
            stop: null,
            temperature: 0.7,
            top_p: 0.7,
            top_k: 50,
            frequency_penalty: 0.5,
            n: 1,
            response_format: { type: "text" },
            tools: [
                {
                    type: "function",
                    function: {
                        description: "<string>",
                        name: "<string>",
                        parameters: {},
                        strict: false,
                    },
                },
            ],
        };

        console.log("发送的请求体:", JSON.stringify(payload)); // 调试用

        const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer sk-wfcetqgwvoubfgqtojnutyrmozbjzexylatyzojbbpstpazy",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`❌ API 响应失败: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("API 返回数据:", data); // 调试用

        const aiMessage = { role: "assistant", content: data.choices[0].message.content };
        messages.value.push(aiMessage);
        await nextTick();
    } catch (error) {
        console.error("❌ 与 SiliconFlow API 通信时出错:", error);
        messages.value.push({ role: "assistant", content: `抱歉，与AI服务通信时出错: ${error.message}` });
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
/* 整体页面布局 */
.page-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 固定顶部 */
.top-fixed {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
}

.gif-container {
  text-align: center;
  padding: 10px;
}

.gif-container img {
  max-width: 100%;
  height: auto;
}

/* 中间聊天区域 */
.chat-container {
  flex: 1;
  overflow: hidden;
}

.messages-container {
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}

/* 固定底部 */
.input-fixed {
  position: fixed; /* 改为 fixed，确保在安卓导航栏之上 */
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  padding: 10px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom)); /* 适配安卓导航栏 */
}

.input-container {
  width: 100%;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.message-input {
  flex: 1;
  resize: none;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 40px;
}

.button-group {
  margin-left: 10px;
  display: flex;
  gap: 5px;
}

.send-button,
button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #007bff;
  color: white;
}

.send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 消息样式 */
.message-wrapper {
  margin: 10px 0;
}

.user-message-wrapper {
  text-align: right;
}

.ai-message-wrapper {
  text-align: left;
}

.message {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 70%;
}

.user-message {
  background: #007bff;
  color: white;
}

.ai-message {
  background: #f0f0f0;
  color: black;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .chat-container {
    margin-bottom: calc(60px + env(safe-area-inset-bottom)); /* 为输入框留出空间 */
  }
}
</style>