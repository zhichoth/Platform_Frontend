<template>
  <div id="yield" class="h-full h-screen">
    <!-- Search header -->
    <div class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
      <!-- Sidebar toggle, controls the 'sidebarOpen' sidebar state. -->
      <button class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden">
        <span class="sr-only">Open sidebar</span>
        <!-- Heroicon name: menu-alt-1 -->
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
      <main v-if="loaded" class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
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

        <YieldPool 
          :chartData="chartData" 
          :options="options" />
      </main>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'

import Search from '@/components/search/Form'
import Profile from '@/components/Profile'
import AlertModal from '@/components/alerts/Modal'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'
import YieldPool from '@/components/views/yield/YieldPool.Yield'

export default {
  name: 'yield.views',
  components: {
    Search,
    Profile,
    AlertModal,
    Header,
    PageTitle,
    YieldPool
  },
  data: () => ({
    contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
    isConnected: false,
    showAlert: false,
    alert: {
      title: '',
      msg: ''
    },
    showConnectionButton: false,
    showDownloadButton: false,
    title: 'Yield Dasboard',
    loaded: false,
    provider: window.ethereum,
    chainId: null,
    account: '',
    chartData: {
        labels: ['','','','','','','','','','','',''],
        datasets: [
          {
            color: ['#db7d02'],
            backgroundColor: ['rgba(245, 158, 11,0.5'],
            data: [25, 35, 70, 90, 115, 200, 230, 350, 380, 460, 465, 470]
          }
        ],
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          display: false,

          scaleLabel: {
            display: false,
            labelString: 'probability'
          }
        }],
        xAxes: [{
          display: false,
          scaleLabel: {
            display: false,
            labelString: 'probability'
          }
        }],
      },
      legend: {
        display: false,
        position: 'left',
      },
      maintainAspectRatio: false
    },
  }),
  beforeMount: async function() {
    if (this.$store.getters.account != '') {
      this.account = this.$store.getters.account;
      this.chainId = this.provider.chainId;
      this.isConnected = true;
    }

    if (this.isConnected) {

      await this.getRandomData();
      await this.getContracts();
    }
  },
  mounted: async function () {
    if (this.account === '') {
      // Detect provider
      await this.detectProvider();
      // Connect to your account
      await this.currentAccount();
    }
    this.loaded = true;
  },
  methods: {
    detectProvider: async function () {
      if (!this.provider.isMetaMask)
        return this.showError(
          'MetaMask is not installed.', 
          'It looks like the connection to the MetaMask wallet failed. Try connecting again.');
    },
    currentAccount: async function () {
      // connect to MetaMask account
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
    getContracts: async function () {
      const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${process.env.VUE_APP_CONTRACT_ADDRESS}&apikey=${process.env.VUE_APP_ETHERSCAN_API}`);
      console.log(response.data);
    },
    handleAccountsChanged: function (accounts) {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.isConnected = false;
        this.showError(
          'No connections made',
          'Click the connect button to connect your MetaMask account',
          true);
      } else if (accounts[0] !== this.account) {
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
    showError: function (title, msg, bool = false) {
      this.showAlert = !this.showAlert;
      this.alert.title = title
      this.alert.msg = msg;
      this.showConnectionButton = bool;
    }
  }
}
</script>

<style>

</style>