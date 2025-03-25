<script setup>
import { ref, onMounted } from "vue";

const ipAddress = ref(localStorage.getItem("userIP") || "");const savedIP = ref("");

onMounted(() => {
  savedIP.value = localStorage.getItem("userIP") || "未设置 IP";
});

const saveIP = () => {
  if (ipAddress.value) {
    localStorage.setItem("userIP", ipAddress.value);
    alert("IP 地址已保存！");
  } else {
    alert("请输入有效的 IP 地址！");
  }
};

const goBack = () => {
  window.history.back(); // 返回上一页
};
</script>

<template>
  <van-nav-bar
    title="Server Setting"
    left-text="Back"
    left-arrow
    @click-left="goBack"
  />
  <div class="container">
    <h2>当前保存的 IP 地址：</h2>
    <p>{{ savedIP }}</p>
    <h2>请输入服务器 IP 地址：</h2>
    <input v-model="ipAddress" placeholder="输入 IP 地址" />
    <button @click="saveIP">确认</button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}
input {
  padding: 8px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  padding: 8px 16px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
