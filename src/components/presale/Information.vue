<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Presale information
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="block">
          <div class="block">
            <label
                :for="token.address"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token address
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.address"
                  placeholder="0xc77661f7af083e628c189ca2577107f37c82563c"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <label
              v-if="error.tokenAddress !== ''"
              class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.tokenAddress }}
              </span>
            </label>
          </div>
          <div class="block mt-4">
            <label
                :for="token.name"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Presale name
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.name"
                  placeholder="Name"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <label
                v-if="error.tokenName !== ''"
                class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.tokenName }}
              </span>
            </label>
          </div>
          <div class="block mt-4">
            <label
                :for="token.softcap"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Softcap in ETH
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="token.softcap"
                  placeholder="Softcap"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.hardcap"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Hardcap in ETH
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="token.hardcap"
                  placeholder="Hardcap"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.totalTokens"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Total tokens
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="token.totalTokens"
                  placeholder="Token presale allocation"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.tokenPresaleAllocation"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token Presale Allocation
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="token.tokenPresaleAllocation"
                  placeholder="Token presale allocation"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.startDate"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Start date
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="date"
                  v-model="token.startDate"
                  placeholder="Start date"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="token.endDate"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              End date
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="date"
                  v-model="token.endDate"
                  placeholder="End date"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div v-if="tokensPerEth" class="block mt-5  text-left">
            <span class="text-white">
              {{tokensPerEth}}
            </span>
            <span class="block mt-3 text-white">
              {{ethPerToken}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  name: 'presale.TokenAddress.components',
  props: {
    account: String,
    token: Object
  },
  data: () => ({
    tokensPerEth: null,
    ethPerToken: null,
    error: {
      tokenAddress: '',
      tokenName: '',
    }
  }),
  watch: {
    token: {
      handler() {
        // if (this.token.address !== '') {
        //   const response = axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${this.token.address}&apikey=${process.env.VUE_APP_ETHERSCAN_API}`);
        //   console.log(response);
        // }

        if (this.token.hardcap !== null && this.token.tokenPresaleAllocation !== null) {
          const tokenPerEth = this.token.tokenPresaleAllocation / this.token.hardcap;
          this.tokensPerEth = `${tokenPerEth} tokens per ETH`;
          this.token.tokensPerEth = tokenPerEth;

          const ethPerToken = this.token.hardcap / this.token.tokenPresaleAllocation;
          this.ethPerToken =`${ethPerToken} ETH per token`;
        } else {
          this.tokensPerEth = null;
        }
      },
      deep: true
    }
  }
}
</script>