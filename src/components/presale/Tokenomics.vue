<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Tokenomics
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="grid grid-cols-3">
          <div class="col-span-2">
            <div class="relative text-center pt-1">
              <span v-if="remainingTokens === 0 && !showRemainingTokens" class="block text-white w-full mt-2">
                {{remainingAmount}} tokens remain
              </span>
              <span v-else class="block text-white w-full mt-2">
                {{remainingTokens}} tokens remain
              </span>
              <div class="overflow-hidden h-5 mt-2 text-center text-xs flex rounded bg-gray-400">
                <div v-for="(allocation, key) in allocations" :key="key" :style="allocation.style" class="h-5 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
              </div>
              <span class="block text-white w-full mt-2">
                {{totalPercentage}}%
              </span>
            </div>

            <div class="block mt-8">
              <div v-for="(allocation, key) in allocations" class="block" :key="key">
                <div class="grid grid-cols-5 gap-4 mt-5">
                  <div class="col-span-2 text-left">
                    <label :for="allocation.name" class="text-white">Allocation</label>
                    <input
                        type="text"
                        v-model="allocation.name"
                        placeholder="Name"
                        class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
                  </div>
                  <div class="text-left">
                    <label :for="allocation.amount" class="text-white">Amount</label>
                    <input
                        type="number"
                        v-model="allocation.amount"
                        min="0"
                        placeholder="Amount"
                        class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
                  </div>
                  <div>
                    <label class="inline-flex items-center mt-9">
                      <input type="checkbox" class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600" v-model="allocation.timelocked">
                      <span class="text-white ml-2">Timelocked</span>
                    </label>
                  </div>
                  <div>
                    <label class="inline-flex items-center mt-9">
                      <input type="checkbox" class="form-checkbox w-4 h-4 rounded bg-gray-800 text-yellow-600" v-model="allocation.interval">
                      <span class="text-white ml-2">Interval</span>
                    </label>
                  </div>
                </div>
                <div class="block w-1/2" v-if="allocation.timelocked">
                  <label class="items-center">
                    <label
                        :for="allocation.releaseDate"
                        class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                      Release date
                    </label>
                    <input type="date"
                           v-model="allocation.releaseDate"
                           class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                            text-gray-600 dark:text-gray-300
                            border border-transparent
                            focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                            bg-gray-100 dark:bg-gray-700">
                  </label>
                </div>
                <div class="block w-full" v-if="allocation.interval">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="col-span-1">
                        <label
                            :for="allocation.intervalStartDate"
                            class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                          Start date
                        </label>
                        <input type="date"
                               v-model="allocation.intervalStartDate"
                               class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                                text-gray-600 dark:text-gray-300
                                border border-transparent
                                focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                                bg-gray-100 dark:bg-gray-700">
                    </div>
                    <div class="col-span-1">
                      <label
                          :for="allocation.intervalInDays"
                          class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Interval
                      </label>
                      <input type="number"
                             placeholder="Interval in days"
                             v-model="allocation.intervalInDays"
                             class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                              text-gray-600 dark:text-gray-300
                              border border-transparent
                              focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                              bg-gray-100 dark:bg-gray-700">
                    </div>
                    <div class="col-span-1">
                      <label
                          :for="allocation.intervalPercentage"
                          class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Interval percentage
                      </label>
                      <input type="number"
                             placeholder="Interval percentage"
                             v-model="allocation.intervalPercentage"
                             class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                  text-gray-600 dark:text-gray-300
                  border border-transparent
                  focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                  bg-gray-100 dark:bg-gray-700">
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="totalPercentage < 100" class="block mt-5">
                <div>
                    <button
                        v-on:click="addAllocation"
                        class="flex py-2 px-4 m-auto rounded bg-gray-800 border-white text-white border hover:text-yellow-500 hover:border-yellow-500">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      <span class="flex pl-3">Add allocation</span>
                    </button>
                </div>
              </div>
              <div v-if="showSetAllocationButton" class="block mt-5">
                <div class="block mt-10">
                  <button v-on:click="setAllocations" class="flex py-2 px-4 m-auto rounded bg-yellow-500 hover:bg-yellow-600">
                    <span class="flex pl-3 text-white">Set Allocations</span>
                  </button>
                </div>
              </div>
              <div v-if="showResetAllocationsButton" class="block mt-5">
                <div class="block mt-10">
                  <button v-on:click="resetAllocations" class="flex py-2 px-4 m-auto rounded text-white border border-white hover:text-yellow-500 hover:border-yellow-500">
                    <span class="flex pl-3 text-white">Reset allocations</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
          <div v-if="setAllocationsPressed">
            <Chart class="pl-10" style="height: 300px;" :chartData="chartData" :options="options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "@/components/views/dashboard/presale/charts/Presale.Chart";

