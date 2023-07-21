<template>
  <VButton class="button is-light"
           @click="logOut"
  >
    LogOut
  </VButton>
</template>

<script>
import VButton from "@/components/framework/button/VButton"
import {mapActions} from "vuex";
export default {
  name: "ButtonLogOut",
  components: {VButton},
  methods:{
    ...mapActions(['logoutUser']),
    logOut(){
      this.logoutUser()
      this.$router.push('/login')
    }
  },
}
</script>
