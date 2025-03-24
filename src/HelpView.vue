<template>
    <div class="help-center">
      <!-- 返回按钮 -->
      <van-nav-bar title="帮助中心" left-text="返回" left-arrow @click-left="goBack" />
  
      <!-- 帮助内容 -->
      <van-collapse v-model="activeNames">
        <van-collapse-item title="一、新手入门" name="1">
          <ul>
            <li>注册/登录：点击注册按钮，输入邮箱或手机号并设置密码；忘记密码可通过注册邮箱或手机号重置。</li>
            <li>界面介绍：</li>
            <ul>
              <li>首页：按分类查找课程，点击课程封面进入详情页。</li>
              <li>正念练习：点击开始练习。</li>
              <li>我的：查看学习进度、正念练习记录。</li>
            </ul>
          </ul>
        </van-collapse-item>
        <van-collapse-item title="二、用户协议与隐私政策" name="2">
          <ul>
            <li>用户协议：用户需遵守法律法规及APP用户协议，包括账号使用、内容发布、知识产权等条款。</li>
            <li>隐私政策：APP会收集用户信息用于服务提供和账号安全，不会泄露给第三方，除非法律法规要求或用户授权。</li>
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
        activeNames: ['1'], // 默认展开第一个板块
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1); // 返回上一页
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