import { createApp } from 'vue';
import App from './shouyePage.vue';
import router from './router';
import 'vant/lib/index.css';
import { Tabbar, TabbarItem } from 'vant';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { Field, Button, CellGroup } from 'vant';
import Vuetify, { VContainer } from 'vuetify';
import 'vuetify/styles';
import 'vuetify/dist/vuetify.css';
// import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

const loadimage = require('@/assets/img/zhuye.png'); // 加载中的图片
const errorimage = require('@/assets/img/zhuye.png'); // 加载失败的图片

const app = createApp(App);

app.use(router);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Toast);
app.use(NavBar);
app.use(Field.name, Field);
app.use(Button.name, Button);
app.use(CellGroup.name, CellGroup);
app.component('v-container', VContainer);
app.use(Vuetify);
app.use(VueLazyload, {
    preLoad: 1.3, // 预加载高度比例
    error: errorimage, // 加载失败时显示的图片
    loading: loadimage, // 加载中时显示的图片
    attempt: 1, // 加载失败后尝试加载的次数
  });
app.mount('#app');

 
