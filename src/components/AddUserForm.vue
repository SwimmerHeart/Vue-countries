<template>
  <form @submit.prevent="onSubmit">
   <slot></slot>
    <AuthInput label="Логин"
               placeholder="Введите логин"
               maxlength="10"
               v-model.trim="login"
    />
    <AuthInput label="Пароль"
               placeholder="Введите пароль"
               type="password"
               maxlength="10"
               v-model.trim="password"
               password-reveal
    />
    <VButton submit="submit"
    >{{labelBtn}}
    </VButton>
  </form>
</template>

<script>
import VButton from "@/components/framework/button/VButton"
import AuthInput from "@/components/input/AuthInput"

export default {
  name: "RegistrationForm",
  components: {
    VButton,
    AuthInput
  },
  props:{
    labelBtn: {
      type: String,
      default: 'Ок'
    }
  },
  data (){
    return {
        login: '',
        password: ''
    }
  },
  methods: {
    onSubmit(){
      if(this.login && this.password){
        const user = {
          login: this.login.toLowerCase(),
          password: this.password.toLowerCase()
        }
        this.$emit('addUser', user)
        this.login = ''
        this.password = ''
      }
    }
  }
}
</script>

<style scoped>

</style>