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
  border-radius: 8px;
  background: white;
}

 .radius-top {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.radius-bottom {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
.warpper {
  padding: 0 8px;
}
html {
  background-color: #ffffff;
}
</style>
