<template>
  <div class="inner">
    <transition
      name="slide-right"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import store from './store'


export default {
  name: 'app',
  store,
  data() {
    return {
      prevHeight: 0,
    };
  },
  state: {

  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const {height} = getComputedStyle(element).height;
      element.style.height = this.prevHeight;
      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto'
    }
  }
}
</script>

<style>
body {

  background: #4c4e5d;
  color: #eee;
}
body, input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.inner {
  max-width: 800px;
  margin: 0 auto;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
