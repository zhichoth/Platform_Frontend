:<template>
  <div id="yield">
    <div class="block px-4 mt-6 sm:px-6 lg:px-8">
      <div class="dark:bg-gray-800 bg-gray-50 p-3 py-10 rounded-lg  border border-gray-200">
        <Chart style="height: 200px; width: 100%;" :chartData="chartData" :options="options" />
      </div>
    </div>
    <div class="block px-4 mt-3 sm:px-6 lg:px-8">
      <div class="dark:bg-gray-800 bg-gray-50 p-3 py-10 rounded-lg border border-gray-200">
        <Chart style="height: 200px; width: 100%;" :chartData="chartData" :options="options" />
      </div>
    </div>
    <div class="block px-4 mt-6 sm:px-6 lg:px-8">
      <ul class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3">
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ formatAmount(yieldPool.totalYsecStaked) }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Total $YSEC staked</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ formatAmount(yieldPool.accountYsecStaked) }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Your $YSEC staked</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ formatAmount(yieldPool.estReward) }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Est. rewards (in ETH)</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ formatAmount(yieldPool.ETHPool) }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">ETH in pool</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.preSales }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Presale(s) launched</span>
            </h1>
          </div>
        </li>
        <li>
          <div class="max-w-5xl mx-auto px-4 sm:px-4 lg:px-4 rounded-tl-lg rounded-tr-lg bg-gray-50 dark:bg-gray-800 text-center border border-gray-200 border-b-0">
              <h1 class="inline-block text-center py-10 text-2xl">
                <span class="block text-gray-800 dark:text-white font-semibold tracking-wide uppercase">{{ yieldPool.participants }}</span>
              </h1>
          </div>
          <div class="flex-root pt-2 pb-2 pl-6 rounded-bl-lg rounded-br-lg bg-yellow-500 text-center">
            <h1 class="inline-block">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">Participant(s)</span>
            </h1>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import Chart from '@/components/views/yield/charts/Pool.Chart'

export default {
  name: 'Yield.views.components',
  props: {
    yieldPool: Object,
    chartData: Object,
    options: Object,
  },
  components: {
    Chart
  },
  methods: {
    formatAmount: function (amount) {
      if (amount > 0) {
        const value = new BigNumber(amount);
        return value.shiftedBy(-18);
        // const formatAmount = parseInt(amount, 16).toString();
        // return formatAmount.substring(0, formatAmount.length-4);
      }
      return amount;
    },
  }
}
</script>

<style>

</style>