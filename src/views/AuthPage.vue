<template>
  <div class="container">
    <div class="section">
      <div class="columns is-centered">
        <div class="box column is-6-tablet is-5-desktop">
          <AddUserForm labelBtn="Авторизоваться"
                       @addUser="addUser"
          >
            <h3 class="title">Авторизация</h3>
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

export default {
  name: "AuthPage",
  components: {
    AddUserForm
  },
  data (){
    return {
    }
  },
  methods: {
    addUser(user){
    //     this.$store.dispatch('GET_USER_TO_VUEX', user)
    //         .then(success=> {
    //           console.log(success)
    //           if (success) {
    //             this.$router.push("/");
    //           } else {
    //             alert("Неверный логин или пароль!");
    //           }
    //           // success ? this.$router.push('countries') : alert("Неверный логин или пароль!")
    //         })
      this.$store.dispatch('loginUser', user)
      this.$router.push('/countries');

    }
  },
}
</script>

<style scoped>

</style>