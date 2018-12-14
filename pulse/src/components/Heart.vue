<template>
  <div v-bind:class="{heart: true, beat}">
    <img :src="src" />
  </div>
</template>

<script>
export default {
  name: 'Heart',
  props: {
    beat: Boolean,
    src: String,
  },
}
</script>

<style scoped>
.heart.beat {
  opacity: 1;
}

.heart {
  opacity: 0.4;
  transition: opacity 0.5s ease-in-out;
  width: 200px;
}
</style>
