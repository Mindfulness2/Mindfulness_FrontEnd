<template>
    <div class="team-page">
      <!-- 返回按钮 -->
      <van-nav-bar title="我的团队" left-text="返回" left-arrow @click-left="goBack" />
  
      <!-- 团队成员列表 -->
      <div class="team-list">
        <div v-for="member in teamMembers" :key="member.name" class="team-member">
          <span>{{ member.name }}</span>
          <span>{{ member.email }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { NavBar } from 'vant';
  
  export default {
    components: {
      'van-nav-bar': NavBar,
    },
    data() {
      return {
        // 团队成员数据
        teamMembers: [
          { name: 'Kester', email: 'kester@team.com' },
          { name: 'Yang Fan', email: 'yangfan@team.com' },
          { name: 'Dai Mengchao', email: 'daimengchao@team.com' },
          { name: 'Wang Baihao', email: 'wangbaihao@team.com' },
          { name: 'Huo Qingsong', email: 'huoqingsong@team.com' },
          { name: 'Zhang Zirui', email: 'zhangzirui@team.com' },
          { name: 'Zhu Yuheng', email: 'zhu@team.com' },
        ],
      };
    },
    methods: {
      // 返回按钮点击事件
      goBack() {
        this.$router.go(-1); // 返回上一页
      },
    },
  };
  </script>
  
  <style scoped>
  .team-page {
    background-color: #f5f5f5;
    height: 100%;
  }
  
  .team-list {
    padding: 10px;
  }
  
  .team-member {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .team-member span {
    font-size: 16px;
  }
  </style>