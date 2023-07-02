<template>
  <b-field :label="label">
   <slot></slot>
  </b-field>
</template>

<script>
export default {
  name: "VField",
  props: {
    label: {
      type: String,
      default: ''
    }
  },
}
</script>

<style scoped>

</style>