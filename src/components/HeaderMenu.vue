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
        <NameSelection :options="getCountriesSelectName"
                       placeholder="Country"
                       icon="earth"
        />
      </b-navbar-item>
      <b-navbar-item tag="div">
        <VButton class="button is-light"
                 @click="logOut"
        >
          LogOut
        </VButton>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import NameSelection from "@/components/select/NameSelection"
import VButton from "@/components/framework/button/VButton"
import {mapGetters} from 'vuex'

export default {
  name: "HeaderMenu",
  components: {VButton, NameSelection},
  data() {
    return {
    }
  },
  methods:{
    logOut(){
      // this.$store.dispatch('DELETE_USER_TO_VUEX')
      // this.$router.push('/login')
        this.$store.dispatch('logoutUser')
        this.$router.push('/login')
    }
  },
  computed: mapGetters(['getUserName', 'getCountriesSelectName']),
}
</script>

<style scoped>

</style>