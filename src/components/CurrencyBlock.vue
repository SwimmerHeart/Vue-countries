<template>
  <div class="box">
    Курс Вашей валюты XX по отношению к XX равен 1:60
  </div>
</template>

<script>
import {getExchangeRate} from "@/api/currencies/api";

export default {
  name: "CurrencyBlock",
  props: {
    CurrencyCodeTo: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const getCurrencies = async () => {
      try {
        const exchangeData = await getExchangeRate()
        this.valutes = Object.values(exchangeData.Valute)
        // this.valutes.forEach(item => {
        //   this.currencyDisplay.push({
        //     Name: item['Name'],
        //     ID: item['CharCode']
        //   })
        // })
        // for (let code of this.valutes) {
        //   this.countries.push(code)
        // }
      } catch (error) {
        console.log(error)
      }
    }
    getCurrencies()
  },
  data() {
    return {
      valutes: {},
      convert: {
        amount: 1,
        CurrencyCodeFrom: '',
      },
    }
  },
  computed: {
    exchangeRate() {
      if (!this.convert.amount || !this.convert.CurrencyCodeFrom || !this.convert.CurrencyCodeTo) return ''
      const baseValue = {
        Value: 1,
        Nominal: 1
      }
      let codeFrom = this.convert.CurrencyCodeFrom,
          codeTo = this.convert.CurrencyCodeTo,
          amount = this.convert.amount

      let exchangeCurrencyFrom = 1 / ((this.valutes[codeFrom]?.Value ?? baseValue.Value) / (this.valutes[codeFrom]?.Nominal ?? baseValue.Nominal))
      let exchangeCurrencyTo = 1 / ((this.valutes[codeTo]?.Value ?? baseValue.Value) / (this.valutes[codeTo]?.Nominal ?? baseValue.Nominal))
      return (+amount * (exchangeCurrencyTo / exchangeCurrencyFrom)).toFixed(2)
    },
  }
}
</script>

<style scoped>

</style>