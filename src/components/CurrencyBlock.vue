<template>
  <div class="box subtitle">
    Курс Вашей валюты {{getInfoCodeCurrency}} по отношению к {{ this.currencyCodeTo }} равен 1 : {{exchangeRate}}
  </div>
</template>

<script>
import {getExchangeRate} from "@/api/currencies/api";
import {mapGetters} from "vuex";

export default {
  name: "CurrencyBlock",
  props: {
    currencyCodeTo: {
      type: String,
      default: ''
    }
  },
  created() {
    const getCurrencies = async () => {
      try {
        const exchangeData = await getExchangeRate()
        this.valutes = exchangeData.Valute
      } catch (error) {
        console.log(error)
      }
    }
    getCurrencies()
  },
  data() {
    return {
      valutes: {},
      amount: 1,
    }
  },
  computed: {
    ...mapGetters(['getCountriesSelectName','getCountryUser', 'getInfoCodeCurrency']),
    exchangeRate() {
      if (!this.getInfoCodeCurrency || !this.currencyCodeTo) return ''
      const baseValue = {
        Value: 1,
        Nominal: 1
      }
      let codeFrom = this.getInfoCodeCurrency,
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