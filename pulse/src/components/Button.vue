<template>
  <button @click="$emit('button-click', $event)" class="button">
    <slot>Ok</slot>
  </button>
</template>

<script>
export default {

}
</script>

<style>
.button {
  border: 0 none;
  background: #F8E71C;
  border-radius: 10px;
  padding: 8px 30px;
  color: #222;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1em;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.button:hover {
  /* background: #777; */
  opacity: 0.7;
  /* color: #000; */
}
</style>