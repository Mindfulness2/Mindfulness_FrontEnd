<template>
  <div class="login-view">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="goBack" />

    <!-- 登录表单 -->
    <div class="login-form">
      <van-cell-group inset>
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>

      <!-- 登录按钮 -->
      <div style="margin: 24px;">
        <van-button
          round
          block
          type="primary"
          @click="handleLogin"
          :loading="loading"
          :disabled="!username || !password"
        >
          登录
        </van-button>
      </div>

      <!-- 注册链接 -->
      <div class="register-link">
        <span>还没有账号？</span>
        <a @click="goToRegister">立即注册</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true;

        // 发送登录请求
        const response = await fetch(
          `http://localhost:3000/api/login?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // 登录成功，存储用户名并跳转
          localStorage.setItem('userName', data.data.username);
          alert('登录成功');
          this.$router.push('/home');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('登录错误:', error);
        alert('登录失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.back();
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.login-form {
  padding: 20px;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  color: #666;
}

a {
  color: #1989fa;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>