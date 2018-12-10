<template>
  <div class="root">
    <div class="humans">
      <div class="human">
        <h3>Human 1</h3>
        <TextInput type="text" field="name" target="human1" label="Name" />
        <TextInput type="tel" field="phone" target="human1" label="Phone" />
      </div>
      <div class="human">
        <h3>Human 2</h3>
        <TextInput type="text" field="name" target="human2" label="Name" />
        <TextInput type="tel" field="phone" target="human2" label="Phone" />
      </div>
    </div>
    <Button class="go" @button-click="next">Next</Button>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import Button from '../components/Button.vue';


export default {
  name: 'Humans',
  components: {
    TextInput,
    Button,
  },
  methods: {
    next() {
      this.$router.push('/saving')
    },
  }
}
</script>

<style scoped>
.root {
  width: 100%;
}
.humans {
  display: flex;
  flex-direction: row;
}
.human {
  margin: 0 40px;
  width: 100%;
}
.go {
  margin: 0 auto;
  display: block;
}
</style>
