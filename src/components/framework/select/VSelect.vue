<template>
  <b-select v-model="selectedItem"
            :placeholder="placeholder"
            :icon="icon"
  >
    <option v-for="option in options"
            :value="option.name"
            :key="option.name"
    >
      {{ option.name }}
    </option>
  </b-select>
</template>

<script>
export default {
  name: "VSelect",
  props: {
    value: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    selectedItem: {
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