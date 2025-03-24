<template>
  <div class="image-container">
    <img :src="imageSrc" class="custom-image" />
    <p class="story-text">{{ storyText }}</p>
    <button class="custom-button" @click="Starttozhengnian" >开始正念</button>
  </div>
</template>

<script>
export default {
  name: "ImagePage",
  data() {
    return {
      imageSrc: require('@/assets/img/homecp6.jpg'),
      storyText: "暖心小故事：有一天，小兔子问妈妈：‘妈妈，为什么我们不飞上天呢？’妈妈笑着说：‘因为我们有更重要的事情要做，比如在地面上找到最甜的胡萝卜，和你一起长大。’"
    };
  },
  methods: {
  Starttozhengnian() {
      this.$router.push('/startzhengnian');
  }
}
};
</script>

<style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
  /* background-color: #f7f8fa; */
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('@/assets/img/bjt.jpg') no-repeat center center;
  background-size: cover;
}

.custom-image {
  margin-top: 10px;
  width: 80%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.story-text {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  max-width: 80%;
}

.custom-button {
  margin-top: 80px;
  padding: 12px 24px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.custom-button:hover {
  background: linear-gradient(to right, #2575fc, #6a11cb);
}
</style>