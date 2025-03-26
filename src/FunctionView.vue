<template>
  <div class="image-container">
    <img :src="imageSrc" class="custom-image" />
    <p class="story-text">{{ storyText }}</p>
    <button class="custom-button" @click="Starttozhengnian">Start Mindfulness</button>
  </div>
</template>

<script>
export default {
  name: "ImagePage",
  data() {
    return {
      imageSrc: require('@/assets/img/homecp6.jpg'),
      stories: [
        "One day, Little Rabbit asked Mom, 'Mom, why don’t we fly up to the sky?' Mom smiled and said, 'Because we have more important things to do, like finding the sweetest carrots on the ground and growing up together.'",
        "One day, Little Bear found a hole in his woolen hat and cried to Grandma. Grandma stitched it up slowly and said with a smile, 'It’s okay if it’s torn; I’ll patch it with warmth—you’ll always be my little treasure.'",
        "Little Squirrel picked up a shiny pine cone in the forest to give to his friend Little Deer. Little Deer said, 'Thank you, I’ll keep this forever because it carries your heart, and that’s more precious than anything.'",
        "At night, Little Cat looked up and asked Dad, 'Why don’t the stars come down to play?' Dad patted its head and said, 'They’re up there watching over you, and when you sleep, they’ll sneak into your dreams to keep you company.'",
        "On a rainy day, Little Dog held a broken umbrella to walk Little Chick home. Little Chick said, 'Your umbrella’s all wet.' Little Dog wagged its tail, 'Doesn’t matter—as long as you’re dry, I’m happy.'",
        "Little Bird sang every morning, and Old Tree asked, 'Why are you always so cheerful?' Little Bird replied, 'Because I know my song keeps you lively all day.'",
        "Little Fish asked Mom, 'Can I swim up to the sky?' Mom said, 'You don’t need to; the way you swim here is so beautiful—you’re already the brightest star in my eyes.'",
        "In winter, Little Sheep shared half its scarf with bald Little Pig. Little Pig asked, 'Aren’t you cold?' Little Sheep smiled, 'Not if we’re warm together.'",
        "Little Turtle moved slowly, and his friends got far ahead. As he sighed, Little Rabbit turned back and said, 'Don’t rush—we’ll wait for you up front because the journey’s more fun with you.'",
        "Little Hedgehog dropped an apple he was carrying, and Little Mouse rushed to help. Little Hedgehog said, 'Thank you.' Little Mouse grinned, 'No need to thank friends—sharing makes it sweeter.'"
      ],
      storyText: "" // 初始化为空，mounted时设置随机故事
    };
  },
  mounted() {
    // 页面加载时随机显示一个故事
    const randomIndex = Math.floor(Math.random() * this.stories.length);
    this.storyText = this.stories[randomIndex];
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