<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { call_api } from "./utils/api";

const user = ref(null);

const uid = window.location.href.split('?')[1];

onMounted(async () => {
    const data = await call_api("user/fullmeta/" + uid); // 调用 fetchData 函数
    user.value = data;
});

const avatar = computed(() => {
  if (!user || !user.value.avatar) {
    return "/assets/avatars/default.png";
  } else {
    return `/assets/avatars/${uid}.png`;
  }
});

const VerifyInfo = computed(() => {
  if (user.value && user.value.verify) {
    const asset = "/assets/sign/";
    switch (user.value.verify) {
      case 5:
        return asset + "bili.png";
      case 6:
        return asset + "creator-group.png";
      case 7:
        return asset + "creator-indie.png";
      case 8:
        return asset + "admin.png";
      default:
        return "";
    }
  }
  return "";
});
</script>

<template>
  <div class="user-info" v-if="user">
    <div class="avatar-container">
      <img :src="avatar" class="avatar" alt="Avatar" />
      <img :src="VerifyInfo" v-if="VerifyInfo" class="sign-image" alt="Sign" />
    </div>
    <div class="user-details">
      <div class="user-name">{{ user.name }}</div>
      <p>
        <img :alt="`UID: ${uid}`" :src="`https://img.shields.io/badge/uid-${uid}-lightgreen`" />&ensp;
        <img alt="" v-if="user.honor" :src="`https://img.shields.io/badge/${user.honor}-8470FF`" />
      </p>
    </div>

  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div>
    <h2>Posts</h2>
    <div>
      <h3>BBS</h3>
      <h3>Articles</h3>
      <h3>dynamics</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-info {
  margin: 2em 1em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.avatar-container {
  width: 96px;
  height: 96px;
  position: relative;
  margin-right: 3em;
}

.avatar {
  border: 6px white solid;
  border-radius: 50%;
  box-shadow: 0px 0px 5px gray;
}

.sign-image {
  position: absolute;
  bottom: -9px;
  right: -9px;
  width: 24px;
  height: 24px;
}

.user-details {
  display: flex;
  flex-direction: column;

  p {
    margin: 0px;
    line-height: 1.2;
  }
}

.user-name {
  font-size: 20pt;
  font-weight: bold;
  margin-bottom: 1em;
}
</style>
