<script setup>
import { ref, onMounted } from "vue";

const ipAddress = ref(localStorage.getItem("userIP") || "");
const savedIP = ref("");

onMounted(() => {
  savedIP.value = localStorage.getItem("userIP") || "No IP set";
});

const saveIP = () => {
  if (ipAddress.value) {
    localStorage.setItem("userIP", ipAddress.value);
    alert("IP address saved!");
  } else {
    alert("Please enter a valid IP address!");
  }
};

const goBack = () => {
  window.history.back(); // Go back to the previous page
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
    <h2>Current saved IP address:</h2>
    <p>{{ savedIP }}</p>
    <h2>Please enter the server IP address:</h2>
    <input v-model="ipAddress" placeholder="Enter IP address" />
    <button @click="saveIP">Confirm</button>
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
