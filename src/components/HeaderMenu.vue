<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/countries' }">
        <router-link to="/countries">Страны мира</router-link>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <h5 class="title">{{ getUserName }}</h5>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <CountryUser />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <ButtonLogOut />
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import ButtonLogOut from "@/components/ButtonLogOut"
import CountryUser from "@/components/SelectCountry"
import {mapGetters} from 'vuex'

export default {
  name: "HeaderMenu",
  components: {CountryUser, ButtonLogOut},
  computed: mapGetters(['getUserName'])
}
</script>

<style scoped>

</style>