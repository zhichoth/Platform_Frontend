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
                :token="settings"
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
            <div class="my-8 text-center">
              <button v-on:click="createPresale" class="bg-yellow-500 py-2 px-4 rounded text-white hover:bg-yellow-600">
                Create Presale
              </button>
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
import PresaleInformation from '@/components/presale/Information'
import Liquidity from '@/components/presale/Liquidity'
import Tokenomics from '@/components/presale/Tokenomics'
import Socials from '@/components/presale/Socials'
import Web3 from "web3";

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
    settings: {
      address: '0x9C71795C559aaf3c423b8D743545741e2565c985',
      name: '',
      softcap: null,
      hardcap: null,
      tokenPresaleAllocation: null,
      startDate: new Date(),
      endDate: new Date(),
    },
    liquidity: {
      amount: null,
      precentage: null,
      locked: false,
      permaBurn: false,
      timeLocked: false,
      releaseDate: null,
      interval: false,
      intervalStartDate: null,
      intervalInDays: null,
      intervalPercentage: null,
    },
    tokenomics: [],
    socials: [
      {
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
    contractAbi: [{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"},{"internalType":"address","name":"yieldFeeAddress","type":"address"},{"internalType":"address","name":"feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Contributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthYieldFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedEth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"permaLockedLiq","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountOfEth","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokens","type":"uint256"}],"name":"UniswapLiquidityAdded","type":"event"},{"inputs":[],"name":"FeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PresaleIndexer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Presales","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Discord","type":"string"}],"internalType":"struct PresaleInfo","name":"Info","type":"tuple"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"components":[{"internalType":"address","name":"TokenOwnerAddress","type":"address"},{"internalType":"address","name":"TokenAddress","type":"address"},{"internalType":"address","name":"TokenTimeLock","type":"address"}],"internalType":"struct PresaleDataAddresses","name":"Addresses","type":"tuple"},{"components":[{"internalType":"uint256","name":"TotalTokenAmount","type":"uint256"},{"internalType":"uint256","name":"Step","type":"uint256"},{"internalType":"uint256","name":"ContributedEth","type":"uint256"},{"internalType":"uint256","name":"RaisedFeeEth","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"uint256","name":"RetrievedTokenAmount","type":"uint256"},{"internalType":"uint256","name":"RetrievedEthAmount","type":"uint256"},{"internalType":"uint256","name":"NumberOfContributors","type":"uint256"}],"internalType":"struct PresaleDataState","name":"State","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TimelockFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"YieldFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"}],"name":"SetTimelockFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"yieldFeeAddress","type":"address"}],"name":"SetYieldFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress","type":"address"}],"name":"SetFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"TokenAllocations","type":"tuple[]"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"internalType":"address","name":"Token","type":"address"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Discord","type":"string"}],"internalType":"struct PresaleSettings","name":"settings","type":"tuple"}],"name":"CreatePresale","outputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"Contribute","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"contributor","type":"address"}],"name":"RetrieveEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"RetrieveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokensToLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"AddUniswapLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"ClaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"DistributeEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"SoftcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"HardcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PresaleIndexerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"EthDistributable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetTokenAllocations","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetEthContributedForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetHardcapAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetNumberOfContributors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
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
    createPresale: async function () {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;

      const softCap = web3.utils.toWei(this.settings.softcap, 'ether');
      const hardCap = web3.utils.toWei(this.settings.hardcap, 'ether');

      let liqTokenAllocation = {};
      if (!this.liquidity.permaBurn) {
        let timeLockedReleaseDate = 1;
        let intervalReleaseDate = 0;
        let intervalPrecentage = 0;
        let intervalOfRelease = 0;
        if (this.liquidity.limeLocked) {
          timeLockedReleaseDate = new Date(this.liquidity.releaseDate);
        } else if (this.liquidity.interval) {
          intervalReleaseDate = new Date(this.liquidity.intervalStartDate);
          intervalOfRelease = this.liquidity.intervalInDays;
          intervalPrecentage = this.liquidity.intervalPercentage;
        }

        liqTokenAllocation = {
          Name: `${this.settings.name}-liquidity-tokens`,
          Amount: 0, // not relevant
          RemainingAmount: 0, // not relevant
          ReleaseDate: timeLockedReleaseDate,
          InvervalReleaseStart: intervalReleaseDate,
          IsInterval: this.liquidity.interval,
          PercentageOfRelease: intervalPrecentage,
          IntervalOfRelease: intervalOfRelease,
          Exists: true,
          Token: process.env.VUE_APP_CONTRACT_ADDRESS //not relevant
        };
      }

      const presaleDto = {
        Token: this.settings.address,
        Name: this.settings.name,
        StartDate: new Date(this.settings.startDate).getTime(),
        EndDate: new Date(this.settings.endDate).getTime(),
        Softcap: `${softCap}`,
        Hardcap: `${hardCap}`,
        TokenPresaleAllocation: `${this.settings.tokenPresaleAllocation}`,
        TokenLiqAmount: `${this.liquidity.amount}`,
        LiqPercentage: `${this.liquidity.precentage}`,
        PermalockLiq: this.liquidity.permaBurn,
        LiquidityTokenAllocation: liqTokenAllocation,
        //MOCKED DATA
        TokenAllocations:[{
          Name:"test",
          Amount:1,
          RemainingAmount:1,
          ReleaseDate:1,
          InvervalReleaseStart:1,
          IsInterval:false,
          PercentageOfRelease:1,
          IntervalOfRelease:1,
          Exists:true,
          Token: this.settings.address,
        }],
        // SOCIALS WILL CHANGE TO
        Website: this.socials[0].url,
        Telegram: this.socials[0].url,
        Twitter: this.socials[0].url,
        Discord: this.socials[0].url,
      }

      console.log(presaleDto);
console.log(this.account)
      if (this.account !== null && this.account !== '') {
        await presaleContractInterface.methods.CreatePresale(presaleDto)
            .send({from: this.account})
            .then((response) => {
              console.log(response)
            })
            .catch((e) => {
              console.log('error:' + e);
            });
      }
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
