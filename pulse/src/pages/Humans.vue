<template>
  <div class="root">
    <div class="intro">
      In this experience, you will hear each others’ heartbeats,<br />
      and the room will change color based on your heart rates.<br />
      Begin the journey below...
    </div>
    <div class="humans">
      <div class="human human1">
        <h3>Human 1</h3>
        <TextInput type="text" field="name" target="human1" label="Name" />
        <TextInput type="tel" field="phone" target="human1" label="Phone" />
      </div>
      <div class="human human2">
        <h3>Human 2</h3>
        <TextInput type="text" field="name" target="human2" label="Name" />
        <TextInput type="tel" field="phone" target="human2" label="Phone" />
      </div>
    </div>
    <div class="action">
      <Button class="go" @button-click="next">Next</Button>
      <div class="skip">
        Or to remain anonymous, <a href="#" @click="skip">skip this step</a>.
      </div>
    </div>
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
    skip() {
      this.$router.push('/go')
    }
  }
}
</script>

<style scoped>
.humans {
  display: flex;
  flex-direction: row;
}
.human {
  width: 100%;
}
.human2 {
  margin-right: 40px;
}
.human1 {
  margin-right: 40px;
}
.action {
  text-align: right;
}
.intro {
  line-height: 2.4;
  font-size: 1.2em;
  margin: 40px 0;
}
.action .skip {
  font-size: 0.9em;
  margin-top: 40px;
}
.action a {
  color: #f8E71C;
  text-decoration: none;
}
</style>
