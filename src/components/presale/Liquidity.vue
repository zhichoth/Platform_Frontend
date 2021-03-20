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
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
          </div>
          <div class="block mt-4">
            <label
                :for="liquidity.percentage"
                class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
              Token liquidity precentage
            </label>
            <div class="mt-1 flex rounded-md">
              <input
                  type="number"
                  v-model="liquidity.percentage"
                  placeholder="Precentage of raised ETH that will be added as liquidity"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div v-if="tokensPerEthStr" class="block mt-5 text-left">
              <span class="text-white">
                {{tokensPerEthStr}}
              </span>
            </div>
            <div v-if="listingPrice" class="block mt-5 text-left">
              <span class="text-white">
                {{listingPrice}}
              </span>
            </div>
          </div>
          <div class="mx-auto w-1/2 mt-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="checkbox" class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600" v-model="liquidity.locked">
                  <span class="text-white ml-2">Locked</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="checkbox" class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600" v-model="liquidity.permaBurn">
                  <span class="text-white ml-2">Perma-burn</span>
                </label>
              </div>
            </div>
          </div>
          <div
            v-if="liquidity.locked"
            class="block mx-auto w-1/2">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="checkbox" class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600" v-model="liquidity.timeLocked">
                  <span class="text-white ml-2">Timelocked</span>
                </label>
              </div>
              <div>
                <label class="inline-flex items-center mt-9">
                  <input type="checkbox" class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600" v-model="liquidity.interval">
                  <span class="text-white ml-2">Interval</span>
                </label>
              </div>
            </div>
          </div>
          <div class="block w-full" v-if="liquidity.timeLocked">
            <label class="items-center">
              <label
                  :for="liquidity.releaseDate"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Release date
              </label>
              <input type="date"
                     v-model="liquidity.releaseDate"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </label>
          </div>
          <div v-if="liquidity.interval" class="grid grid-cols-3 gap-4">
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalStartDate"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Start date
              </label>
              <input type="date"
                     v-model="liquidity.intervalStartDate"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalInDays"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Interval
              </label>
              <input type="number"
                     placeholder="Interval in days"
                     v-model="liquidity.intervalInDays"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
            </div>
            <div class="col-span-1">
              <label
                  :for="liquidity.intervalPercentage"
                  class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                Interval percentage {{ tokensPerEth }}
              </label>
              <input type="number"
                     placeholder="Interval percentage"
                     v-model="liquidity.intervalPercentage"
                     class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
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
    hardCap: String,
    tokensPerEth: Number,
  },
  data: () => ({
    tokensPerEthStr: null,
    listingPrice: null,
    error: {

    }
  }),
  watch: {
    liquidity: {
      handler() {
        if (this.liquidity.permaBurn && !this.liquidity.locked) {
          this.liquidity.locked = false;
          this.liquidity.timeLocked = false;
          this.liquidity.interval = false;
        } else if (this.liquidity.permaBurn && this.liquidity.locked) {
          this.liquidity.locked = false;
          this.liquidity.timeLocked = false;
          this.liquidity.interval = false;
        } else if (this.liquidity.locked) {
          this.liquidity.permaBurn = false;
        }

        if (this.hardCap !== null && this.liquidity.amount !== null && this.liquidity.percentage !== null) {
          const liquidityPercentage = Number(this.hardCap) / 100 * this.liquidity.percentage;
          const tokenLiqAmount = this.liquidity.amount / liquidityPercentage;
          this.tokensPerEthStr = `${tokenLiqAmount} tokens per ETH`;

          const listingPrice = tokenLiqAmount / this.tokensPerEth;
          this.listingPrice = `listing price is ${listingPrice} times presale price`;
        }
      },
      deep: true
    }
  }
}
</script>