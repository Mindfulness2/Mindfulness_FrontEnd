<template>
  <div class="login-view">
    <!-- Navigation Bar -->
    <van-nav-bar title="Login" left-text="Back" left-arrow @click-left="goBack" />

    <!-- Login Form -->
    <div class="login-form">
      <van-cell-group inset>
        <van-field
          v-model="username"
          label="Username"
          placeholder="Enter your username"
          :rules="[{ required: true, message: 'Please enter your username' }]"
        />
        <van-field
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          :rules="[{ required: true, message: 'Please enter your password' }]"
        />
      </van-cell-group>

      <!-- Login Button -->
      <div style="margin: 24px;">
        <van-button
          round
          block
          type="primary"
          @click="handleLogin"
          :loading="loading"
          :disabled="!username || !password"
        >
          Login
        </van-button>
      </div>

      <!-- Register Link -->
      <div class="register-link">
        <span>Don't have an account?</span>
        <a @click="goToRegister">Register now</a>
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

        // Send login request
        const response = await fetch(
          `http://localhost:3000/api/login?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Login successful, store username and navigate
          localStorage.setItem('userName', data.data.username);
          alert('Login successful');
          this.$router.push('/home');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed, please try again later');
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