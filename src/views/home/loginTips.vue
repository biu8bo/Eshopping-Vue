<template>
  <div>
    <div style="text-align: center; margin: 250px 0">
      <div style="margin-bottom:20px;font-size:14px">为了提供更优质的服务，请先登录</div>
      <div>
        <van-button
          style="width: 80%; height: 40px"
          round
          color="linear-gradient(90deg,#f35447 0,#ff8e3c)"
          @click="$router.push({name:'Login'})"
          >去登录</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>