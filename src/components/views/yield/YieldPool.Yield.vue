:<template>
  <div id="yield">
    <div class="block px-4 mt-6 sm:px-6 lg:px-8">
      <div class="dark:bg-gray-800 p-3 py-10 rounded-lg">
        <Chart style="height: 200px; width: 100%;" :chartData="chartData" :options="options" />
      </div>
    </div>
    <div class="block px-4 mt-6 sm:px-6 lg:px-8">
      <div class="dark:bg-gray-800 p-3 py-10 rounded-lg">
        <Chart style="height: 200px; width: 100%;" :chartData="chartData" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/views/yield/charts/Pool.Chart'

export default {
  name: 'Yield.views.components',
  props: {
    chartData: Object,
    options: Object,
  },
  components: {
    Chart
  },
}
</script>

<style>

</style>