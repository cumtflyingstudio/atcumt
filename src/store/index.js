import { createStore } from 'vuex'
import Bilibili from '@/assets/ico/bilibili.png'
import Zhihu from '@/assets/ico/zhihu.png'
import Cumt from '@/assets/ico/cumt.ico'
import Juejin from '@/assets/ico/juejin.png'
import Github from '@/assets/ico/github.png'
import backgroundPic0 from '@/assets/background/backgroundPic0.jpg'
import backgroundPic1 from '@/assets/background/backgroundPic1.jpg'
import backgroundPic2 from '@/assets/background/backgroundPic2.png'
import backgroundPic3 from '@/assets/background/backgroundPic3.jpg'
import wallpaper0 from '@/assets/background/wallpaper0.mp4'
import wallpaper1 from '@/assets/background/wallpaper1.mp4'
import wallpaperPic0 from '@/assets/background/wallpaperPic0.png'
import wallpaperPic1 from '@/assets/background/wallpaperPic1.png'
import backgroundPic4 from '@/assets/background/backgroundPic4.png'
import backgroundPic5 from '@/assets/background/backgroundPic5.jpg'
import backgroundPic6 from '@/assets/background/backgroundPic6.png'
import backgroundPic7 from '@/assets/background/backgroundPic7.png'

const store = createStore({
  state: {
    vis: false,
    tagRadius: 8,
    tagOpacity: 100,
    searchBoxSize: 40,
    searchBoxOpacity: 70,
    searchBoxRadius: 15,
    backgroundPictures: [{
      src: backgroundPic0,
      key: 0,
      type: 'pic',
    },
    {
      src: backgroundPic1,
      key: 1,
      type: 'pic',
    },
    {
      src: backgroundPic2,
      key: 2,
      type: 'pic',
    },
    {
      src: backgroundPic3,
      key: 3,
      type: 'pic',
    },
    {
      src: backgroundPic4,
      key: 4,
      type: 'pic',
    },
    {
      src: backgroundPic5,
      key: 5,
      type: 'pic',
    },
    {
      src: backgroundPic6,
      key: 6,
      type: 'pic',
    },
    {
      src: backgroundPic7,
      key: 7,
      type: 'pic',
    },
    {
      link: wallpaper0,
      src: wallpaperPic0,
      key: 8,
      type: 'video',
    },
    {
      link: wallpaper1,
      src: wallpaperPic1,
      key: 9,
      type: 'video',
    }],
    tagList: [{
      x: 2,
      y: 0,
      w: 1,
      h: 3,
      i: 0,
      name: '稀土掘金',
      url: 'https://juejin.cn/',
      icon: Juejin,
    },
    {
      x: 3,
      y: 0,
      w: 1,
      h: 3,
      i: 1,
      name: '知乎',
      url: 'https://www.zhihu.com/',
      icon: Zhihu,
    },
    {
      x: 4,
      y: 0,
      w: 1,
      h: 3,
      i: 2,
      name: '矿大官网',
      url: 'https://www.cumt.edu.cn',
      icon: Cumt,
    },
    {
      x: 5,
      y: 0,
      w: 1,
      h: 3,
      i: 3,
      name: 'Bilibili',
      url: 'https://www.bilibili.com',
      key: 0,
      icon: Bilibili,
    },
    {
      x: 6,
      y: 0,
      w: 1,
      h: 3,
      i: 4,
      name: 'Github',
      key: 4,
      url: 'https://github.com/',
      icon: Github,
    }],
  },
  getters: {
  },
  mutations: {
    updateTagList(state, newList) {
      state.tagList = newList
    },
    updateTagRadius(state, newRadius) {
      state.tagRadius = newRadius
    },
    updateTagOpacity(state, newTagOpacity) {
      state.tagOpacity = newTagOpacity
    },
    updateSearchBoxSize(state, newSearchBoxSize) {
      state.searchBoxSize = newSearchBoxSize
    },
    updateSearchBoxOpacity(state, newSearchBoxOpacity) {
      state.searchBoxOpacity = newSearchBoxOpacity
    },
    updateSearchBoxRadius(state, newSearchBoxRadius) {
      state.searchBoxRadius = newSearchBoxRadius
    },
  },
  actions: {
  },
  modules: {
  },
})
store.subscribe((mutation, state) => {
  localStorage.setItem('vuex-state', JSON.stringify(state))
})

const savedState = JSON.parse(localStorage.getItem('vuex-state'))
if (savedState)
  store.replaceState(savedState)

export default store //  监听数据变化重新设置本地存储
