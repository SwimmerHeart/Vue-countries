<template>
  <div class="container">
    <div class="section">
      <div class="columns is-centered">
        <div class="box column is-6-tablet is-5-desktop">
          <AddUserForm
              labelBtn="Зарегистрироваться"
              @addUser="addUser"
          >
            <h3 class="title">Регистрация</h3>
            <p v-if="isAuth"
               class="has-text-danger"
            >Данный логин уже есть в системе</p>
          </AddUserForm>
          <p class="subtitle mt-2">
            Уже есть аккаунт? <span><router-link :to="{ name: 'login'}">Войти</router-link></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddUserForm from "@/components/AddUserForm"
import {mapActions, mapGetters} from "vuex";
export default {
  name: "RegistryPage",
  components: {
    AddUserForm
  },
  data (){
    return {
      isAuth: false
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    addUser(user){
      const usersStorage = JSON.parse(localStorage.getItem('users')) || []
      const loginUser = usersStorage.some(item=>item.login === user.login)
      if(!loginUser){
        this.registerUser(user)
        this.$router.push('/countries')
        this.isAuth = false
      }
      else this.isAuth = true
    }
  },
  // computed: mapGetters(['getUsers'])
}
</script>

<style scoped>

</style>