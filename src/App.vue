<script>
import Search from '@/components/Search.vue'
import TimeBox from '@/components/TimeBox.vue'
import TagsBox from '@/components/TagsBox.vue'
import UserBox from '@/components/UserBox.vue'

export default ({
  components: {
    TagsBox,
    Search,
    TimeBox,
    UserBox,
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
    }
  },
  mounted() {
    const body = document.body
    const back = JSON.parse(localStorage.getItem('background'))
    const video = document.getElementById('video')
    if (back !== null) {
      if (back.type === 'pic') {
        video.style.display = 'none'
        body.style.backgroundImage = `url(${back.src})`
      }
      else {
        body.style.backgroundImage = ''
        video.style.display = 'block'
        // console.debug('!!!!!!')
        body.style.backgroundImage = `url(${back.src})`
        video.src = back.link
      }
      // if (back.src !== null)
      //   video.style.display = 'none'
      // body.style.backgroundImage = `url(${back.src})`
    }
  },
  methods: {
    openMenu(e) {
      console.debug(e)
      const w = window.screen.width
      const h = window.screen.height
      const x = e.pageX
      const y = e.pageY
      console.debug('!!!')
      this.left = x
      this.top = y
      if (w - x < 180)
        this.left = x - 162
      if (h - y < 250)
        this.top = y - 104
      this.visible = true
      this.$store.state.vis = true
      // console.debug(this.$store.state.vis)
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
  <div class="navi" @click="closeMenu()" @contextmenu.prevent="openMenu($event)">
    <div class="video">
      <video id="video" src="@/assets/background/wallpaper0.mp4" muted loop autoplay />
      <!-- <img src="@/assets/background/backgroundPic2.png"> -->
    </div>
    <TimeBox />
    <Search />
    <TagsBox />
    <UserBox />
    <ul
      v-show="visible"
      :style="{ left: `${left}px`, top: `${top}px` }"
      class="contextmenu"
    >
      <li>
        <div>更换壁纸</div>
      </li>
      <li>
        <div>保存配置</div>
        <!-- <img src="./assets/imgs/cloud.png"> -->
      </li>
      <li>
        <div>编辑模式</div>
      </li>
    </ul>
  </div>
  <!-- <RouterView /> -->
</template>
