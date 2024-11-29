<template>
  <div class="slideshow-container">
    <div v-for="(item, index) in items" :key="item.image" class="mySlides fade" v-show="currentSlide === index">
      <h1 class="text" @click="playAudio(item.audio)">{{ item.text }}</h1>
      <img :src="item.image" :alt="item.text" class="slide-image" @click="playAudio(item.audio)" />
    </div>
    <a class="prev-slide" @click="changeSlide(-1)">&#10094;</a>
    <a class="next-slide" @click="changeSlide(1)">&#10095;</a>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  props: {
    jsonPath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const items = ref([]);
    const currentSlide = ref(0);
    const audioElements = ref({});
    const currentAudio = ref(null);

    const BASE_URL = process.env.NODE_ENV === 'production' ? `/SocialStoryVitePress` : '';

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${props.jsonPath}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        items.value = await response.json();
        console.log('Fetched items:', items.value);

        // Preload audio files
        items.value.forEach(item => {
          const audio = new Audio(item.audio);
          audio.preload = 'auto';
          audioElements.value[item.audio] = audio;
        });
      } catch (error) {
        console.error('Error fetching JSON:', error);
      }
    };

    const changeSlide = (n) => {
      // Stop current audio if playing
      if (currentAudio.value) {
        currentAudio.value.pause();
        currentAudio.value.currentTime = 0;
      }

      currentSlide.value = (currentSlide.value + n + items.value.length) % items.value.length;
    };

    const playAudio = (audioPath) => {
      const audio = audioElements.value[audioPath];
      if (audio) {
        // Stop current audio if playing
        if (currentAudio.value) {
          currentAudio.value.pause();
          currentAudio.value.currentTime = 0;
        }

        currentAudio.value = audio;
        audio.currentTime = 0; // Reset audio to start
        audio.play();
      }
    };

    onMounted(fetchData);
    watch(() => props.jsonPath, fetchData);

    return { items, currentSlide, changeSlide, playAudio };
  }
};
</script>

<style>
.slideshow-container {
  position: relative;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
}

.mySlides {
  display: none;
}

.mySlides.fade {
  display: block;
}

.prev-slide, .next-slide {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next-slide {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev-slide:hover, .next-slide:hover {
  background-color: rgba(0,0,0,0.8);
}

.text {
  color: #f2f2f2;
  font-size: 32px;
  padding: 16px 12px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); /* Optional: Add background color for better readability */
}

.slide-image {
  width: 100%;
  object-fit: cover;
}
</style>