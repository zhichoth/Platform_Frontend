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
                  {{ presale.TokenName }}
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
                  {{ presale.CompanyName }}
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-medium tracking-wide">
                  Start date: {{ presale.StartDate }}
                </span>
                <span class="block text-base text-gray-900 dark:text-white font-medium tracking-wide">
                  End date: {{ presale.EndDate }}
                </span>
              </h1>
            </div>
            <div class="col-span-3">
              <span class="block text-base text-gray-900 dark:text-white font-semibold tracking-wide uppercase">
                {{ presale.name }} Token address:
                <a :href="`https://etherscan.io/address/${presale.TokenAddress}`" target="_blank" class="text-blue-500 hover:text-yellow-600 transiation duration-300">{{ presale.TokenAddress }}</a>
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
                <div class="grid mt-3">
                  <div class="flex">
                    <svg class="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Website: </span>
                    <a :href="presale.Socials[1]" class="text-blue-500">{{ presale.Socials[1] }}</a>
                  </div>
                  <div class="flex">
                    <svg class="h-5 w-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="m.415 11.196 5.869 2.925c.227.112.495.104.712-.023l5.224-3.037-3.162 2.802c-.161.143-.253.347-.253.562v6.825c0 .72.919 1.023 1.35.451l2.537-3.373 6.274 3.573c.44.253 1.004-.001 1.106-.504l3.913-19.5c.117-.586-.466-1.064-1.008-.846l-22.5 8.775c-.604.236-.643 1.081-.062 1.37zm21.83-8.249-3.439 17.137-5.945-3.386c-.324-.185-.741-.103-.971.201l-1.585 2.107v-4.244l8.551-7.576c.677-.599-.101-1.664-.874-1.21l-11.39 6.622-3.992-1.989z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Telegram: </span>
                    <a :href="presale.Socials[2]" class="text-blue-500">{{ presale.Socials[2] }}</a>
                  </div>
                  <div class="flex">
                    <svg class="h-5 w-5 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Twitter: </span>
                    <a :href="presale.Socials[3]" class="text-blue-500">{{ presale.Socials[3] }}</a>
                  </div>
                  <div class="flex">
                    <svg class="h-6 w-6 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-900 dark:text-white pl-3 pr-3">Github: </span>
                    <a :href="presale.Socials[4]" class="text-blue-500">{{ presale.Socials[4] }}</a>
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
                        <a href="#" class="text-blue-500">{{ presale.LiquidityLocked }}%</a>
                      </div>
                    </div>
                  
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Total tokens:</span>
                        <a href="#" class="text-blue-500">{{ presale.TotalSupply }} {{ presale.TokenName }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Tokens in presale:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokensInPresale }} {{ presale.TokenName }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Token Liquidity:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokenLiquidity }} {{ presale.TokenName }}</a>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Token price per token:</span>
                        <a href="#" class="text-blue-500">{{ presale.TokenPrice }} ETH</a>
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
                        <a href="#" class="text-blue-500">{{ presale.TotalContributed }}</a>
                        <span class="text-yellow-500 pl-2">ETH</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Your current investment:</span>
                        <a href="#" class="text-blue-500">{{ presale.UserContribution }}</a>
                        <span class="text-yellow-500 pl-2">ETH</span>
                      </div>
                    </div>
                    <div class="grid gap-1 mt-1">
                      <div class="flex">
                        <span class="text-gray-900 dark:text-white pr-5">Estimated return:</span>
                        <a href="#" class="text-blue-500">{{ presale.Roi }} </a>
                        <span class="text-yellow-500 pl-2">{{ presale.TokenName }} </span>
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
                  <div v-for="(token, key) in presale.tokens" :key="key">
                    <div class="grid grid-cols-1 gap-1 mt-3">
                      <div class="flex">
                        <span class="text-yellow-600 w-1/5">{{ token.liquidity }}%</span>
                        <span class="text-gray-900 dark:text-white">{{ token.name }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <Chart class="pl-5" style="height: 300px;" :chartData="presale.chartData" :options="options" />
                </div>
              </div>
            </div>
          </div>
          <div class="block mt-8">
            <span class="block text-1xl leading-8 font-medium tracking-tight text-gray-900 dark:text-white sm:text-1xl">Presale information</span>
            <div class="grid grid-cols-4 gap-5 mt-3">
              <div class="col-span-2">
                <span class="text-gray-900 dark:text-white pr-1">
                  {{ presale.description }}
                </span>
              </div>
            </div>
          </div>
           <div v-if="presale.CurrentStep == 0">
            <div class="block text-center mt-10">
              <button class="py-2 px-8 bg-yellow-500 text-white rounded-3xl">
                Deposit
              </button>
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
import Web3 from "web3";
import moment from 'moment';

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
      presale: {
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
        }
      },
      contractPresale: {},
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
      options: {
        responsive: true,
        legend: {
          display: false,
          position: 'left',
        },
        maintainAspectRatio: false
      },
      contractAbi: [{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"},{"internalType":"address","name":"yieldFeeAddress","type":"address"},{"internalType":"address","name":"feeAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"claimer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Contributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"reciever","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EthYieldFeeDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"contributor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedEth","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RetrievedTokens","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransfered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensTransferedToLocks","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"presaleId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"permaLockedLiq","type":"bool"},{"indexed":false,"internalType":"uint256","name":"amountOfEth","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOfTokens","type":"uint256"}],"name":"UniswapLiquidityAdded","type":"event"},{"inputs":[],"name":"FeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"PresaleIndexer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Presales","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Discord","type":"string"}],"internalType":"struct PresaleInfo","name":"Info","type":"tuple"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"components":[{"internalType":"address","name":"TokenOwnerAddress","type":"address"},{"internalType":"address","name":"TokenAddress","type":"address"},{"internalType":"address","name":"TokenTimeLock","type":"address"}],"internalType":"struct PresaleDataAddresses","name":"Addresses","type":"tuple"},{"components":[{"internalType":"uint256","name":"TotalTokenAmount","type":"uint256"},{"internalType":"uint256","name":"Step","type":"uint256"},{"internalType":"uint256","name":"ContributedEth","type":"uint256"},{"internalType":"uint256","name":"RaisedFeeEth","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"uint256","name":"RetrievedTokenAmount","type":"uint256"},{"internalType":"uint256","name":"RetrievedEthAmount","type":"uint256"},{"internalType":"uint256","name":"NumberOfContributors","type":"uint256"}],"internalType":"struct PresaleDataState","name":"State","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TimelockFactoryAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"YieldFeeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"timelockFactoryAddress","type":"address"}],"name":"SetTimelockFactory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"yieldFeeAddress","type":"address"}],"name":"SetYieldFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress","type":"address"}],"name":"SetFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"StartDate","type":"uint256"},{"internalType":"uint256","name":"EndDate","type":"uint256"},{"internalType":"uint256","name":"Softcap","type":"uint256"},{"internalType":"uint256","name":"Hardcap","type":"uint256"},{"internalType":"uint256","name":"TokenLiqAmount","type":"uint256"},{"internalType":"uint256","name":"LiqPercentage","type":"uint256"},{"internalType":"uint256","name":"TokenPresaleAllocation","type":"uint256"},{"internalType":"bool","name":"PermalockLiq","type":"bool"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"TokenAllocations","type":"tuple[]"},{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation","name":"LiquidityTokenAllocation","type":"tuple"},{"internalType":"address","name":"Token","type":"address"},{"internalType":"string","name":"Website","type":"string"},{"internalType":"string","name":"Telegram","type":"string"},{"internalType":"string","name":"Twitter","type":"string"},{"internalType":"string","name":"Discord","type":"string"}],"internalType":"struct PresaleSettings","name":"settings","type":"tuple"}],"name":"CreatePresale","outputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"Contribute","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"contributor","type":"address"}],"name":"RetrieveEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"RetrieveTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"TransferTokensToLocks","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"AddUniswapLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"ClaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"DistributeEth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleStarted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"PresaleFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"SoftcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"HardcapMet","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PresaleIndexerLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"EthDistributable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetTokenAllocations","outputs":[{"components":[{"internalType":"string","name":"Name","type":"string"},{"internalType":"uint256","name":"Amount","type":"uint256"},{"internalType":"uint256","name":"RemainingAmount","type":"uint256"},{"internalType":"uint256","name":"ReleaseDate","type":"uint256"},{"internalType":"bool","name":"IsInterval","type":"bool"},{"internalType":"uint256","name":"PercentageOfRelease","type":"uint256"},{"internalType":"uint256","name":"IntervalOfRelease","type":"uint256"},{"internalType":"bool","name":"Exists","type":"bool"},{"internalType":"address","name":"Token","type":"address"}],"internalType":"struct TokenAllocation[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetEthContributedForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"},{"internalType":"address","name":"forAddress","type":"address"}],"name":"GetHardcapAmountOfTokensForAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"presaleId","type":"uint256"}],"name":"GetNumberOfContributors","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    }
  },
  beforeMount: async function() {
    if (this.$store.getters.account !== '') {
      this.account = this.$store.getters.account;
      this.chainId = this.provider.chainId;
      this.isConnected = true;
    } else {
      // Detect provider
      await this.detectProvider();
      // Connect to your account
      await this.currentAccount();
    }
  },
  mounted: async function () {
    await this.getPresaleData();
    await this.getContributedEth();
    // await this.queryPresaleData();
    // await this.getPresalesGraph();
    this.isLoaded = true;
  },
  methods: {
    getPresaleData: async function () {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.Presales(this.id).call().then((response) => {
          this.presale.TokenName = response.Info.Name,
          this.presale.CompanyName = response.Info[0],
          this.presale.StartDate = moment(parseInt(response.StartDate)),
          this.presale.EndDate = moment(parseInt(response.EndDate)),
          this.presale.Softcap = this.readableFormatNumbers(web3.utils.fromWei(response.Softcap)),
          this.presale.Hardcap = this.readableFormatNumbers(web3.utils.fromWei(response.Hardcap)),
          this.presale.TokenAddress = response.Addresses.TokenAddress,
          this.presale.Socials = response.Info,
          this.presale.LiquidityLocked = response.LiqPercentage,
          this.presale.TotalSupply = this.readableFormatNumbers(web3.utils.fromWei(response.State.TotalTokenAmount)),
          this.presale.TokensInPresale = this.readableFormatNumbers(web3.utils.fromWei(response.TokenPresaleAllocation)),
          this.presale.TokenLiquidity = this.readableFormatNumbers(web3.utils.fromWei(response.TokenLiqAmount)),
          this.presale.TokenPrice = this.getTokenPrice();
          this.presale.TotalContributed = response.State.ContributedEth,
          this.presale.CurrentStep = response.State.Step,
          this.presale.TokenOwnerAddress = response.Addresses.TokenOwnerAddress
          
            })
            .catch((e) => {
              console.log('error:' + e);
            });
            console.log(this.presale.CurrentStep)
    },

    getContributedEth: async function () {
      const presaleContractAbi = this.contractAbi;
      const web3 = new Web3(this.provider);
      const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
      presaleContractInterface.options.address = process.env.VUE_APP_PRESALE_CONTRACT;
        await presaleContractInterface.methods.GetEthContributedForAddress(this.id, "0xd8FDdBb100a30730c5DA589De875e09b0113d0f9").call().then((response) => {
          this.presale.UserContribution = response;
          this.presale.Roi = response/this.presale.TokenPrice;
            })
            .catch((e) => {
              console.log('error:' + e);
            });
    
    },

    queryPresaleData: async function () {
      const response = await axios.get(`${process.env.VUE_APP_SERVICE_PHP}/presale/${this.id}`);
      if (response.status !== 200)
        return this.showError(response);

      const presale = response.data.presale;
      presale.chartData = {};
      presale.chartData.datasets = [];
      const dataset = {
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
      presale.chartData.datasets.push(dataset);

      this.presale = presale;
    },
    getPresalesGraph: async function () {
      if (this.presale.tokens && this.presale.tokens.length > 0) {
        for (let index = 0; index < this.presale.tokens.length; index++) {
          this.presale.chartData.datasets[0].data.push(Number(this.presale.tokens[index].liquidity));
        }
      }
    },

    // getEthPrice: async function(){
    //   const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.VUE_APP_ETHERSCAN_API}`);
    //   return response;
    // },

    getTokenPrice: function(){
      // const currentEthPrice = this.getEthPrice(); 
      return (parseInt(this.presale.TokensInPresale) / parseInt(this.presale.Hardcap));
    },

    // getAllowance: async function (){
    //   const presaleContractAbi = this.contractAbi;
    //   const web3 = new Web3(this.provider);
    //   const presaleContractInterface = new web3.eth.Contract(presaleContractAbi);
      
    //   presaleContractInterface.options.address = this.presale.TokenAddress;
    //   const test = await presaleContractInterface.methods.allowance(this.presale.TokenOwnerAddress).call().then()
    //         .catch((e) => {
    //           console.log('error:' + e);
    //         });
    //   console.log(test);
    // },

    readableFormatNumbers: function(x){
        const parts = x.toString().split(".");
        parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
        return parts.join(",");
    },
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
    handleAccountsChanged: function (accounts) {
      if (accounts !== null && accounts.length === 0) {
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
<style lang="scss">
.icon {
  svg {
    path {
      color: #FFF;
    }
  }
}
</style>