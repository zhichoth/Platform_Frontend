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
                <span class="block text-2xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                  {{ presale.Name }}
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
                  {{ presale.StartDate }}
                </span>
              </h1>
            </div>
            <div class="col-span-3">
              <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
                {{ presale.name }} token address: {{ presale.Addresses[0] }}
              </span>
            </div>
          </div>
        </div>

        <div class="block px-4 mt-6 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="block text-1xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">TEAM Information</span>
              <div class="block">
                <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Socials</span>
                <div class="grid  mt-3">
                  <div class="flex">
                    <svg class="h-5 w-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="m.415 11.196 5.869 2.925c.227.112.495.104.712-.023l5.224-3.037-3.162 2.802c-.161.143-.253.347-.253.562v6.825c0 .72.919 1.023 1.35.451l2.537-3.373 6.274 3.573c.44.253 1.004-.001 1.106-.504l3.913-19.5c.117-.586-.466-1.064-1.008-.846l-22.5 8.775c-.604.236-.643 1.081-.062 1.37zm21.83-8.249-3.439 17.137-5.945-3.386c-.324-.185-.741-.103-.971.201l-1.585 2.107v-4.244l8.551-7.576c.677-.599-.101-1.664-.874-1.21l-11.39 6.622-3.992-1.989z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Telegram: </span>
                    <a href="#" class="text-blue-500">t.me/teamlink</a>
                  </div>
                </div>
                <div class="grid mt-3">
                  <div class="flex">
                    <svg class="h-5 w-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Twitter: </span>
                    <a href="#" class="text-blue-500">t.me/teamlink</a>
                  </div>
                </div>
                <div class="grid mt-3">
                  <div class="flex">
                    <svg class="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Website: </span>
                    <a href="#" class="text-blue-500">t.me/teamlink</a>
                  </div>
                </div>
              </div>
              <div class="block mt-8">
                <div class="grid">
                  <div>
                    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Coin information</span>
                    <div class="grid gap-1 mt-3">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Liquiditiy locked:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokenLiqAmount }}%</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Tokens locked:</span>
                        <a href="#" class="text-blue-500">125,000.0000 {{ presale.name }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Token price:</span>
                        <a href="#" class="text-blue-500">$0.02</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Total tokens:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokenPresaleAllocation }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block mt-8">
                <div class="grid">
                  <div>
                    <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Presale information</span>
                    <div class="grid gap-1 mt-3">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Hardcap:</span>
                        <a href="#" class="text-blue-500">{{ presale.Hardcap }}</a>
                        <span class="text-yellow-500 pl-2">ETH</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Softcap:</span>
                        <a href="#" class="text-blue-500">{{ presale.Softcap }}</a>
                        <span class="text-yellow-500 pl-2">ETH</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Total deposited currently:</span>
                        <a href="#" class="text-blue-500">1250.000</a>
                        <span class="text-yellow-500 pl-2">ETH</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Your current investment:</span>
                        <a href="#" class="text-blue-500">0.1250</a>
                        <span class="text-yellow-500 pl-2">ETH</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Estimated return:</span>
                        <a href="#" class="text-blue-500">375.000</a>
                        <span class="text-yellow-500 pl-2">{{ presale.Name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <span class="block text-1xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-1xl">Token allocation</span>
                  <div v-for="(token, key) in tokenAllocations" :key="key">
                    <div class="grid grid-cols-1 gap-1 mt-3">
                      <div class="flex">
                        <span class="text-yellow-600 w-1/5">{{ token.liquidity }}%</span>
                        <span class="text-gray-900 dark:text-white">{{ token.title  }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <Chart class="pl-5" style="height: 300px;" :chartData="chartData" :options="options" />
                </div>
              </div>
            </div>
          </div>
          <div class="block mt-8">
            <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Presale information</span>
            <div class="grid grid-cols-4 gap-5 mt-3">
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-5 mt-5">
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
              <div class="col-span-1">
                <span class="text-gray-900 dark:text-white pr-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A deleniti:</span>
                <a href="#" class="text-blue-500">0x00000</a>
                <span class="block text-gray-400">Receives 10% every month for a total of 10 months</span>
              </div>
            </div>
          </div>
          <div class="block text-center mt-10">
            <button class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
              Deposit
            </button>
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
import Web3 from "web3";

export default {
  name: "presale.detail.cp.views",
  components: {
    AlertModal,
    Header,
    PageTitle,
    Chart
  },
  data() {
    return {
      id: this.$route.params.id,
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
      presalesChart: [],
      tokenAllocations: [],
      alert: {
        title: '',
        msg: ''
      },
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
    }
  },
  beforeMount: async function() {
    if (this.$store.getters.account !== '') {
      this.account = this.$store.getters.account;
      this.chainId = this.provider.chainId;
      this.isConnected = true;
    }
  },
  mounted: async function () {
    // TODO Local data remove later
    // this.presale = this.$store.getters.presale;
    // this.title = `Presale ${this.presale.name}`;

    await this.getPresaleData();
    await this.getPresalesTokens();
    await this.getPresalesGraph();
    this.isLoaded = true;
  },
  methods: {
    getPresaleData: async function () {
      const response = await axios.get(process.env.VUE_APP_PRESALE_CONTRACT_URL);

      if (response.status !== 200)
        return this.showError(response);

      const presaleContractAbi = response.data.abi;
      const web3 = new Web3(this.provider); // TODO Remove later "http://127.0.0.1:7545"

      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;

      this.presale = await presaleContractInterface.methods.Presales(this.id).call();

      console.log(this.presale);
    },
    getPresalesTokens: async function () {
      const response = await axios.get(`/assets/data/token-allocation.json`);
      if (response.status !== 200)
        return this.showError(response.config.url, response.status);

      this.tokenAllocations = response.data;
    },
    getPresalesGraph: async function () {
      const response = await axios.get(`/assets/data/chart.json`);
      if (response.status !== 200)
        return this.showError(response.config.url, response.status);

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
    showError: function (
        title,
        msg,
        showConnectButton = false,
        showDownloadButton = false) {
      this.showAlert = !this.showAlert;
      this.alert.title = title
      this.alert.msg = msg;
      this.showConnectionButton = showConnectButton;
      this.showDownloadButton = showDownloadButton;
    }
  }
}
</script>
