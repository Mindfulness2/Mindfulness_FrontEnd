<template>
    <div class="register-page">
      <van-nav-bar title="注册" left-text="返回" right-text="登录" @click-left="$router.back()" @click-right="$router.push('/login')" />
  
      <van-form @submit="onSubmit">
        <van-cell-group>
          <!-- 姓名输入框 -->
          <van-field
            v-model="username"
            name="username"
            label="姓名"
            placeholder="请输入您的姓名"
            :rules="[{ required: true, message: '请输入您的姓名' }]"
          />
  
          <!-- 密码输入框 -->
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>
  
        <div class="submit-button">
          <van-button round block type="info" native-type="submit">
            注册
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  
  <script>
  import { Field, Button, CellGroup, NavBar } from 'vant';
  
  export default {
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [CellGroup.name]: CellGroup,
      [NavBar.name]: NavBar,
    },
    data() {
      return {
        username: '', // 用户名
        password: '', // 密码
      };
    },
    methods: {
      onSubmit() {
        // 这里可以处理注册逻辑，比如发送请求到后端
        console.log('注册信息:', {
          username: this.username,
          password: this.password,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .submit-button {
    margin: 20px;
  }
  </style>