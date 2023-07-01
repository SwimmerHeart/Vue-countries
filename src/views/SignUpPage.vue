<template>
  <div class="section">
      <div class="columns is-centered">
        <div class="box column is-narrow">
          <b-field label="Логин">
            <b-input value="Kevin Garvey"></b-input>
          </b-field>
          <b-field label="Пароль"
                   :message="['Password is too short', 'Password must have at least 8 characters']">
            <b-input value="123" type="password" maxlength="10"></b-input>
          </b-field>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "SignUpPage"
}
</script>

<style scoped>

</style>