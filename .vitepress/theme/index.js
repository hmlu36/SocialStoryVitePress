// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import Story from './Story.vue';
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Story', Story);
    }
};