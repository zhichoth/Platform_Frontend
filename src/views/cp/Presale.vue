<template>
    <div id="presale" class="h-full">
      <!-- Search header -->
      <div class="z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
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
            <div v-if="preSaleProgress === 1" class="mt-8 text-center">
              <TokenAddress
                :account="account"
                @nextStep="nextStep"/>
            </div>

            <div v-if="preSaleProgress === 1" class="mt-8 text-center">
              <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                Tokenomics
              </h1>
              <h3 class="text-4xl font-light text-gray-700 dark:text-gray-200">
                Enter your tokenomics
              </h3>
              <h3 v-if="totalSupply > 0" class="text-2xl pt-6 font-light text-yellow-500">
                Total supply: {{ totalSupply }}
              </h3>
              <div class="h-3 mx-auto mt-4 relative max-w-xl rounded-full overflow-hidden">
                <div class="w-full h-full bg-gray-200 absolute"></div>
                <div class="h-full bg-yellow-500 absolute" :style="`width: ${progression}%`"></div>
              </div>
              <div class="mt-10">
                <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg  border border-gray-200">
                  <div class="grid grid-cols-1 gap-6">
                    <div class="col-span-1">
                      <label :for="totalSupply" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Total supply
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="number" v-model="totalSupply" placeholder="Total supply" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                  </div>
                  <div v-if="totalSupply > 0" class="grid grid-cols-3 gap-6">
                    <div class="col-span-2">
                      <label :for="preSaleTotal" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Presale allocation
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="number" v-model="preSaleTotal" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label :for="preSalePercentage" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Presale allocation in %
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="text" v-model="preSalePercentage" readonly class="w-full mt-2 mb-6 px-3 py-1 border border-yellow-500 rounded-lg text-yellow-500 bg-gray-200 dark:bg-gray-700">
                      </div>
                    </div>
                  </div>
                  <div v-if="totalSupply > 0" class="grid grid-cols-3 gap-6">
                    <div class="col-span-2">
                      <label :for="liquidityTotal" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Liquidity allocation
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="number" v-model="liquidityTotal" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label :for="liquidityPercentage" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Liquidity allocation in %
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="text" v-model="liquidityPercentage" readonly class="w-full mt-2 mb-6 px-3 py-1 border border-yellow-500 rounded-lg text-yellow-500 bg-gray-200 dark:bg-gray-700">
                      </div>
                    </div>
                  </div>
                  <div
                    v-for="(allocation, key) in allocations"
                    :key="key"
                    class="grid grid-cols-3 gap-6">
                    <div class="col-span-1">
                      <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Name allocation
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="text" v-model="allocation.name" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Amount
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="number" v-model="allocation.amount" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Allocation in %
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="text" v-model="allocation.percentage" readonly class="w-full mt-2 mb-6 px-3 py-1 border border-yellow-500 rounded-lg text-yellow-500 bg-gray-200 dark:bg-gray-700">
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                    totalSupply > 0 &&
                    preSaleTotal > 0 &&
                    liquidityTotal > 0"
                      class="grid grid-cols-1 gap-6">
                    <div class="col-span-1 text-center">
                      <button
                       v-on:click="addAllocation"
                       v-if="showAddAllocationButton"
                       type="button"
                       class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        Add Allocation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="block px-4 mt-6 sm:px-6 lg:px-8">
            <div v-if="preSaleProgress === 1" class="mt-10 text-center">
              <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                Unsold tokens
              </h1>
              <h3 class="text-4xl font-light text-gray-700 dark:text-gray-200">
                Make a choice
              </h3>
              <div class="mt-5">
                <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg  border border-gray-200">
                  <div class="grid grid-cols-2 gap-6">
                    <div class="col-span-1 text-center">
                      <button type="button" v-on:click="setBurnTokens" v-if="!burnTokens" class="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-white bg-gray-700 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Burn remaining tokens
                      </button>
                      <button type="button" v-on:click="setBurnTokens" v-else class="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Burn remaining tokens
                      </button>
                    </div>
                    <div class="col-span-1 text-center">
                      <button type="button" v-on:click="setDivideTokens" v-if="!divideTokens" class="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-white bg-gray-700 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Divide remaining tokens
                      </button>
                      <button type="button" v-on:click="setDivideTokens" v-else class="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Divide remaining tokens
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="block px-4 mt-6 sm:px-6 lg:px-8">
            <div v-if="preSaleProgress === 1" class="mt-10 text-center">
              <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                ETH Hard & Softcap
              </h1>
              <h3 class="text-4xl font-light text-gray-700 dark:text-gray-200">
                Price per token
              </h3>
              <div class="mt-5">
                <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg  border border-gray-200">
                  <div class="grid grid-cols-1 gap-6">
                    <div class="col-span-1">
                      <label :for="totalSupply" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        ETH supply
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="number" v-model="totalSupply" readonly placeholder="1000" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-2">
                      <label :for="tokenPriceETH" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Token price in ETH
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="number" v-model="tokenPriceETH" class="w-full mt-2 mb-6 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300 focus:text-yellow-500 focus:outline-none focus:border-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label :for="tokenPriceDollar" class="block text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                        Token price in $
                      </label>
                      <div class="mt-1 flex rounded-md">
                        <input type="text" v-model="tokenPriceDollar" readonly class="w-full mt-2 mb-6 px-3 py-1 border border-yellow-500 rounded-lg text-yellow-500 bg-gray-100 dark:bg-gray-700">
                      </div>
                    </div>
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
import axios from 'axios'

