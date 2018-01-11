<style>

</style>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    const imgArr = new Array(5).fill(0).map((x, i) => `static/images/bg${i}.jpg`);
    imgArr.sort(() => Math.random() - Math.random());
    $.backstretch(imgArr, {
      fade: 2000,
      duration: 5000
    });
  }
};
</script>
