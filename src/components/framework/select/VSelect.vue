<template>
    <b-select v-model="selectedItem"
              :placeholder="placeholder"
    >
      <option v-for="option in options"
              :value="option.ID"
              :key="option.ID"
      >
        {{option.Name}}
<!--        <slot>именованный-->
      </option>
    </b-select>
</template>

<script>
export default {
  name: "VSelect",
  //добавить 2 ключа, которые покажут что является value и label
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
    placeholder:{
      type: String,
      default: ''
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