<template>
  <div id="app">
    <!-- <button-example></button-example> -->
    <tabbar-example></tabbar-example>
    <router-view></router-view>
  </div>
</template>

<script>
// import ButtonExample from './ButtonExample.vue';
import TabbarExample from './TabbarExample.vue';
export default {
  name: 'App',
  components: {
    // ButtonExample,
    TabbarExample,
  },
};
</script>

<style>
/* 全局样式 */
</style>