import Search from '@/components/search/Form.search'
import Profile from '@/components/Profile'
import AlertModal from '@/components/modals/Alert.modals'
import Header from '@/components/Header'
import PageTitle from '@/components/PageTitle'
import TokenAddress from '@/components/presale/TokenAddress'

export default {
  name: 'presale.views',
  components: {
    Search,
    Profile,
    AlertModal,
    Header,
    PageTitle,
    TokenAddress
  },
  data: () => ({
    contractAddress: process.env.VUE_APP_CONTRACT_ADDRESS,
    isConnected: false,
    showAlert: false,
    isLoaded: false,
    title: 'Presale',
    account: '',
    provider: window.ethereum,
    chainId: null,
    preSaleProgress: 1,
    progression: 0,
    tokenAddress: null,
    totalSupply: null,
    preSaleTotal: null,
    preSalePercentage: 0,
    liquidityTotal: null,
    liquidityPercentage: 0,
    allocations: [],
    allocationsPercentage: null,
    showAddAllocationButton: true,
    divideTokens: false,
    burnTokens: false,
    ETHSupply: 0,
    tokenPriceETH: 0,
    tokenPriceDollar: 0,
    alert: {
      title: '',
      msg: ''
    },
  }),
  beforeMount: async function() {
    if (this.$store.getters.account !== '') {
      this.account = this.$store.getters.account;
      this.chainId = this.provider.chainId;
      this.isConnected = true;
    }
  },
  mounted: function () {
    this.isLoaded = true;
  },
  methods: {
    addAllocation: function () {
      const allocation = {
        name: '',
        amount: null,
        percentage: 0,
      }
      this.allocations.push(allocation);
    },
    // Emit from TokenAddress Component
    nextStep: function (tokenAddress, currentStep) {
      this.tokenAddress = tokenAddress;
    },
    setBurnTokens: function () {
      this.burnTokens = !this.burnTokens;
      this.divideTokens = false;
    },
    setDivideTokens: function () {
      this.divideTokens = !this.divideTokens;
      this.burnTokens = false;
    }
  },
  watch: {
    progression: {
      handler: function () {
        if (this.progression === 100) {
          this.showAddAllocationButton = false;
        } else if (this.progression < 100) {
          this.showAddAllocationButton = true;
        } else if (this.progression > 100) {
          this.showAddAllocationButton = false;
          // TODO Presale is not valid.
        }
      }
    },
    preSaleTotal: {
      handler: function (value) {
        if (this.totalSupply <= 0) return;

        this.preSalePercentage = (100 * value) / this.totalSupply;

        this.progression = this.preSalePercentage + this.liquidityPercentage;
      },
    },
    liquidityTotal: {
      handler: function (value) {
        if (this.totalSupply <= 0) return;

        this.liquidityPercentage = (100 * value) / this.totalSupply;

        this.progression = this.preSalePercentage + this.liquidityPercentage;
      },
    },
    allocations: {
      handler: function () {
        if (this.totalSupply <= 0) return;

        let allocationsPercentage = 0;
        for (let i = 0; i < this.allocations.length; i++) {
          allocationsPercentage += (100 * this.allocations[i].amount) / this.totalSupply;
          this.allocations[i].percentage = (100 * this.allocations[i].amount) / this.totalSupply;
        }

        this.allocationsPercentage = allocationsPercentage;
      },
      deep: true
    },
    allocationsPercentage: {
      handler: function () {
        this.progression = this.preSalePercentage + this.liquidityPercentage + this.allocationsPercentage;
      }
    },
    tokenPriceETH: {
      handler: async function () {
        if (this.tokenPriceETH > 0) {
          await axios.get(process.env.VUE_APP_KRAKEN_API).then(response => {
            this.tokenPriceDollar = (this.tokenPriceETH * Number(response.data.result.XETHZUSD.c[0]));
          });
        }
      }
    }
  }
};
</script>
