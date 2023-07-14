<template>
  <section class="section">
    <div class="columns is-centered">
      <h1 class="title">{{ universityName }}</h1>
    </div>
    <div class="columns">
      <p class="column is-size-4"><strong>Страна:</strong> {{ country }}</p>
      <p class="column is-size-4"><strong>Сайт:</strong> <a
          :href="$attrs.props?.web_pages[0]">{{ universityWebpage }}</a></p>
    </div>
  </section>
</template>

<script>
export default {
  name: "UniversityPage",
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  },
  computed:{
    universityName () {
      return this.$route.params.props.name
    },
    country () {
      return this.$route.params.props.country
    },
    universityWebpage () {
      return this.$route.params.props?.web_pages[0]
    },
  }
}
</script>

<style scoped>

</style>