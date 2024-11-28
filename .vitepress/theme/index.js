// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import PostsList from './PostsList.vue';
import Story from './Story.vue';
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('PostsList', PostsList);
        app.component('Story', Story);
    }
};