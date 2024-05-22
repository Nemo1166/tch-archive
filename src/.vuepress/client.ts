import { defineClientConfig } from 'vuepress/client'
import summary from './layouts/summary.vue'

export default defineClientConfig({
  layouts: {
    summary,
  },
})
