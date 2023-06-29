<template>
  <b-field :label="label"
           class="column is-narrow"
  >
    <b-select v-model="selectedItem">
      <option v-for="(option, index) in options"
              :value="option"
              :key="index"
      >
        {{option}}
      </option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: "VFormSelection",
  props: {
    value: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default (){
        return []
      }
    },
    label: {
      type: String,
      default: null
    }
  },
  computed:{
    selectedItem:{
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style scoped>

</style>