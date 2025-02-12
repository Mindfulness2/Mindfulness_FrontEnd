<template>
    <div class="example-page">
      <!-- 头部导航栏 -->
      <van-nav-bar
        title="我的页面"
      />
  
      <!-- 页面内容 -->
      <div class="content">
        <h1>欢迎访问我的页面</h1>
        <van-button type="primary" round block @click="onButtonClick">
          点此登录
        </van-button>
      </div>
      <van-cell is-link title="历史记录" @click="goToHistory" />
      <van-cell is-link title="AI形象选择" @click="goToAIImage" />
      <van-cell is-link title="性别设置" @click="goToSelectGender" />
      <van-cell is-link title="历史分数" @click="goToFraction" />
    </div>
    
  </template>
  
  <script>
  import { showToast } from 'vant';
  import { NavBar, Button ,} from 'vant';
  import { Cell } from 'vant';

  
  export default {
    name: 'ExamplePage',
    components: {
      [NavBar.name]: NavBar,
      [Button.name]: Button,
      [Cell.name]: Cell,
    },
    methods: {
      onButtonClick() {
        showToast('按钮被点击了！');
        this.$router.push('/login');
      },
      goToHistory() {
        this.$router.push('/history');
      },
      goToAIImage() {
        this.$router.push('/aiimage');
      },
      goToSelectGender() {
        this.$router.push('/selectgender');
      },
      goToFraction() {
        this.$router.push('/fraction');
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
    text-align: center; /* 居中对齐 */
    margin-top: 50px;
  }
  </style>