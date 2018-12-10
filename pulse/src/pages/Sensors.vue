<template>
  <div class="hearts">
    <div class="h">
      <Heart :beat="heartLeft" />
    </div>
    <div class="h">
      <Heart :beat="heartRight" />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Heart from '../components/Heart.vue'


export default {
  name: 'Sensors',
  components: {
    Heart,
  },
  computed: mapState({
    heartLeft: state => state.hasBeat[0],
    heartRight: state => state.hasBeat[1],
  }),
}
</script>

<style scoped>
.hearts {
  display: flex;
  flex-direction: row;
  margin: 20px;
}
</style>
