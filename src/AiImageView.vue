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
          title: "形象1",
          tag: "傲娇甜妹",
          desc: "描述信息",
          thumb: require("@/assets/img/homecp1.jpg"), // 替换为图片路径
        },
        {
          title: "形象2",
          tag: "捣蛋小子",
          desc: "救火队员",
          thumb:  require("@/assets/img/homecp2.jpg"),
        },
        {
          title: "形象3",
          tag: "孩子王",
          desc: "保护性极强",
          thumb:  require("@/assets/img/homecp3.jpg"),
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