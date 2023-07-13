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
export default {
  name: "RegistryPage",
  components: {
    AddUserForm
  },
  data (){
    return {

    }
  },
  methods: {
    addUser(user){
      // this.$store.dispatch('ADD_USER_TO_VUEX', user)
      // this.$router.push('/countries')
      this.$store.dispatch('registerUser', user)
      this.$router.push('/countries');
    }
  },
}
</script>

<style scoped>

</style>