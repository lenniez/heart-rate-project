<template>
  <div class="running">
    <h1>now ... for four minutes</h1>
  </div>
</template>

<script>
export default {
  name: 'Running',
  mounted() {
    setTimeout(() => {
      this.$router.push('/');
    }, 10 * 1000);
  }
}
</script>

<style>
.running {
  background:#000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: center;
}

h1 {
  animation: descText 1s ease-in 3s forwards;
}

@keyframes descText {
  to {
    opacity: 0;
  }
}
</style>