export default {
  name: 'presale.Tokenomics.components',
  props: {
    tokenomics: Array,
    liquidity: Object,
    remainingAmount: Number,
    setAllocationsPressed: Boolean,
    chartData: Object,
    options: Object,
    totalTokens: Number,
  },
  components: {
    Chart,
  },
  data: () => ({
    totalPercentage: 0,
    remainingTokens: 0,
    showRemainingTokens: false,
    showSetAllocationButton: true,
    showResetAllocationsButton: false,
    allocations: [
      {
        name: '',
        amount: null,
        remainingAmount: null,
        timelocked: false,
        releaseDate: null,
        interval: false,
        intervalStartDate: null,
        intervalPercentage: null,
        intervalInDays: null,
        exists: true,
      }
    ],
    backgroundColors: [
      '#db7d02',
      '#f78c00',
      '#f49d2c',
      '#f2a541',
      '#f9af4d',
      '#f9b761',
    ],
    error: {
      tokenAddress: '',
      tokenName: '',
      companyName: ''
    },
    showSetButton: true,
  }),
  methods: {
    addAllocation: function() {
      const emptyAllocation = {
        name: '',
        amount: null,
        remainingAmount: null,
        timelocked: false,
        releaseDate: null,
        interval: false,
        intervalStartDate: null,
        intervalPercentage: null,
        intervalInDays: null,
        exists: true,
        percentage: 0,
      }
      this.allocations.push(emptyAllocation);
    },
    setAllocations: function() {
      this.showSetAllocationButton = false;
      this.showResetAllocationsButton = true;
      this.showSetButton = false;
      this.$emit('setAllocations', this.allocations);
    },
    resetAllocations: function() {
      this.showSetAllocationButton = true;
      this.showResetAllocationsButton = false;
      this.allocations = [
        {
          name: '',
          amount: null,
          remainingAmount: null,
          timelocked: false,
          releaseDate: null,
          interval: false,
          intervalStartDate: null,
          intervalPercentage: null,
          intervalInDays: null,
          exists: true,
          percentage: 0,
        }
      ];
      this.$emit('setAllocations', this.allocations);
    }
  },
  watch: {
    allocations: {
      handler() {
        let counter = 0;
        let percentageBar = 0;
        let spendTokens = 0;
        let percentage = 0;
        this.totalPercentage = 0;
        this.allocations.forEach(allocation => {
          if (allocation.name !== '' && allocation.amount !== null) {
            percentageBar = allocation.amount / this.remainingAmount * 100;
            spendTokens = this.remainingAmount / 100 * percentageBar;

            if (counter === 0) {
              this.remainingTokens = this.remainingAmount - Math.round(spendTokens);
            }
            else
              this.remainingTokens = this.remainingTokens - Math.round(spendTokens);

            if (this.remainingTokens < 0) {
              allocation.amount = null;
              this.remainingTokens = this.remainingAmount;
              allocation.style = `width: ${0}%; background-color: ${this.backgroundColors[counter]}`;
              return;
            }

            // percentage of remaining tokens
            percentage = allocation.amount / this.remainingAmount * 100;

            // percentage of total tokens
            allocation.percentage = allocation.amount / this.totalTokens * 100;

            if (this.totalPercentage <= 100) {
              allocation.style = `width: ${percentageBar}%; background-color: ${this.backgroundColors[counter]}`;
              this.totalPercentage += percentage;
            }

            counter++;
          }
        });

        this.totalPercentage = Math.round(this.totalPercentage);
        this.showRemainingTokens = this.totalPercentage === 100;
      },
      deep: true
    }
  }
}
</script>
<style>
.form-checkbox {
/*background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");*/
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  flex-shrink: 0;
  height: 1em;
  width: 1em;
  /*color: #4299e1;*/
  /*background-color: #fff;*/
  border-color: #e2e8f0;
  border-width: 1px;
  border-radius: 0.25rem;
}
</style>