<template>
  <label>
    <span class="txt">{{label}}*</span>
    <input :type="type" :name="`${target}${field}`" v-model="input" />
  </label>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    target: String,
    field: String,
    label: String,
  },
  computed: {
    input: {
      get() {
        return this.$store.state[this.target][this.field]
      },
      set(value) {
        this.$store.commit('UPDATE_INPUT', {target: this.target, field: this.field, value})
      }
    }
  }
}
</script>

<style scoped>
.txt {
  display: block;
  margin-bottom: 10px;
}
input {
  border-radius: 10px;
  width: 100%;
  background: #4c4e5d;
  color: #fff;
  outline: 0;
  border: 0;
  padding: 10px 0px;
  font-size: 0.9em;
  margin-bottom: 10px;
}
</style>