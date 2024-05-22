<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { call_api } from './utils/api';


const props = defineProps({
  uid: String,
})

const user = ref<{ name: string, avatar: string }>(null);

onMounted(async () => {
  const data = await call_api(`user/simple/${props.uid}`);
  user.value = data;
})

const avatar = computed(() => {
  if (!user || !user.value.avatar) {
    return '/assets/avatars/default.webp';
  } else {
    return `https://rawcdn.githack.com/Nemo1166/tch-avatar/initium/avatars/${user.value.avatar}`;
  }
});

</script>

<template>
  <router-link :to="`/users/profile.html?${uid}`">
    <span v-if="user" class="username">
      <img :src="avatar" alt="[Avatar]" class="inline-avatar" />
      {{ user.name }}
    </span>
    <span v-else>User[id:{{ uid }}?]</span>
  </router-link>
</template>

<style lang="scss">
.inline-avatar {
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  border: 2px white solid;
  box-shadow: 0 0 2px gray;
  margin: 0 .1em;
  object-fit: cover;
  vertical-align: sub;
}

.username {
  font-weight: bold;
}
</style>