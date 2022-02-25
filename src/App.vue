<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.shadow-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: white;
}

.radius-top {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.radius-bottom {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.warpper {
  padding: 0 8px;
}
html,
body {
  height: 100%;
  background-color: #ffffff;
  font-family: -apple-system, Helvetica, sans-serif;
}
</style>
