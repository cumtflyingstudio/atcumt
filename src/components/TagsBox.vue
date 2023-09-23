<script>
import { GridItem, GridLayout } from 'vue-grid-layout'
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
      layout: [
        { x: 3, y: 0, w: 1, h: 3, i: '0' },
        { x: 3, y: 0, w: 1, h: 3, i: '1' },
        { x: 2, y: 0, w: 1, h: 3, i: '2' },
        { x: 2, y: 0, w: 1, h: 3, i: '3' },
        { x: 4, y: 0, w: 1, h: 3, i: '4' },
        { x: 4, y: 0, w: 1, h: 3, i: '5' },
        { x: 5, y: 0, w: 1, h: 3, i: '6' },
        { x: 5, y: 0, w: 1, h: 3, i: '7' },
        { x: 6, y: 0, w: 1, h: 3, i: '8' },
        { x: 6, y: 0, w: 1, h: 3, i: '9' },
        { x: 7, y: 0, w: 1, h: 3, i: '10' },
        { x: 7, y: 0, w: 1, h: 3, i: '11' },
        { x: 8, y: 0, w: 1, h: 3, i: '12' },
        { x: 8, y: 0, w: 1, h: 3, i: '13' },
        { x: 9, y: 0, w: 1, h: 3, i: '14' },
        { x: 9, y: 0, w: 1, h: 3, i: '15' },
      ],
    }
  },
  mounted() {
    this.tags = this.$store.state.tagList
  },
  methods: {
    openTag(t) {
      window.open(t.url, '_blank')
    },
    showModal() {
      this.open = true
    },
    handleOk(e) {
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
    onDrop(dropResult) {
      this.tags = applyDrag(this.tags, dropResult)
    },
    getGhostParent() {
      return document.body
    },
    onDropReady(dropResult) {
      console.debug('drop ready', dropResult)
    },
  },
})
</script>

<template>
  <div>
    <div>
      <GridLayout
        v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="true" :is-resizable="true"
        :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true" class="tagsBox"
      >
        <GridItem
          v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
          class="itemBox"
        >
          <div class="ico" @contextmenu.prevent.stop="rightClick(tag)">
            <img class="tagIcon">
          </div>
          <div class="tagName">
            123456
          </div>
        </GridItem>
      </GridLayout>
      <!-- <div v-for="tag in tags" class="tagBox" @click="openTag(tag)">
              <div class="ico" @contextmenu.prevent.stop="rightClick(tag)">
                  <img :src=tag.icon class="tagIcon">
              </div>
              <div class="tagName">
                  {{ tag.name }}
              </div>
          </div>
          <div class="tagBox">
              <div class="ico">
                  <div class="tagIcon" id="addTag" @click="showModal"></div>
              </div>
              <div class="tagName">
                  添加标签
              </div>
          </div> -->
    </div>
  </div>
  <div>
    <a-modal v-model:open="open" title="添加标签" @ok="handleOk">
      <a-space direction="vertical" class="add">
        <a-input v-model:value="name" placeholder="标签名称" />
        <a-input v-model:value="url" placeholder="请输入正确的url(域名)无需添加http" />
      </a-space>
      <div class="selectIcon" />
    </a-modal>
  </div>
</template>

<style></style>
