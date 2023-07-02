<template>
  <div class="section">
      <div class="columns is-centered">
        <AddUserForm class="box column is-6-tablet is-5-desktop"
                     labelBtn="Зарегистрироваться"
                     @addUser="addUser"
        >
          <h3>Регистрация</h3>
        </AddUserForm>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AddUserForm from "@/components/AddUserForm"
export default {
  name: "SignUpPage",
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
  watch: {
    user(){
      this.GET_USERS(this.user)
    }
  },
}
</script>

<style scoped>

</style>