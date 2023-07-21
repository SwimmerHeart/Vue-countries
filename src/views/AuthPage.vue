<template>
  <div class="container">
    <div class="section">
      <div class="columns is-centered">
        <div class="box column is-6-tablet is-5-desktop">
          <AddUserForm labelBtn="Авторизоваться"
                       @addUser="addUser"
          >
            <h3 class="title">Авторизация</h3>
            <p v-if="isAuth"
               class="has-text-danger"
            >Неправильное имя пользователя или пароль, попробуйте еще раз.</p>
          </AddUserForm>
          <p class="subtitle mt-2">
            Нет аккаунта? <span><router-link :to="{ name: 'registry'}">Зарегистрироваться</router-link></span>
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
  name: "AuthPage",
  components: {
    AddUserForm
  },
  data (){
    return {
      isAuth: false
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    addUser(user){
      const usersStorage = JSON.parse(localStorage.getItem('users')) || []
      const loginUser = usersStorage.find(item=>item.name === user.login && item.password === user.password)
      if(loginUser){
        this.loginUser(user)
        this.$router.push('/countries')
        this.isAuth = false
      }
      else this.isAuth = true
    }
  },
  computed: mapGetters(['getUsers'])
}
</script>

<style scoped>

</style>