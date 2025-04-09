<template>
  <van-nav-bar
      title="AI Character Selection"
      left-text="Back"
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
        <van-button size="mini" @click="useselectCharacter(character.title)">Use</van-button>
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
          title: "Character 1",
          tag: "Sweet Tsundere",
          desc: "Description",
          thumb: require("@/assets/img/homecp1.jpg"), // Replace with image path
        },
        {
          title: "Character 2",
          tag: "Troublemaker",
          desc: "Firefighter",
          thumb:  require("@/assets/img/homecp2.jpg"),
        },
        {
          title: "Character 3",
          tag: "Leader of Kids",
          desc: "Highly Protective",
          thumb:  require("@/assets/img/homecp3.jpg"),
        },
      ],
    };
  },
  methods: {
    goBack() {
        this.$router.go(-1); // Go back to the previous page
      },
    useselectCharacter(name) {
      
      console.log(`Selected ${name}`);
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