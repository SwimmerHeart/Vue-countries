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
        <SelectCountryName v-model="selectedItem"
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
import SelectCountryName from "@/components/select/SelectCountryName"
import VButton from "@/components/framework/button/VButton"
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "HeaderMenu",
  components: {VButton, SelectCountryName},
  data() {
    return {
    }
  },
  methods:{
    ...mapActions(['logoutUser', 'setCountryUser']),
    logOut(){
      this.logoutUser()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['getUserName','getCountryUser']),
    selectedItem: {
      get() {
        return this.getCountryUser
      },
      set(value) {
        this.setCountryUser(value)
      }
    },
  },
}
</script>

<style scoped>

</style>