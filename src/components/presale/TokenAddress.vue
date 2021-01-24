<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Presale is work in progress
    </h1>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Token address
    </h1>
    <h3 class="text-4xl font-light text-gray-700 dark:text-gray-200">
      Enter your token address
    </h3>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="grid grid-cols-1 gap-6">
          <div class="col-span-1">
            <label
                :for="tokenAddress"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token address
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="text"
                  v-model="tokenAddress"
                  placeholder="0xc77661f7af083e628c189ca2577107f37c82563c"
                  class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
            </div>
            <label
              v-if="error.msg !== ''"
              class="block text-left text-sm font-medium text-gray-200">
              <span class="text-red-500 text-xs">
                {{ error.msg }}
              </span>
            </label>
            <div
              v-if="isValid"
              class="mt-5 rounded-md">
              <button
                v-on:click="nextStep"
                type="button"
                class="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-white bg-gray-700 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Next
              </button>
            </div>
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
    currentStep: Number
  },
  data: () => ({
    tokenAddress: '',
    isValid: false,
    error: {
      msg: '',
    }
  }),
  methods: {
    nextStep: function() {
      this.$emit('nextStep', this.tokenAddress, this.currentStep);
    }
  },
  watch: {
    tokenAddress: {
      handler() {
        if (this.tokenAddress === this.account) {
          this.error.msg = '';
          this.isValid = !this.isValid;
        } else {
          this.error.msg = 'Token address does not match your connected META MASK wallet.';
          this.isValid = !this.isValid;
        }
      },
      deep: true
    }
  }
}
</script>