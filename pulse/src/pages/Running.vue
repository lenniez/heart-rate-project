<template>
  <div class="running">
    <span>Now gaze at each other for four minutes.<br />
    The lights will brighten when the session is over.</span>
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
  background:#222222;
  position: fixed;
  top: 0;
  left: 10%;
  right: 0;
  bottom: 0;
  display: flex;
  justify-items: center;
  align-items: center;
  text-align: left;
  font-size: 2em;
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