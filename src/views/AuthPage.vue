<template>
  <div class="section">
    <div class="columns is-centered">
      <AddUserForm class="box column is-6-tablet is-5-desktop"
                   labelBtn="Авторизоваться"
                   @addUser="addUser"
      >
        <h3>Авторизация</h3>
      </AddUserForm>
    </div>
  </div>
</template>

<script>
import AddUserForm from "@/components/AddUserForm"
import {mapActions} from "vuex";

export default {
  name: "AuthPage",
  components: {
    AddUserForm
  },
  data (){
    return {
      user: {}
    }
  },
  methods: {
    ...mapActions(['GET_USERS']),
    addUser(user){
      this.user = user
    }
  },
}
</script>

<style scoped>

</style>