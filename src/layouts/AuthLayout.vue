<template>
  <div class="block has-background-dark is-flex is-align-items-center is-justify-content-center">
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AuthLayout"
}
</script>

<style scoped>
  .block{
    height: 100vh;
  }
</style>