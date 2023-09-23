<script>
export default {
  data() {
    return {
      currentTime: '',
    }
  },
  mounted() {
    if (this.currentTime === '')
      this.currentTime = new Date().toLocaleTimeString()

    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString()
    }, 1000)
  },

}
</script>

<template>
  <div class="timeBox">
    {{ currentTime }}
  </div>
</template>

<style scoped></style>
