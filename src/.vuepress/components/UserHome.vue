<script setup lang="ts">
import { ref, onMounted, computed, Ref } from "vue";
import { call_api } from "./utils/api";
import { Published, UserFullmeta } from "./structures/UserInfo";

const user = ref<UserFullmeta>(null);
const pub_post = ref<Published>({
  'total': 0,
  'posts': []
});

const pub_article = ref<Published>({
  'total': 0,
  'posts': []
});

async function get_published(uid: string, post_type: string, data: Ref<any>) {
    const res = await call_api(`user/published/${uid}?type=${post_type}`);
    data.value = res;
}

onMounted(async () => {
  const uid = window.location.href.split('?')[1];
  const data = await call_api("user/fullmeta/" + uid);
  user.value = data;
  get_published(uid, 'normal', pub_post);
  get_published(uid, 'single', pub_article);
  // const publishedData = await call_api("user/published/" + uid);
  // published.value = publishedData;
});

const avatar = computed(() => {
  if (!user || !user.value.avatar) {
    return '/assets/avatars/default.webp';
  } else {
    return `https://rawcdn.githack.com/Nemo1166/tch-avatar/initium/avatars/${user.value.avatar}`;
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
      <div class="user-name">{{ user.name }} &ensp;<span class="last-login">最近登录：{{ user.last_login }}</span></div>
      <p v-if="user.desc" class="user-desc" v-html="user.desc"></p>
      <p class="user-desc" v-else>泰拉博士太拉了，什么都没有写</p>
      <div class="meta">
        <img :alt="`UID: ${user.user_id}`" :src="`https://img.shields.io/badge/uid-${user.user_id}-lightgreen`" />&ensp;
        <img alt="" v-if="user.honor" :src="`https://img.shields.io/badge/${user.honor}-8470FF`" />
        <span class="user-veri" v-if="user.verify_info">{{ user.verify_info }}</span>
      </div>
    </div>

  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
  <div>
    <h2>发表的内容</h2>
    <div>
      <h3 v-if="user">帖子 BBS ({{ pub_post.total }})</h3>
      <div class="pub-item" v-if="pub_post.total" v-for="post in pub_post.posts">
        <!-- <router-link :to="`/posts/${post.guid}`"> -->
        <p class="post-title"><span v-html="post.title"></span></p>
        <!-- </router-link> -->
        <hr />
        <p class="post-meta">
          <i class="fas fa-book-open"></i>{{ post.post_date }}
          <i class="fas fa-eye"></i>{{ post.post_views }}
          <i class="fas fa-comment-dots"></i>{{ post.comment_count }}
        </p>
      </div>
      <h3 v-if="user">文章 Articles ({{ pub_article.total }})</h3>
      <div class="pub-item" v-if="pub_article.total" v-for="post in pub_article.posts">
        <!-- <router-link :to="`/posts/${post.guid}`"> -->
        <p class="post-title"><span v-html="post.title"></span></p>
        <!-- </router-link> -->
        <hr />
        <p class="post-meta">
          <i class="fas fa-book-open"></i>{{ post.post_date }}
          <i class="fas fa-eye"></i>{{ post.post_views }}
          <i class="fas fa-comment-dots"></i>{{ post.comment_count }}
        </p>
      </div>
      <h3>动态 dynamics</h3>
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
  margin: 0.5em 3em 1em 0;
}

.avatar {
  border: 6px white solid;
  border-radius: 50%;
  box-shadow: 0px 0px 5px gray;
  object-fit: cover;
  width: 6em;
  height: 6em;
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

.user-desc {
  margin-bottom: 0.5em !important;
}

.user-veri {
  color: gray;
  padding: 0.5em;
  font-size: small;

  &:before {
    content: "Verified as ";
    font-weight: bold;
  }
}

.last-login {
  font-weight: normal;
  font-size: small;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.control {
  font-size: small;
}

.pub-item {
  border-radius: 5px;
  margin: 0.2em 0;
  padding: 0.3em;
  transition: box-shadow 0.5s;

  p {
    margin: 0;
  }

  .post-title {
    font-weight: bold;
    transition: text-decoration 0.5s, color 0.5s;

    &:hover {
      cursor: pointer;
      color: var(--theme-color);
      text-decoration: underline var(--theme-color);
    }
  }

  i {
    margin: 0 0.5em;
  }

  .post-meta {
    color: gray;
    font-size: small;
    font-family: monospace;
  }

  &:hover {
    box-shadow: 0 0 3px gray;
  }
}
</style>
