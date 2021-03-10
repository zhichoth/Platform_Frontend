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
              <div class="overflow-hidden h-5 text-center text-xs flex rounded bg-gray-400">
                <div v-for="(allocation, key) in allocations" :key="key" :style="allocation.style" class="h-5 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
              </div>
              <span class="block text-white w-full mt-2">
                {{totalPercentage}}%
              </span>
            </div>

            <div class="block mt-8">
              <div v-for="(allocation, key) in allocations" class="block" :key="key">
                <div class="grid grid-cols-5 gap-4">
                  <div class="col-span-2 text-left">
                    <label :for="allocation.name" class="text-white">Allocation</label>
                    <input type="text" v-model="allocation.name" placeholder="Name" class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                  </div>
                  <div class="text-left">
                    <label :for="allocation.amount" class="text-white">Amount</label>
                    <input type="number" v-model="allocation.amount" min="0" placeholder="Amount" class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
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
                           class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700"
                           v-model="allocation.releaseDate">
                  </label>
                </div>
                <div class="block w-full" v-if="allocation.interval">
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                        <label
                            :for="allocation.intervalStartDate"
                            class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                          Start date
                        </label>
                        <input type="date"
                               class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700"
                               v-model="allocation.intervalStartDate">
                    </div>
                    <div class="col-span-1">
                      <label
                          :for="allocation.intervalInDays"
                          class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Interval
                      </label>
                      <input type="number"
                             placeholder="Interval in days"
                             class="w-full mt-2 mb-2 px-3 py-1 border rounded-lg text-gray-600 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700"
                             v-model="allocation.intervalInDays">
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="totalPercentage < 100" class="block mt-5">
                <div>
                    <button v-on:click="addAllocation" class="flex py-2 px-4 m-auto rounded bg-yellow-500 hover:bg-yellow-600">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                      <span class="flex pl-3 text-white">Add allocation</span>
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div>
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
  name: 'presale.Socials.components',
  props: {
    account: String,
    socials: Array,
    tokenomics: Array,
    chartData: Object,
    options: Object,
  },
  components: {
    Chart,
  },
  data: () => ({
    totalPercentage: 0,
    allocations: [
      {
        amount: null,
        name: '',
        timelocked: false,
        style: 0,
        releaseDate: null,
        interval: false,
        intervalStartDate: null,
        intervalInDays: null,
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
    }
  }),
  methods: {
    addSocials: function() {
      this.$emit('addSocials');
    },
    deleteSocial: function(key) {
      this.$emit('deleteSocial', key);
    },
    addAllocation: function() {
      const allocation = {
        amount: null,
        name: '',
        timelocked: false,
        permanent: false,
        releaseData: null,
        intervalStartDate: null,
        intervalInDays: null,
      }
      this.allocations.push(allocation);
    },
  },
  watch: {
    tokenAddress: {
      handler() {
        if (this.token.address === this.account) {
          this.error.tokenAddress = '';
          this.isValid = !this.isValid;
        } else {
          this.error.tokenAddress = 'Token address does not match your connected META MASK wallet.';
          this.isValid = !this.isValid;
        }
      },
      deep: true
    },
    allocations: {
      handler() {
        // let counter = 0;
        // this.allocations.forEach(allocation => {
        //   console.log(this.totalPercentage);
        //   if (this.totalPercentage !== 100 && this.totalPercentage < 100 && (this.totalPercentage + Number(allocation.amount) <= 100)) {
        //     this.totalPercentage += Number(allocation.amount);
        //
        //     allocation.style = `width: ${allocation.amount}%; background-color: ${this.backgroundColors[counter]}`;
        //     counter++;
        //
        //     // Add allocation
        //   }
        //   this.totalPercentage = 0;
        // });
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