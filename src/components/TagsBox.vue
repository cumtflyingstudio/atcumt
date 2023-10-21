<script>
import { GridItem, GridLayout } from 'vue3-drr-grid-layout'
import 'vue3-drr-grid-layout/dist/style.css'
import { nextTick } from 'vue'

import Kxz from '@/assets/ico/kxz.png'

export default ({
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      url: '',
      name: '',
      open: false,
      tags: [],
      message: '',
      isDragging: false,
      layout: [
      ],
      visible: false,
      top: 0,
      left: 0,
    }
  },
  created() {
    nextTick().then(() => {
      // 在下一个 tick 中执行操作
      const tagIcons = document.querySelectorAll('.tagIcon')
      this.$store.watch(
        state => state.tagRadius,
        (newValue) => {
          tagIcons.forEach((item) => {
            item.style.borderRadius = `${newValue}%`
          })
        },
      )
      this.$store.watch(
        state => state.tagOpacity,
        (newValue) => {
          tagIcons.forEach((item) => {
            item.style.opacity = `${newValue}%`
          })
        },
      )
    })
  },
  mounted() {
    let lsState
    if (localStorage.getItem('vuex-state') !== null) {
      lsState = JSON.parse(localStorage.getItem('vuex-state'))
      const lsStateListLen = lsState.tagList.length
      const vuexStateListLen = this.$store.state.tagList.length
      if (lsStateListLen > vuexStateListLen) {
        this.$store.state.tagList = lsState.tagList
        this.layout = lsState.tagList
      }
      else {
        lsState.tagList = this.$store.state.tagList
        this.layout = this.$store.state.tagList
      }
    }
    else {
      localStorage.setItem('vuex-state', JSON.stringify(this.$store.state))
      this.layout = JSON.parse(localStorage.getItem('vuex-state')).tagList
    }
    const tagRadius = lsState.tagRadius
    const tagOpacity = lsState.tagOpacity / 100
    nextTick().then(() => {
      // 在下一个 tick 中执行操作
      const tagIcons = document.querySelectorAll('.tagIcon')
      tagIcons.forEach((item) => {
        item.style.borderRadius = `${tagRadius}%`
        item.style.opacity = `${tagOpacity}`
      })
    })
  },
  methods: {
    openTag(t) {
      if (this.isDragging === false)
        window.open(t.url, '_blank')
    },
    showModal() {
      this.open = true
    },
    handleOk(e) {
      console.debug(e)
      if (this.url === '')
        return
      const newTag = {}
      newTag.url = `https://${this.url}`
      newTag.name = this.name
      newTag.key = 0
      newTag.icon = Kxz
      this.url = ''
      this.name = ''
      // this.tags.push(newTag)
      this.tags.push(newTag)
      this.$store.commit('updateTagList', this.tags)
      this.open = false
    },
    rightClick(tag) {
      console.debug(tag)
      this.tags = this.tags.filter(item => item !== tag)
      this.$store.commit('updateTagList', this.tags)
    },
    resize(i, newH, newW, newHPx, newWPx) {
      this.message = `缩放中 i=${i}, X=${newHPx}, Y=${newWPx}`
    },
    move(i, newX, newY) {
      this.message = `移动中 i=${i}, X=${newX}, Y=${newY}`
      this.isDragging = true
    },
    moved() {
      this.$store.commit('updateTagList', this.layout)
    },
    print() {
      console.debug('111')
    },
    updatedEvent(newLayout) {
      console.debug('Updated layout: ', newLayout)
    },
    openMenu(e) {
      // this.$store.state.vis = false
      // const w = window.screen.width
      // const h = window.screen.height
      // const x = e.pageX
      // const y = e.pageY
      // console.debug('!!!')
      // this.left = x
      // this.top = y
      // if (w - x < 180)
      //   this.left = x - 162
      // if (h - y < 250)
      //   this.top = y - 104
      // this.visible = true
      // this.$store.state.vis = true
      // console.debug(this.$store.state.vis)
      console.debug(e)
    },
    closeMenu() {
      this.visible = false
      // this.$store.state.visible = false
      this.$store.state.vis = false
      // console.debug(this.$store.state.vis)
    },
  },
})
</script>

<template>
  <!-- <div
    class="tagsBox"
  >
    <div v-for="tag in tags" :key="tag.key" class="tagBox" @click="openTag(tag)">
      <div class="ico" @contextmenu.prevent.stop="rightClick(tag)">
        <img :src="tag.icon" class="tagIcon">
      </div>
      <div class="tagName">
        {{ tag.name }}
      </div>
    </div>
    <div class="tagBox">
      <div class="ico">
        <div id="addTag" class="tagIcon" @click="showModal" />
      </div>
      <div class="tagName">
        添加标签
      </div>
    </div>
  </div> -->
  <GridLayout
    v-model:layout="layout"
    :col-num="12"
    :row-height="30"
    style="width: 100vw"
    class="itemsBox"
    @layout-updated="updatedEvent"
  >
    <template #default="{ gridItemProps }">
      <GridItem
        v-for="item in layout"
        :key="item.i"
        v-bind="gridItemProps"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        class="itemBox"
        @move="move"
        @moved="moved"
      >
        <div class="ico" @contextmenu.prevent="openMenu(item)" @click="openTag(item)">
          <img :src="item.icon" class="tagIcon" @drag="print">
        </div>
        <div class="tagName">
          {{ item.name }}
        </div>
        <!-- </GridItem>
      <div class="tagBox">
        <div class="ico">
          <div id="addTag" class="tagIcon" @click="showModal" />
        </div>
        <div class="tagName">
          添加标签
        </div>
      </div>
      </griditem> -->
      </GridItem>
    </template>
  </GridLayout>
  <ul
    v-show="visible"
    :style="{ left: `${left}px`, top: `${top}px` }"
    class="contextmenu"
  >
    <li>
      <div>更换壁纸</div>
      <div class="imgs">
        <!-- <img src="./assets/imgs/download.png" title="下载壁纸" @click="saveImg">
          <img src="./assets/imgs/change.png" title="更换壁纸" @click="change()"> -->
      </div>
    </li>
    <li>
      <div>保存配置</div>
      <!-- <img src="./assets/imgs/cloud.png"> -->
    </li>
    <!-- <li @click="sendPri('设置功能尚未开发，敬请期待~')">
        <div>设置</div>
        <img src="./assets/imgs/setting.png">
      </li> -->
    <li>
      <div>删除图标</div>
    </li>
  </ul>
</template>
