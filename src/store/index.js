import { createStore } from 'vuex'
import Bilibili from '@/assets/ico/bilibili.png'
import Zhihu from '@/assets/ico/zhihu.png'
import Cumt from '@/assets/ico/cumt.ico'
import Juejin from '@/assets/ico/juejin.png'
import Github from '@/assets/ico/github.png'
import Kxz from '@/assets/ico/kxz.png'

const store = createStore({
  state: {
    tagList: [{
      name: '矿大官网',
      key: 1,
      url: 'https://www.cumt.edu.cn',
      icon: Cumt
    }, {
      name: '知乎',
      key: 2,
      url: 'https://www.zhihu.com/',
      icon: Zhihu
    }, {
      name: '稀土掘金',
      url: 'https://juejin.cn/',
      key: 3,
      icon: Juejin
    }, {
      name: 'Github',
      key: 4,
      url: 'https://github.com/',
      icon: Github
    },
    {
      name: 'Bilibili',
      url: 'https://www.bilibili.com',
      key: 0,
      icon: Bilibili
    }, {
      name: '矿大官网',
      key: 1,
      url: 'https://www.cumt.edu.cn',
      icon: Cumt
    }, {
      name: '知乎',
      key: 2,
      url: 'https://www.zhihu.com/',
      icon: Zhihu
    }, {
      name: '稀土掘金',
      url: 'https://juejin.cn/',
      key: 3,
      icon: Juejin
    }, {
      name: 'Github',
      key: 4,
      url: 'https://github.com/',
      icon: Github
    }]
  },
  getters: {
  },
  mutations: {
    updateTagList(state, newList) {
      state.tagList = newList;
    },
  },
  actions: {
  },
  modules: {
  }
})
store.subscribe((mutation, state) => {
  localStorage.setItem('vuex-state', JSON.stringify(state))
})

const savedState = JSON.parse(localStorage.getItem('vuex-state'))
if (savedState) {
  store.replaceState(savedState)
}
export default store //  监听数据变化重新设置本地存储