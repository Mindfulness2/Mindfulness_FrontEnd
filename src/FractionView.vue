<template>
    <div class="page-container">
      <!-- 导航栏 -->
      <van-nav-bar
        title="日历与AI建议"
        left-text="返回"
        left-arrow
        @click-left="onBack"
        class="fixed-nav"
      />
  
      <!-- 页面内容 -->
      <div class="content-container">
        <div class="calendar-container">
          <!-- AI 建议展示区域 -->
          <div class="ai-suggestion" v-if="selectedDate">
            <h3>AI建议</h3>
            <p v-if="suggestion">{{ suggestion }}</p>
            <p v-else>暂无AI建议</p>
          </div>
  
          <!-- 日历组件 -->
          <div class="calendar-wrapper">
            <van-calendar
              title="日期选择"
              :poppable="false"
              @confirm="onConfirm"
              switch-mode="year-month"
              :show-subtitle="true"
              :formatter="formatter"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Calendar } from 'vant';
  
  export default {
    components: {
      [Calendar.name]: Calendar,
    },
    setup() {
      const showCalendar = ref(true); // 保持始终显示
      const selectedDate = ref(null);
      const year = ref(new Date().getFullYear());
      const month = ref(new Date().getMonth());
      const minDate = ref(new Date(2023, 0, 1));
      const maxDate = ref(new Date(2025, 11, 31));
      const suggestion = ref('');
  
      // 格式化日期显示
      const formatter = (day) => {
        return day;
      };
  
      // 确认选择日期
      const onConfirm = (date) => {
        selectedDate.value = date;
        year.value = date.getFullYear();
        month.value = date.getMonth();
        // 获取AI建议
        fetchAISuggestion(date);
      };
  
      // 模拟获取AI建议的API请求
      const fetchAISuggestion = (date) => {
        // 在获取新建议之前，先清空当前建议
        suggestion.value = '正在获取AI建议...';
        setTimeout(() => {
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          suggestion.value = `在${formattedDate}，AI建议您保持积极心态，多喝水，适当运动，保持良好的作息习惯。`;
        }, 500);
      };
  
      // 返回上一页
      const onBack = () => {
        history.back();
      };
  
      return {
        showCalendar,
        selectedDate,
        year,
        month,
        minDate,
        maxDate,
        suggestion,
        formatter,
        onConfirm,
        onBack,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 页面容器样式 */
  .page-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  /* 固定导航栏样式 */
  .fixed-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  
  /* 页面内容容器样式 */
  .content-container {
    margin-top: 60px; /* 导航栏高度 */
    flex: 1;
    overflow: auto;
  }
  
  /* 日历容器样式 */
  .calendar-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 60px;
  }
  
  .ai-suggestion {
    padding: 15px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10px;
    flex: 1;
  }
  
  .ai-suggestion h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #2c3e50;
  }
  
  .ai-suggestion p {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
  
  /* 日历样式 */
  .calendar-wrapper {
    flex: 2;
    margin: 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  :deep(.van-calendar) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .calendar-title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  </style>