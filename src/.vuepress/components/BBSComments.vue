<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { call_api } from "./utils/api";
import { Comments, CommReplies } from "./structures/Contents";
import { marked } from "marked";
import { parseStickers } from './utils/text';

const props = defineProps({
  pid: String,
});

const comments = ref<Comments[]>([]);
const total_comments = ref(0);
const selectedFloor = ref(2);
const showFloors = ref(3);

const fetchComments = async () => {
  const data = await call_api(`comments/${props.pid}?start=${selectedFloor.value}&limit=${showFloors.value}`);
  comments.value = data.comments;
  total_comments.value = data.total;
};

const updateFloors = async () => {
  const floor = selectedFloor.value;
  const element = document.getElementById(`comment-${floor}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    await fetchComments();
    document.getElementById(`comment-${floor}`)
      .scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(async () => {
  await fetchComments();
});

// watch(selectedFloor, async () => {
//   await fetchComments();
// });
</script>

<template>
  <div v-if="total_comments">
    <h2 id="comments">评论（共 {{ total_comments }} 条）</h2>
    <div v-for="(comment, index) in comments.slice(0, showFloors)" :key="index" :id="`comment-${comment.floor}`">
      <UserBanner :uid="String(comment.user_id)" :floor="comment.floor" />
      <div class="comment-content" v-html="marked.parse(parseStickers(comment.comment_content))"></div>
      <div v-if="comment.replies.length != 0"><strong>回复</strong>
        <div v-for="(reply, indexr) in comment.replies" :key="indexr" class="comment-content reply">
          <InlineUser :uid="reply.user_id" />: <span
            v-html="parseStickers(reply.comment_content.replace('\n', ''))"></span>
        </div>
      </div>
      <hr />
    </div>

    <hr />
    <div>
      <label for="showFloors">显示</label>&nbsp;
      <select id="showFloors" v-model="showFloors">
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>&nbsp;楼&ensp;|&ensp;
      <label for="jumpToFloor">跳转到：</label>
      <select id="jumpToFloor" v-model="selectedFloor">
        <option v-for="floor in total_comments" :key="floor" :value="floor">
          {{ floor }}
        </option>
      </select>&nbsp;楼
      <button @click="updateFloors">跳转</button>
    </div>
    <hr />
  </div>
  <div v-else>
    <h2>评论加载中...</h2>
  </div>
</template>

<style lang="scss" scoped>
.comment-content {
  p {
    margin-top: 0.2em;
  }


}

.reply {
  margin: 1em;
}
</style>
