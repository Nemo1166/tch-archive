<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  cate: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const url_prefix = 'https://rawcdn.githack.com/Nemo1166/tch-sticker/0.0.1/webp/';

const url = computed(() => {
  let prefix = '';
  switch (props.cate) {
    case '1':
      prefix = 'dahayu';
      break;
    case '2':
      prefix = 'error';
      break;
    case '3':
      prefix = 'cat';
      break;
    default:
      return '';
  }
  return `${url_prefix}${prefix}-${props.id}.webp`;
});

</script>

<template>
    <img class="tch-sticker" :src="url" v-if="url" alt="[sticker]" />
    <span v-else>[sticker load failed]</span>
</template>

<style scoped>
</style>
