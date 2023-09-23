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
})
</script>

<template>
  <div class="navi">
    <div class="video">
      <video src="@/assets/wallpaper.mp4" muted loop autoplay />
    </div>
    <TimeBox />
    <Search />
    <TagsBox />
    <UserBox />
  </div>
  <!-- <RouterView /> -->
</template>
