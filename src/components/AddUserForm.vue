<template>
  <form @submit.prevent="onSubmit">
   <slot></slot>
    <AuthInput label="Логин"
               placeholder="Введите логин"
               maxlength="15"
               v-model="user.login"
    />
    <AuthInput label="Пароль"
               placeholder="Введите пароль"
               type="password"
               maxlength="10"
               v-model="user.password"
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
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(){
      this.$emit('addUser', this.user)
      this.user.login = ''
      this.user.password = ''
    }
  }
}
</script>

<style scoped>

</style>