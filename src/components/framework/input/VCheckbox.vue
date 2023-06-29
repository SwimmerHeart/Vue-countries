<template>
  <b-checkbox v-model="checkbox"
              :true-value="trueValue"
              :false-value="falseValue"
  >
    {{ label }}
  </b-checkbox>
</template>

<script>
export default {
  name: "VCheckbox",
  props: {
    value: {
      type: [String, Boolean],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    trueValue:{
      type: [Boolean, String, Number]
    },
    falseValue:{
      type: [Boolean, String, Number]
    },
  },
  computed: {
    checkbox: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>