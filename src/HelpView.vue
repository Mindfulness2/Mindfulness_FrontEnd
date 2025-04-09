<template>
  <div class="help-center">
    <!-- Back Button -->
    <van-nav-bar title="Help Center" left-text="Back" left-arrow @click-left="goBack" />
  
    <!-- Help Content -->
    <van-collapse v-model="activeNames">
    <van-collapse-item title="1. Getting Started" name="1">
      <ul>
      <li>Sign Up/Login: Click the sign-up button, enter your email or phone number, and set a password. If you forget your password, you can reset it using your registered email or phone number.</li>
      <li>Interface Introduction:</li>
      <ul>
        <li>Home: Browse courses by category, click on a course cover to view details.</li>
        <li>Mindfulness Practice: Click to start practicing.</li>
        <li>My Profile: View learning progress and mindfulness practice records.</li>
      </ul>
      </ul>
    </van-collapse-item>
    <van-collapse-item title="2. User Agreement and Privacy Policy" name="2">
      <ul>
      <li>User Agreement: Users must comply with laws, regulations, and the app's user agreement, including terms on account usage, content publishing, and intellectual property.</li>
      <li>Privacy Policy: The app collects user information for service provision and account security. It will not disclose information to third parties unless required by law or authorized by the user.</li>
      </ul>
    </van-collapse-item>
    </van-collapse>
  </div>
  </template>
  
  <script>
  import { NavBar, Collapse, CollapseItem } from 'vant';
  
  export default {
  components: {
    'van-nav-bar': NavBar,
    'van-collapse': Collapse,
    'van-collapse-item': CollapseItem,
  },
  data() {
    return {
    activeNames: ['1'], // Default to expand the first section
    };
  },
  methods: {
    goBack() {
    this.$router.go(-1); // Go back to the previous page
    },
  },
  };
  </script>
  
  <style scoped>
  .help-center {
  background-color: #f5f5f5;
  height: 100%;
  }
  
  ul {
  list-style: none;
  padding: 0;
  }
  
  li {
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  }
  </style>