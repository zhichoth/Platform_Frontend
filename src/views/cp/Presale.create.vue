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
                :key="key"
              />
            </div>

            <div class="my-8 text-center">
              <Liquidity
                  v-if="settingsIsValid"
                  :liquidity="liquidity"
                  :hardCap="settings.hardcap"
                  :tokensPerEth="settings.tokensPerEth"
                  :key="key"
              />

              <div v-if="!settingsIsValid">
                <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                  Liquidity
                </h1>
                <NotCompleted
                  class="mt-8"
                  :message="missingMessage" />
              </div>

            </div>

            <div class="my-8 text-center">
              <Tokenomics
                  v-if="liquidityIsValid"
                  :tokenomics="tokenomics"
                  :liquidity="liquidity"
                  :chartData="chartData"
                  :options="chartDataOptions"
                  :remainingAmount="remainingAmount"
                  :totalTokens="settings.totalTokens"
                  :setAllocationsPressed="setAllocationsPressed"
                  @setAllocations="setAllocations"
                  :key="key"
              />

              <div v-if="!liquidityIsValid && settingsIsValid">
                <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                  Tokenomics
                </h1>
                <NotCompleted
                    class="mt-8"
                    :message="missingMessage" />
              </div>

            </div>

            <div class="my-8 text-center">
              <Socials
                  v-if="tokenomicsIsValid"
                  :socials="socials"
                  @addSocials="addSocials"
                  @deleteSocial="deleteSocial"
                  :key="key"
              />

              <div v-if="!tokenomicsIsValid && liquidityIsValid && settingsIsValid">
                <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
                  Socials
                </h1>
                <NotCompleted
                    class="mt-8"
                    :message="missingMessage" />
              </div>
            </div>

            <div v-if="setAllocationsPressed && presaleIsValid" class="my-8 text-center">
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
import NotCompleted from '@/components/presale/NotCompleted'
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
    NotCompleted,
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
      name: 'presale',
      softcap: null,
      hardcap: null,
      totalTokens: null,
      tokenPresaleAllocation: null,
      startDate: null,
      endDate: null,
      tokensPerEth: null,
    },
    settingsIsValid: false,
    liquidityIsValid: false,
    liquidity: {
      amount: null,
      percentage: null,
      locked: false,
      permaBurn: false,
      timeLocked: false,
      releaseDate: null,
      interval: false,
      intervalStartDate: null,
      intervalInDays: null,
      intervalPercentage: null,
    },
    remainingAmount: null,
    tokenomicsIsValid: false,
    tokenomics: [],
    setAllocationsPressed: false,
    socialsIsValid: false,
    socials: [
      {
        url: ''
      },
    ],
    presaleIsValid: false,
    missingMessage: "Please fill in all the fields before you continue",
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
      ],
      labels: []
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
    key: 0,
    contractAbi: [{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"},{"internalType":"address","name":"yieldFeeAddress","type":"address"},{"internalType":"address","name":"feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Contributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthYieldFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedEth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"permaLockedLiq","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountOfEth","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokens","type":"uint256"}],"name":"UniswapLiquidityAdded","type":"event"},{"inputs":[],"name":"FeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PresaleIndexer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Presales","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"}],"internalType":"struct PresaleInfo","name":"Info","type":"tuple"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"components":[{"internalType":"address","name":"TokenOwnerAddress","type":"address"},{"internalType":"address","name":"TokenAddress","type":"address"},{"internalType":"address","name":"TokenTimeLock","type":"address"}],"internalType":"struct PresaleDataAddresses","name":"Addresses","type":"tuple"},{"components":[{"internalType":"uint256","name":"TotalTokenAmount","type":"uint256"},{"internalType":"uint256","name":"Step","type":"uint256"},{"internalType":"uint256","name":"ContributedEth","type":"uint256"},{"internalType":"uint256","name":"RaisedFeeEth","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"uint256","name":"RetrievedTokenAmount","type":"uint256"},{"internalType":"uint256","name":"RetrievedEthAmount","type":"uint256"},{"internalType":"uint256","name":"NumberOfContributors","type":"uint256"}],"internalType":"struct PresaleDataState","name":"State","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"TimelockFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"YieldFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"}],"name":"SetTimelockFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"yieldFeeAddress","type":"address"}],"name":"SetYieldFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress","type":"address"}],"name":"SetFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"TokenAllocations","type":"tuple[]"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"internalType":"address","name":"Token","type":"address"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Github","type":"string"},{"internalType":"string","name":"Medium","type":"string"}],"internalType":"struct PresaleSettings","name":"settings","type":"tuple"}],"name":"CreatePresale","outputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"Contribute","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"contributor","type":"address"}],"name":"RetrieveEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"RetrieveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokensToLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"AddUniswapLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"ClaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"DistributeEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"SoftcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"HardcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"PresaleIndexerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"EthDistributable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetTokenAllocations","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetEthContributedForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetHardcapAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetNumberOfContributors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true}]
  }),
  mounted: async function () {
    if (this.provider === undefined) {
      this.isLoaded = true;
    }

    if (!this.isLoaded) {
      // Detect provider
      await this.detectProvider();
      // Connect to your account
      await this.currentAccount();
      this.isLoaded = true;
    }
  },
  methods: {
    addSocials: function() {
      this.socials.push({type: 4, url:''});
    },
    deleteSocial: function(key) {
      if (this.socials.length > 1)
        this.socials.splice(key, 1);
    },
    setAllocations: function(allocations) {
      this.chartData.datasets[0].data = [];

      this.tokenomics = allocations;

      this.tokenomics.forEach((allocation) => {
        if (Number(allocation.percentage) > 0)
          this.chartData.labels.push(allocation.name);
          this.chartData.datasets[0].data.push(Number(allocation.percentage));
      });

      this.chartData.labels.push('Presale');
      const presaleAllocationPercentage = this.settings.tokenPresaleAllocation / this.settings.totalTokens * 100;
      this.chartData.datasets[0].data.push(Number(presaleAllocationPercentage));
      this.chartData.labels.push('Liquidity');
      const liquidityPercentage = this.liquidity.amount / this.settings.totalTokens * 100;
      this.chartData.datasets[0].data.push(Number(liquidityPercentage));

      this.setAllocationsPressed = true;
      this.tokenomicsIsValid = true;
    },
    createPresale: async function () {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;

      const softCap = web3.utils.toWei(this.settings.softcap, 'ether');
      const hardCap = web3.utils.toWei(this.settings.hardcap, 'ether');

      const liqTokenAllocation = this.addLiquidityAllocation();

      const tokenAllocations = this.addTokenAllocation();

      const presaleDto = {
        Token: this.settings.address,
        Name: this.settings.name,
        StartDate: new Date(this.settings.startDate).getTime(),
        EndDate: new Date(this.settings.endDate).getTime(),
        Softcap: `${softCap}`,
        Hardcap: `${hardCap}`,
        TokenPresaleAllocation: web3.utils.toWei(this.settings.tokenPresaleAllocation),
        TokenLiqAmount: web3.utils.toWei(this.liquidity.amount),
        LiqPercentage: `${this.liquidity.percentage}`,
        PermalockLiq: this.liquidity.permaBurn,
        LiquidityTokenAllocation: liqTokenAllocation,
        TokenAllocations: tokenAllocations,
        // SOCIALS WILL CHANGE TO
        Website: this.socials[0].url,
        Telegram: this.socials[0].url,
        Twitter: this.socials[0].url,
        Discord: this.socials[0].url,
      }

      if (this.account !== null && this.account !== '') {
        await this.sendPresaleToContract(presaleContractInterface, presaleDto);
      }
    },
    addLiquidityAllocation: function() {
      let timeLockedReleaseDate = 0;
      let intervalReleaseDate = 0;
      let intervalPercentage = 0;
      let intervalOfRelease = 0;
      if (!this.liquidity.permaBurn) {
        if (this.liquidity.locked && this.liquidity.timeLocked) {
          timeLockedReleaseDate = new Date(this.liquidity.releaseDate).getTime();
        } else if (this.liquidity.interval) {
          intervalReleaseDate = new Date(this.liquidity.intervalStartDate).getTime();
          intervalOfRelease = this.liquidity.intervalInDays;
          intervalPercentage = this.liquidity.intervalPercentage;
        }
      }

      return {
        Name: `${this.settings.name}-liquidity-tokens`,
        Amount: 0, // not relevant
        RemainingAmount: 0, // not relevant
        ReleaseDate: timeLockedReleaseDate,
        IntervalReleaseStart: intervalReleaseDate,
        IsInterval: this.liquidity.interval,
        PercentageOfRelease: intervalPercentage,
        IntervalOfRelease: intervalOfRelease,
        Exists: true,
        Token: process.env.VUE_APP_CONTRACT_ADDRESS //not relevant
      };
    },
    addTokenAllocation: function() {
      const web3 = new Web3(this.provider);
      const tokenAllocations = [];
      for (let i = 0; i < this.tokenomics.length; i++) {
        const allocation = this.tokenomics[i];
        if (allocation.name !== '' && allocation.amount !== null) {
          if (allocation.interval) {
            const dto = {
              Name: allocation.name,
              Amount: web3.utils.toWei(allocation.amount),
              RemainingAmount: 0,//TODO
              ReleaseDate: 1,
              IsInterval: allocation.interval,
              IntervalReleaseStart: new Date(allocation.intervalStartDate).getTime(),
              IntervalOfRelease: allocation.intervalInDays,
              PercentageOfRelease: allocation.intervalPercentage,
              Exists: true,
              Token: this.settings.address
            }
            tokenAllocations.push(dto);
          } else {
            const dto = {
              Name: allocation.name,
              Amount: web3.utils.toWei(allocation.amount),
              RemainingAmount: 0,//TODO
              ReleaseDate: new Date(allocation.releaseDate).getTime(),
              IsInterval: allocation.interval,
              IntervalReleaseStart: 0,
              IntervalOfRelease: 0,
              PercentageOfRelease: 0,
              Exists: true,
              Token: this.settings.address
            }
            tokenAllocations.push(dto);
          }
        }
      }

      return tokenAllocations;
    },
    sendPresaleToContract: async function(presaleContractInterface, presaleDto) {
      this.$loading(true);
      await presaleContractInterface.methods.CreatePresale(presaleDto)
        .send({from: this.account})
        .then((response) => {
          if (response.status && response.blockHash !== '') {
            console.log(response);
            this.key++; // update components

            this.$notifications(
                'Presale successfully created',
                `https://ropsten.etherscan.io/tx/${response.transactionHash}`,
                0, // success
                true);

            this.resetPage();

            this.$loading(false);
          }
        })
        .catch((e) => {
          this.$notifications(
              'Something went wrong creating the presale',
              e.message,
              1, // error
              true);

          this.$loading(false);
        });
    },
    detectProvider: async function () {
      // Great change MetaMask is not installed
      if (this.provider === undefined) {
        return this.showError(
            'unexpected error',
            'It looks like the connection to the MetaMask wallet failed. Try connecting again.',
            false,
            true);
      }

      if (!this.provider.isMetaMask)
        this.$notifications(
            'METAMASK not connected',
            'Please connect your METAMASK',
            1, // error
            true);
    },
    currentAccount: async function () {
      // connect to MetaMask account
      this.chainId = this.provider.chainId;
      this.provider
          .request({ method: 'eth_accounts' })
          .then(this.handleAccountsChanged(this.provider._state.accounts))
          .catch(() => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            this.$notifications(
                'METAMASK not connected',
                'Please connect your METAMASK',
                1, // error
                true);
          });
    },
    handleAccountsChanged: function (accounts) {
      if (accounts !== null && accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        this.isConnected = false;
        this.$notifications(
            'No connections made\'',
            'Click the connect button to connect your MetaMask account',
            1, // error
            true);
      } else {
        this.$store.state.account = accounts[0];
        this.account = accounts[0];
        // show user that MetaMask is connected
        this.isConnected = true;
      }
    },
    resetPage: function() {
      this.settings = {
        address: '',
        name: '',
        softcap: null,
        hardcap: null,
        totalTokens: null,
        tokenPresaleAllocation: null,
        startDate: null,
        endDate: null,
      };

      this.liquidity = {
        amount: null,
        percentage: null,
        locked: false,
        permaBurn: false,
        timeLocked: false,
        releaseDate: null,
        interval: false,
        intervalStartDate: null,
        intervalInDays: null,
        intervalPercentage: null,
      };

      this.tokenomics = [];
      this.socials = [{url: ''}];

      this.settingsIsValid = false;
      this.liquidityIsValid = false;
      this.tokenomicsIsValid = false;
      this.socialsIsValid = false;
      this.presaleIsValid = false;
    }
  },
  watch: {
    settings: {
      handler: function() {
        this.settingsIsValid = this.settings.address !== null &&
            this.settings.name !== null &&
            this.settings.softcap !== null &&
            this.settings.hardcap !== null &&
            this.settings.totalTokens !== null &&
            this.settings.tokenPresaleAllocation !== null &&
            this.settings.startDate !== null &&
            this.settings.endDate !== null;
      },
      deep: true
    },
    liquidity: {
      handler: function() {
        if (this.liquidity.amount !== null) {
          this.remainingAmount = (this.settings.totalTokens - this.settings.tokenPresaleAllocation - this.liquidity.amount);
        }

        if (this.liquidity.percentage !== null && this.liquidity.amount !== null) {
          if (this.liquidity.permaBurn) {
            // all values are filled so liquidity is valid
            this.liquidityIsValid = true;
          } else if (this.liquidity.locked && this.liquidity.timeLocked) {
            // when timelocked is selected check releasedate
            if (this.liquidity.releaseDate !== null)
              this.liquidityIsValid = true;
          } else if (this.liquidity.locked && this.liquidity.interval) {
            // When interval is selected check interval values
            if (this.liquidity.intervalStartDate !== null &&
                this.liquidity.intervalInDays !== null &&
                this.liquidity.intervalPercentage !== null) {
              this.liquidityIsValid = true;
            }
          } else {
            this.liquidityIsValid = false;
          }
        }
      },
      deep: true
    },
    socials: {
      handler: function() {
        if (this.socials.length > 0) {
          for (let i = 0; i < this.socials.length; i++) {
            this.socialsIsValid = this.socials[i].url !== '';
          }
        }
      },
      deep: true
    },
    socialsIsValid: {
      handler: function() {
        this.presaleIsValid = this.socialsIsValid && this.settingsIsValid && this.liquidityIsValid && this.tokenomicsIsValid;
      }
    },
    tokenPriceETH: {
      handler: async function() {
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
