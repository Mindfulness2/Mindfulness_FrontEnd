<template>
  <div>
   <van-button type="primary" size="large">大号按钮</van-button>
   <van-button type="primary" size="normal">普通按钮</van-button>
   <van-button type="primary" size="small">小型按钮</van-button>
   <van-button type="primary" size="mini">迷你按钮</van-button>

  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  components: {
    [Button.name]: Button, // 使用动态属性值注册组件
  },
};
</script>