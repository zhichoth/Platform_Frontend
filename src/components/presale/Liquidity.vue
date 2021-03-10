<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Liquidity
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="block">
          <div class="block">
            <label
                :for="liquidity.amount"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token liquidity amount
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="liquidity.amount"
                  placeholder="Number of tokens to add as liquidity"
                  class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="liquidity.precentage"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token liquidity precentage
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="liquidity.precentage"
                  placeholder="Precentage of raised ETH that will be added as liquidity"
                  class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'presale.Liquidity.components',
  props: {
    liquidity: Object,
  },
  data: () => ({
    error: {

    }
  }),
  watch: {
    // token: {
    //   handler() {
    //     if (this.token.address !== '') {
    //       const response = axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${this.token.address}&apikey=${process.env.VUE_APP_ETHERSCAN_API}`);
    //       console.log(response);
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>