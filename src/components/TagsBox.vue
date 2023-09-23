<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import Kxz from '@/assets/ico/kxz.png'
import { applyDrag } from '@/utils/helpers'

export default ({
  components: {
    Container,
    Draggable,
  },
  data() {
    return {
      url: '',
      name: '',
      open: false,
      tags: [],
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
  <Container
    class="tagsBox" :get-ghost-parent="getGhostParent" :remove-on-drop-out="true" @drop="onDrop"
    @drop-ready="onDropReady"
  >
    <Draggable v-for="tag in tags" :key="tag.key" class="tagBox" @click="openTag(tag)">
      <div class="ico" @contextmenu.prevent.stop="rightClick(tag)">
        <img :src="tag.icon" class="tagIcon">
      </div>
      <div class="tagName">
        {{ tag.name }}
      </div>
    </Draggable>
    <div class="tagBox">
      <div class="ico">
        <div id="addTag" class="tagIcon" @click="showModal" />
      </div>
      <div class="tagName">
        添加标签
      </div>
    </div>
  </Container>
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
