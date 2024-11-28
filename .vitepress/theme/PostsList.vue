<template>
    <div>
        <h2>Posts</h2>
        <ul>
            <li v-for="post in posts" :key="post.link">
                <a :href="post.link">{{ post.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const posts = ref([]);

        onMounted(async () => {
            const context = import.meta.glob('/posts/*.md');
            posts.value = Object.keys(context)
                .map((key) => {
                    const title = key.split('/').pop().replace('.md', '');
                    return {
                        title,
                        link: key.replace('.md', '.html')
                    };
                })
                .sort((a, b) => {
                    const numA = parseInt(a.title.match(/\d+/)[0]);
                    const numB = parseInt(b.title.match(/\d+/)[0]);
                    return numA - numB;
                });
        });

        return { posts };
    }
};
</script>