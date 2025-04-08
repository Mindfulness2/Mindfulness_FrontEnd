<template>
  <div class="register-page">
    <van-nav-bar 
      title="Register" 
      left-text="Back" 
      right-text="Login" 
      @click-left="goBack" 
      @click-right="goToLogin" 
    />
  
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- Username Input -->
        <van-field
          v-model="username"
          name="username"
          label="Username"
          placeholder="Enter your username"
          :rules="[{ required: true, message: 'Please enter your username' }]"
        />
  
        <!-- Password Input -->
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          :rules="[{ required: true, message: 'Please enter your password' }]"
        />
      </van-cell-group>
  
      <div class="submit-button">
        <van-button 
          round 
          block 
          type="primary" 
          native-type="submit"
          :loading="loading"
          :disabled="!username || !password"
        >
          Register
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Field, Button, CellGroup, NavBar, Form } from 'vant';

export default {
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Form.name]: Form,
  },
  data() {
    return {
      username: '',
      password: '',
      loading: false
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;

        // Send registration request
        const response = await fetch(
          `http://localhost:3000/api/register?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Registration successful
          alert('Registration successful! Please login.');
          this.$router.push('/login');
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed, please try again later');
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.back();
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.submit-button {
  margin: 24px;
}
</style>