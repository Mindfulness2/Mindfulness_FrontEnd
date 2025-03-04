import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../HomeView.vue';
import LoginView from '../LoginView.vue'; // 登录页面组件
import ProfileView from '../ProfileView.vue';
import RegisterView from '../RegisterView.vue';
import MineView from '@/MineView.vue';
import Bvdtest1 from '@/BvdTest1VIew.vue';
import AiImageView from '@/AiImageView.vue';
import WuqinxiView from '@/WuqinxiView.vue';
import FunctionView from '@/FunctionView.vue';
import StartzhengnianView from '@/StartzhengnianView.vue';
import TextToAIView from '@/TalkToAIView.vue';
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView, // 登录页面组件
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  }
  ,
  {
    path: '/mine',
    name: 'Mine',
    component: MineView,
  },
  {
    path: '/bvdtest1',
    name: 'Bvdtest1',
    component: Bvdtest1,
  }
  ,
  {
    path: '/function',
    name: 'Function',
    component: FunctionView,
  }
  ,
  {
    path: '/aiimage',
    name: 'Aiimage',
    component: AiImageView,
  }
  ,
  {
    path: '/wuqinxi',
    name: 'Wuqinxi',
    component: WuqinxiView,
  },
  {
    path: '/startzhengnian',
    name: 'Startzhengnian',
    component: StartzhengnianView,
  },
  {
    path: '/talktoai',
    name: 'Talktoai',
    component: TextToAIView,
  },
   
 

  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;