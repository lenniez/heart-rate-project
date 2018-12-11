<template>
  <div class="inner">
    <transition
      name="slide-left"
      mode="out-in"
      class="slide-left"
    >
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import store from './store'


export default {
  name: 'app',
  metaInfo: {
    meta: [
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {charset: 'utf-8'},
    ],
  },
  store,
  data() {
    return {
      prevHeight: 0,
    };
  },
  state: {

  },
  methods: {
    
  }
}
</script>

<style>
body {
  background: #222;
  color: #eee;
  margin-top: 100px;
}
body, input {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.inner {
  margin: 0 40px;
}
.slide-left {
  transform: translate(0, 0);
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);

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
