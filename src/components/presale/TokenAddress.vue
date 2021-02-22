<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Token information
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="grid grid-cols-1 gap-6">
          <div class="col-span-1">
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
                  class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
            </div>
            <label
              v-if="error.tokenAddress !== ''"
              class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.tokenAddress }}
              </span>
            </label>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-5">
          <div class="col-span-1">
            <label
                :for="token.name"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token name
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.name"
                  placeholder="YSEC"
                  class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
            </div>
            <label
                v-if="error.tokenAddress !== ''"
                class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.tokenAddress }}
              </span>
            </label>
          </div>
          <div class="col-span-1">
            <label
                :for="token.company"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Company name
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="token.company"
                  placeholder="Yearn Secure"
                  class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
            </div>
            <label
                v-if="error.companyName !== ''"
                class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.companyName }}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'presale.TokenAddress.components',
  props: {
    account: String,
    token: Object
  },
  data: () => ({
    error: {
      tokenAddress: '',
      tokenName: '',
      companyName: ''
    }
  }),
  watch: {
    token: {
      handler() {
        if (this.token.address === this.account) {
          this.error.tokenAddress = '';
        } else {
          this.error.tokenAddress = 'Token address does not match your connected META MASK wallet.';
        }
      },
      deep: true
    }
  }
}
</script>