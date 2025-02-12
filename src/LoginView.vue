<template>
  <div class="login-view">
    <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="goBack" />

    <div class="login-form">
      <van-cell-group inset>
        <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="password" label="密码" placeholder="请输入密码" type="password" />
      </van-cell-group>

      <div style="margin: 24px;">
        <van-button round block type="primary" @click="handleLogin" :loading="loading">
          登录
        </van-button>
      </div>

      <div class="register-link">
        <span>还没有账号？</span>
        <a @click="goToRegister">立即注册</a>
      </div>
    </div>
  </div>


</template>

<script>


import { showToast } from 'vant';
import { Field, Button, CellGroup, NavBar } from 'vant';
export default {
  name: 'LoginView',
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
      loading: false, // 登录按钮加载状态
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回上一页
    },
    goToRegister() {
      this.$router.push('/register'); // 跳转到注册页面
    },
    // handleLogin() {
    //   this.loading = true; // 开始加载
    //   // 模拟登录逻辑
    //   setTimeout(() => {
    //     if (this.username && this.password) {
    //       showToast({ type: 'success', message: '登录成功' });
    //       this.$router.push('/mine'); // 登录成功后跳转到首页
    //     } else {
    //       showToast({ type: 'fail', message: '用户名或密码不能为空' });
    //     }
    //     this.loading = false; // 结束加载
    //   }, 1500);
    // },


    // async handleLogin() {
    //   this.loading = true; // 开始加载

    //   try {
    //     // 发送 POST 请求到后端进行登录
    //     const response = await fetch('https://localhost:50002/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username: this.username,
    //         password: this.password,
    //       }),

    //     });

    //     // 获取响应数据
    //     const data = await response.json();

    //     if (response.ok && data.token) {
    //       // 登录成功，存储 JWT 令牌
    //       localStorage.setItem('token', data.token);
    //       showToast({ type: 'success', message: '登录成功' });
    //       this.$router.push('/mine'); // 登录成功后跳转到个人中心
    //     } else {
    //       // 登录失败
    //       showToast({ type: 'fail', message: data.error || '登录失败' });
    //     }
    //   } catch (error) {
    //     console.error('请求失败', error);
    //     showToast({ type: 'fail', message: '请求失败，请稍后再试' });
    //   } finally {
    //     this.loading = false; // 结束加载
    //   }
    // },

    async handleLogin() {
      this.loading = true; // 开始加载

      try {
        const response = await fetch('https://localhost:50002/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json(); // 获取响应的 JSON 数据

        if (response.ok && data.token) {
          localStorage.setItem('token', data.token);  // 存储 JWT 令牌
          showToast({ type: 'success', message: '登录成功' });
          this.$router.push('/mine'); // 登录成功后跳转到首页
        } else {
          showToast({ type: 'fail', message: data.error || '登录失败' });
        }
      } catch (error) {
        console.error('请求失败', error);
        showToast({ type: 'fail', message: '请求失败，请稍后再试' });
      } finally {
        this.loading = false; // 结束加载
      }
    }


  },
};
</script>

<style scoped>
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
}
</style>