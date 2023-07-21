<template>
  <div class="box subtitle">
    Курс Вашей валюты {{currencyCodeFrom}} по отношению к {{ currencyCodeTo }} равен 1 : {{exchangeRate}}
  </div>
</template>

<script>
import {getExchangeRate} from "@/api/currencies";
import {mapGetters} from "vuex";
import {getCountriesDataByName} from "@/api/countries";

export default {
  name: "CurrencyBlock",
  props: {
    currencyCodeTo: {
      type: String,
      default: ''
    }
  },
  created() {
    this.getCurrencies()
  },
  data() {
    return {
      valutes: {},
      amount: 1,
      currencyCodeFrom: ''
    }
  },
  methods:{
    async getCurrencies(){
      try {
        const exchangeData = await getExchangeRate()
        this.valutes = exchangeData.Valute
      } catch (error) {
        console.log(error)
      }
    },
    async getCountries(){
      try {
        const data = await getCountriesDataByName(this.getCountryUser)
        this.currencyCodeFrom = Object.keys(data[0].currencies)[0]
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    ...mapGetters(['getCountryUser']),
    exchangeRate() {
      this.getCountries()
      if (!this.currencyCodeFrom || !this.currencyCodeTo) return ''
      const baseValue = {
        Value: 1,
        Nominal: 1
      }
      let codeFrom = this.currencyCodeFrom,
          codeTo = this.currencyCodeTo,
          amount = this.amount
      let exchangeCurrencyFrom = 1 / ((this.valutes[codeFrom]?.Value ?? baseValue.Value) / (this.valutes[codeFrom]?.Nominal ?? baseValue.Nominal))
      let exchangeCurrencyTo = 1 / ((this.valutes[codeTo]?.Value ?? baseValue.Value) / (this.valutes[codeTo]?.Nominal ?? baseValue.Nominal))
      return (+amount * (exchangeCurrencyTo / exchangeCurrencyFrom)).toPrecision(4)
    }
  }
}
</script>

<style scoped>

</style>