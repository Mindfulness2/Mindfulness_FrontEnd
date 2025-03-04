<template>
  <van-nav-bar
      title="AI形象选择"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
  <div class="card-container">
    <van-card
      v-for="(character, index) in characters"
      :key="index"
      :tag="character.tag"
      :desc="character.desc"
      :title="character.title"
      :thumb="character.thumb"
    >
      <template #footer>
        <van-button size="mini" @click="useselectCharacter(character.title)">使用</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
import { Card, Button } from 'vant';

export default {
  name: 'CharacterCards',
  components: {
    'van-card': Card,
    'van-button': Button,
  },
  
  data() {
    return {
      characters: [
        {
          title: "小火龙",
          tag: "傲娇甜妹",
          desc: "描述信息",
          thumb: require("@/assets/img/pimg1.png"), // 替换为图片路径
        },
        {
          title: "杰尼龟",
          tag: "捣蛋小子",
          desc: "救火队员",
          thumb:  require("@/assets/img/pimg2.png"),
        },
        {
          title: "妙蛙种子",
          tag: "孩子王",
          desc: "保护性极强",
          thumb:  require("@/assets/img/pimg3.png"),
        },
      ],
    };
  },
  methods: {
    goBack() {
        this.$router.go(-1); // 返回上一页
      },
    useselectCharacter(name) {
      
      console.log(`使用了 ${name}`);
    },  
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin: 16px;
}

:deep(.van-card) {
  width: 100%;
  max-width: 500px;
}

:deep(.van-card__header) {
  background-color: #f0f0f0;
}

:deep(.van-card__tag) {
  background-color: #ff69b4;
  color: white;
}

:deep(.van-card__title) {
  color: #333333;
  font-weight: bold;
}

:deep(.van-card__desc) {
  color: #666666;
}

:deep(.van-card__footer) {
  display: flex;
  justify-content: flex-end;
}
</style>