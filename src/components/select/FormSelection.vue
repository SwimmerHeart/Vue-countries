<template>
  <VFormSelection :options="options"
                  v-model="selectedItem"
                  label="Выберете варианты для конвертации"
  />
</template>

<script>
import VFormSelection from "@/components/framework/select/VFormSelection"
export default {
  name: "FormSelection",
  components: {
    VFormSelection
  },
  props: {
    value:{
      type: String
    },
    options: {
      type: Array,
      default (){
        return []
      }
    }
  },
  methods:{
    selectOption(option){
      this.$emit('selectOption', option)
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