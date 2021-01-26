<template>
  <div id="dashboard" class="h-full">
    <!-- Search header -->
    <div v-if="isLoaded" class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
      <!-- Sidebar toggle, controls the 'sidebarOpen' sidebar state. -->
      <button class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden">
        <span class="sr-only">Open sidebar</span>
        <!-- Heroicon name: menu-alt-1 -->
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>
      <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex-1 flex">
          <Search />
        </div>
        <div class="flex items-center">
          <Profile />
        </div>
      </div>
    </div>
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
        
        <PreSales 
            :presales="presalesChart"
            :chartData="chartData"
            :options="options" />

        <PreSalesTable 
            :presales="presaleTable" />

<!--        <CreatePreSaleModal-->
<!--            v-if="showCreatePresaleModal" />-->
      </main>
    </transition>
    <Cookie v-if="showCookie" />
  </div>
</template>

<script>
import axios from 'axios'

// import metaMaskProvider from 'metamask-extension-provider'

import Search from '@/components/search/Form.search'
import Profile from '@/components/Profile'
import AlertModal from '@/components/modals/Alert.modals'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'
import PreSales from '@/components/views/dashboard/presale/Presale.Dashboard'
import PreSalesTable from '@/components/views/dashboard/presale/tables/Presale.Table'
// import CreatePreSaleModal from '@/components/modals/Presale.modals'

export default {
  name: 'dashboard.cp.views',
  components: {
    Search,
    Profile,
    AlertModal,
    Header,
    PageTitle,
    PreSales,
    PreSalesTable,
    // CreatePreSaleModal,
  },
  data: () => ({
    contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
    isConnected: false,
    showAlert: false,
    isLoaded: false,
    title: 'Dashboard',
    account: '',
    provider: window.ethereum,
    chainId: null,
    presalesChart: [], // empty array
    presaleTable: [], // empty array
    showConnectionButton: false,
    showDownloadButton: false,
    showCreatePresaleModal: true,
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
  }),
  beforeMount: async function () {
    // Get Presales
    await this.getPresalesGraph();
    await this.getPresalesTable();
  },
  mounted: async function () {
    // IsBusy
    this.$emit('toggleIsBusy', true);
    // Detect provider
    await this.detectProvider();
    // Connect to your account
    await this.currentAccount();
    this.isLoaded = true;
    // IsBusy
    this.$emit('toggleIsBusy', false);
  },
  methods: {
    detectProvider: async function () {
      // Great change MetaMask is not installed
      if (this.provider === undefined) {
        return this.showError(
          'MetaMask is not installed.', 
          'It looks like the connection to the MetaMask wallet failed. Try connecting again.',
          false,
          true);
      }

      if (!this.provider.isMetaMask)
        return this.showError(
          'MetaMask connection failed.', 
          'It looks like the connection to the MetaMask wallet failed. Try connecting again.');
    },
    currentAccount: async function () {
      // connect to MetaMask account
      this.chainId = this.provider.chainId;
      this.provider
        .request({ method: 'eth_accounts' })
        .then(this.handleAccountsChanged(this.provider._state.accounts))
        .catch((err) => {
          // Some unexpected error.
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
          this.showError(
            'Unexpected error',
            err);
        });
    },
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
    getPresalesTable: async function () {
      const response = await axios.get(`/assets/data/table.json`);
      
      if (response.status !== 200)
        return this.showError(response);

      this.presaleTable = response.data;
    },
    handleAccountsChanged: function (accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.isConnected = false;
        this.showError(
          'No connections made',
          'Click the connect button to connect your MetaMask account',
          true);
      } else {
        this.$store.state.account = accounts[0];
        this.account = accounts[0];
        // show user that MetaMask is connected
        this.isConnected = true;
      }
    },
    connectAccount: function () {
      this.provider
        .request({ method: 'eth_requestAccounts' })
        .then(this.handleAccountsChanged(this.provider._state.accounts))
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            this.showError('Please connect to MetaMask.', err.message);
          } else {
            this.showError('Something went wrong', err.message);
          }
        });
    },
    closeModal: function () { 
      this.showAlert = !this.showAlert;
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
  },
  watch: {
    provider: {
      handler: function () {
        if (
          this.$store.getters.account === '' &&
          this.provider._state.accounts.length > 0) {
            this.$store.state.account = this.provider._state.accounts[0];
            this.handleAccountsChanged(this.provider._state.accounts);
          } else if (
            this.$store.getters.account !== '' &&
            this.provider._state.accounts.length === 0) {
              this.$store.state.account = '';
              this.handleAccountsChanged(this.provider._state.accounts);
          }
      },
      deep: true
    }
  }
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>