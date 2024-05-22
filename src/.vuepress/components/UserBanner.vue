<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { UserContent } from './structures/UserInfo';
import { call_api } from './utils/api';

const props = defineProps({
  uid: String,
  floor: {
    type: String,
    required: false,
  },
});

const user = ref(null);

onMounted(async () => {
  const data = await call_api('user/card/' + props.uid);
  user.value = data;
});

const VerifyInfo = computed(() => {
  if (user.value && user.value.verify) {
    const asset = '/assets/sign/'
    switch (user.value.verify) {
      case 5:
        return asset + 'bili.png';
      case 6:
        return asset + 'creator-group.png';
      case 7:
        return asset + 'creator-indie.png';
      case 8:
        return asset + 'admin.png';
      default:
        return '';
    }
  }
  return '';
});

const avatar = computed(() => {
  if (!user || !user.value.avatar) {
    return '/assets/avatars/default.webp';
  } else {
    return `https://rawcdn.githack.com/Nemo1166/tch-avatar/initium/avatars/${user.value.avatar}`;
  }
});

</script>

<template>
  <router-link :to="'/users/profile.html?' + uid" class="user-card">
    <div class="user-info" v-if="user">
      <div class="avatar-container">
        <img :src="avatar" class="avatar" alt="Avatar" />
        <img :src="VerifyInfo" v-if="VerifyInfo" class="sign-image" alt="Sign" />
      </div>
      <div class="user-details">
        <p class="name"><span class="iconfont icon-ak-operator"></span>
          <span v-if="floor">{{ floor }} 楼</span>&emsp;{{ user.name }}
        </p>
        <p><img :alt="`UID: ${uid}`" :src="`https://img.shields.io/badge/uid-${uid}-lightgreen`">&ensp;
          <img alt="" v-if="user.honor" :src="`https://img.shields.io/badge/${user.honor}-8470FF`">
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.user-card {
  display: inline-block;
  text-decoration: none;
  color: inherit;
  margin: 10px;
  padding: 10px;
  width: 88%;
  background: linear-gradient(to right, rgba(216, 216, 216, 0.6), rgba(0, 0, 0, 0));
  // border: 1px solid #ddd;
  // border-radius: 5px;

  &:hover {
    background: none;
    text-decoration: none !important;
  }
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar-container {
  width: 64px;
  height: 64px;
  position: relative;
  margin-right: 16px;
}

.avatar {
  border: 3px white solid;
  border-radius: 50%;
  box-shadow: 0px 0px 5px gray;
  object-fit: cover;
  width: 3.5em;
  height: 3.5em;
}

.sign-image {
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 18px;
  height: 18px;
}

.user-details {
  width: 70%;

  .name {
    margin-bottom: 6px;
    margin-top: 0.2em;
    font-weight: bold;
    font-size: x-large;
  }

  p {
    margin: 0px;
    line-height: 1.2;
  }
}
</style>
