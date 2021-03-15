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
            <div class="my-8 text-center">
              <PresaleInformation
                :account="account"
                :token="token"
              />
            </div>
            <hr>

            <div class="my-8 text-center">
              <Liquidity
                  :liquidity="liquidity"
              />
            </div>
            <hr>

            <div class="my-8 text-center">
              <Tokenomics
                  :tokenomics="tokenomics"
                  :liquidity="liquidity"
                  :chartData="chartData"
                  :options="chartDataOptions"
              />
            </div>
            <hr>

            <div class="my-8 text-center">
              <Socials
                  :socials="socials"
                  @addSocials="addSocials"
                  @deleteSocial="deleteSocial"
              />
            </div>
            <hr>
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
import PresaleInformation from '@/components/presale/Information'
import Liquidity from '@/components/presale/Liquidity'
import Tokenomics from '@/components/presale/Tokenomics'
import Socials from '@/components/presale/Socials'

export default {
  name: 'presale.cp.views',
  components: {
    Search,
    Profile,
    AlertModal,
    Header,
    PageTitle,
    PresaleInformation,
    Liquidity,
    Tokenomics,
    Socials,
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
    token: {
      address: '',
      name: '',
      softcap: null,
      hardcap: null,
      startDate: new Date(),
      endDate: new Date(),
    },
    liquidity: {
      amount: null,
      precentage: null,
      locked: false,
      permaBurn: false,
      timeLocked: false,
      interval: false,
      intervalStartDate: null,
      releaseDate: null,
      intervalInDays: null,
    },
    tokenomics: [],
    socials: [
      {
        type: 0,
        url: ''
      },
    ],
    chartData: {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#db7d02',
            '#f78c00',
            '#f49d2c',
            '#f2a541',
            '#f9af4d',
            '#f9b761',
          ],
        }
      ]
    },
    chartDataOptions: {
      responsive: true,
      legend: {
        display: false,
        position: 'left',
      },
      maintainAspectRatio: false
    },
    info: {
      softcap: null,
      hardcap: null,
      totalSupply: null,
      tokenPrice: null
    },
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

    for (let index = 0; index < 4; index++) {
      this.chartData.datasets[0].data.push(Number(25));
    }
  },
  methods: {
    // addAllocation: function () {
    //   const allocation = {
    //     name: '',
    //     amount: null,
    //     percentage: 0,
    //   }
    //   this.allocations.push(allocation);
    // },
    addSocials: function() {
      this.socials.push({type: 4, url:''});
    },
    deleteSocial: function(key) {
      if (this.socials.length > 1)
        this.socials.splice(key, 1);
    },
    createPresale: function () {
      // const tokens = [];
      // const socials = [];
      const presale = {
        // tokenName:,
        // tokenAddress:,
        // companyName:,
        // description:,
        // softcap:,
        // hardcap:,
        // liquidityLocked:,
        // totalSupply:,
        // tokensLocked:,
        // tokenPrice:,
        // tokenomics: JSON.stringify(tokens),
        // socials: JSON.stringify(socials),
        // startDate:,
        // endDate: ,
      }

      axios.post(`${process.env.VUE_APP_SERVICE}/${process.env.VUE_APP_CREATE_PRESALE}`, presale, {
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${process.env.VUE_APP_BEARER}`
        },
      }).then((response) => {
        console.log(response)
      }).catch((e) => {
        console.log(e);
      });
    }
  },
  watch: {
    // progression: {
    //   handler: function () {
    //     if (this.progression === 100) {
    //       this.showAddAllocationButton = false;
    //     } else if (this.progression < 100) {
    //       this.showAddAllocationButton = true;
    //     } else if (this.progression > 100) {
    //       this.showAddAllocationButton = false;
    //       // TODO Presale is not valid.
    //     }
    //   }
    // },
    // preSaleTotal: {
    //   handler: function (value) {
    //     if (this.totalSupply <= 0) return;
    //
    //     this.preSalePercentage = (100 * value) / this.totalSupply;
    //
    //     this.progression = this.preSalePercentage + this.liquidityPercentage;
    //   },
    // },
    // liquidityTotal: {
    //   handler: function (value) {
    //     if (this.totalSupply <= 0) return;
    //
    //     this.liquidityPercentage = (100 * value) / this.totalSupply;
    //
    //     this.progression = this.preSalePercentage + this.liquidityPercentage;
    //   },
    // },
    // allocations: {
    //   handler: function () {
    //     if (this.totalSupply <= 0) return;
    //
    //     let allocationsPercentage = 0;
    //     for (let i = 0; i < this.allocations.length; i++) {
    //       allocationsPercentage += (100 * this.allocations[i].amount) / this.totalSupply;
    //       this.allocations[i].percentage = (100 * this.allocations[i].amount) / this.totalSupply;
    //     }
    //
    //     this.allocationsPercentage = allocationsPercentage;
    //   },
    //   deep: true
    // },
    // allocationsPercentage: {
    //   handler: function () {
    //     this.progression = this.preSalePercentage + this.liquidityPercentage + this.allocationsPercentage;
    //   }
    // },
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
