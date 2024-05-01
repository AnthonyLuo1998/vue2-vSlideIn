<template>
  <div id="app">
    <div v-slide-in="{ direction: 'top' }" class="box"></div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  height: 200vh;
}

.box {
  width: 50px;
  aspect-ratio: 1/1;
  background-color: blue;
  position: absolute;
  bottom: -100px;
  left: 100px;
}
</style>
