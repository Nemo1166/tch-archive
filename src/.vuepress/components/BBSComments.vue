<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { call_api } from "./utils/api";
import { Comments } from "./structures/UserInfo";
import { marked } from "marked";
import { parseStickers } from './utils/text';

const props = defineProps({
  pid: String,
});

const comments = ref<Comments[]>([]);
const total_comments = ref(0);

onMounted(async () => {
  const data = await call_api(`comments/${props.pid}`);
  comments.value = data.comments;
  total_comments.value = data.total;
});
</script>

<template>
  <div v-if="total_comments">
    <h2>评论（共 {{ total_comments }} 条）</h2>
    <div v-for="(comment, index) in comments" :key="index">
      <UserBanner :uid="String(comment.user_id)" :floor="comment.floor" />
      <div class="comment-content" v-html="marked.parse(parseStickers(comment.comment_content))"></div>
      <hr />
    </div>
  </div>
  <div v-else><hr>评论加载中...</div>
</template>

<style lang="scss" scoped>
.comment-content {
  p {
    margin-top: 0.2em;
  }
}
</style>
