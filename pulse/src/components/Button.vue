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
  background: #333434;
  border-radius: 20px;
  padding: 10px 18px;
  color: #bbb;
  cursor: pointer;
  font-weight: 600;

  transition: background-color 1s ease-in-out;
}
.button:hover {
  background: #777;
  color: #eee;
}
</style>