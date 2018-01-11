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
    const imgArr = new Array(7).fill(0).map((x, i) => `static/images/bg${i}.jpg`);
    imgArr.sort(() => Math.random() - Math.random());
    console.log(imgArr);
    $.backstretch(imgArr, {
      fade: 2000,
      duration: 5000
    });
  }
};
</script>
