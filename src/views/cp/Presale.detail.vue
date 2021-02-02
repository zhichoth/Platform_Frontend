<template>
  <div id="presale" class="h-full">
    <transition name="slide-fade">
      <main v-if="isLoaded" class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
        <Header
            :contractAddress="contractAddress"
            :isConnected="isConnected"
            :account="account"
            :chainId="chainId" />

        <AlertModal
            v-if="showAlert"
            :alert="alert"
            :showConnectionButton="showConnectionButton"
            :showDownloadButton="showDownloadButton"
            @connectAccount="connectAccount"
            @closeModal="closeModal" />

        <PageTitle
            :title="title" />

        <div class="block px-4 mt-6 sm:px-6 lg:px-8">
          <div class="grid grid-cols-4 gap-4">
            <div>
              <h1>
                <span class="block text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-2xl">{{ presale.subname }}</span>
                <span class="block text-base text-white font-semibold tracking-wide uppercase">{{ presale.name }}</span>
              </h1>
            </div>
            <div class="col-span-3">
              <span class="block text-base text-white font-semibold tracking-wide uppercase">{{ presale.name }} token address: 0x</span>
            </div>
          </div>
        </div>

        <div class="block px-4 mt-6 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 gap-4">
            <div>
              TEAM Information
            </div>
            <div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  TOKEN allocation
                </div>
                <div class="col-span-2">
                  <Chart class="pl-5" style="height: 300px;" :chartData="chartData" :options="options" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </transition>
  </div>
</template>

<script>
import AlertModal from '@/components/modals/Alert.modals'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'

import Chart from '@/components/views/dashboard/presale/charts/Presale.Chart'
import axios from "axios";

export default {
  name: "presale.detail.cp.views",
  components: {
    AlertModal,
    Header,
    PageTitle,
    Chart
  },
  data: () => ({
    presale: {},
    contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
    isConnected: false,
    showAlert: false,
    isLoaded: false,
    title: 'Presale',
    account: '',
    provider: window.ethereum,
    chainId: null,
    showAddAllocationButton: true,

    chartData: {
      labels: [
        'Uniswap Liquidity',
        'Marketing',
        'Team',
        'Farming',
        'PreSale'],
      datasets: [
        {
          label: 'Label',
          backgroundColor: [
            '#db7d02',
            '#f78c00',
            '#f49d2c',
            '#f2a541',
            '#f9af4d',
            '#f9b761'],
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false,
        position: 'left',
      },
      maintainAspectRatio: false
    },
  }),
  beforeMount: async function() {
    if (this.$store.getters.account !== '') {
      this.account = this.$store.getters.account;
      this.chainId = this.provider.chainId;
      this.isConnected = true;

      await this.getPresalesGraph();
    }
  },
  mounted: function () {
    this.presale = this.$store.getters.presale;
    this.title = `Presale ${this.presale.name}`;
    this.isLoaded = true;
  },
  methods: {
    getPresalesGraph: async function () {
      const response = await axios.get(`/assets/data/chart.json`);

      if (response.status !== 200)
        return this.showError(response);

      const preSales = response.data;
      this.presalesChart = preSales;

      if (preSales && preSales.length > 0) {
        for (let index = 0; index < preSales.length; index++) {
          this.chartData.datasets[0].data.push(preSales[index].uniswap);
          this.chartData.datasets[0].data.push(preSales[index].marketing);
          this.chartData.datasets[0].data.push(preSales[index].team);
          this.chartData.datasets[0].data.push(preSales[index].farming);
          this.chartData.datasets[0].data.push(preSales[index].presale);
        }
      }
    },
  }
}
</script>
