import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "泰讯档案馆",
  description: "泰拉通讯枢纽存档",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
