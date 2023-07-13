<template>
    <div class="container is-fullhd">
      <HeaderMenu />
      <router-view></router-view>
    </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu"

export default {
  name: "MainLayout",
  components: {HeaderMenu},
}
</script>

<style scoped>

</style>