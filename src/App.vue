<template>
  <div class="navi">
    <div class="video">
      <video src="@/assets/wallpaper.mp4" muted loop autoplay></video>
    </div>
    <TimeBox></TimeBox>
    <Search></Search>
    <TagsBox></TagsBox>
    <UserBox></UserBox>
  </div>
</template>

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
  }
})
</script>
