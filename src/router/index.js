import { createRouter, createWebHashHistory } from 'vue-router'
import TagsBox from '@/components/TagsBox.vue'

const routes = [
  {
    name: 'hello',
    path: '/form',
    component: TagsBox,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
