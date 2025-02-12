<template>
  <div class="register-page">
    <van-nav-bar title="注册" left-text="返回" right-text="登录" @click-left="$router.back()"
      @click-right="$router.push('/login')" />

    <van-form @submit="onSubmit">
      <van-cell-group>
        <!-- 姓名输入框 -->
        <van-field v-model="username" name="username" label="姓名" placeholder="请输入您的姓名"
          :rules="[{ required: true, message: '请输入您的姓名' }]" />

        <!-- 密码输入框 -->
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]" />
      </van-cell-group>

      <div class="submit-button">
        <van-button round block type="info" native-type="submit" @click="onSubmit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { showToast } from 'vant';
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
    // onSubmit() {
    //   // 这里可以处理注册逻辑，比如发送请求到后端
    //   console.log('注册信息:', {
    //     username: this.username,
    //     password: this.password,
    //   });
    // },

    async onSubmit() {
      console.log('onSubmit 被触发了！'); // 调试输出
      if (!this.username || !this.password) {
        showToast({ type: 'fail', message: '用户名和密码不能为空' });
        return;
      }

      this.loading = true; // 显示加载状态

      try {
        const response = await fetch('http://localhost:50003/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          showToast({ type: 'success', message: '注册成功' });
          this.$router.push('/login'); // 注册成功后跳转到登录页
        } else {
          showToast({ type: 'fail', message: data.error || '注册失败' });
        }
      } catch (error) {
        console.error('请求失败', error);
        showToast({ type: 'fail', message: '请求失败，请稍后再试' });
      } finally {
        this.loading = false; // 隐藏加载状态
      }
    },
  },
};
</script>

<style scoped>
.submit-button {
  margin: 20px;
}
</style>