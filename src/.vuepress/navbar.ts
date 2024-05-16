import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "版区",
    icon: "fas fa-list",
    link: "/category/",
  },
  {
    text: "话题标签",
    icon: "fas fa-hashtag",
    link: "/tag/",
  }
]);
