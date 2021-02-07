<template>
  <div id="presale--table">
    <div class="hidden mt-8 sm:block pt-4 px-4 sm:px-6 lg:px-8">
      <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">Presale list</h2>
        <div class="align-middle inline-block min-w-full mt-3 border-b border-l border-r border-gray-200">
          <table class="min-w-full">
            <thead>
              <tr class="border-t border-gray-200">
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Liquidity locked
                </th>
                <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tokens locked
                </th>
                <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Coin price
                </th>
                <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Value locked
                </th>
                <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Softcap
                </th>
                <th class="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Hardcap
                </th>
                <th class="pr-6 py-3 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-100">
              <tr v-for="(presale, key) in presales" :key="key">
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.name }}
                        <br>
                        <span class="text-yellow-500 font-normal">
                          {{ presale.subname }}
                        </span>
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.liquidity }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.tokensLocked }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex items-center space-x-3 lg:pl-2">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.coinPrice }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.valueLocked }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                        {{ presale.softcap }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  <div class="flex items-center space-x-3">
                    <a href="#" class="truncate hover:text-gray-600">
                      <span>
                       {{ presale.hardcap }}
                      </span>
                    </a>
                  </div>
                </td>
                <td class="px-6 py-3 text-sm font-medium">
                  <div class="flex items-center space-x-3">
                      <button v-on:click="showPresale(presale)" class="bg-yellow-500 rounded pl-3 pr-3 pt-2 pb-2 text-white">View</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
<!--      <PresaleModal-->
<!--          v-if="showModal"-->
<!--          :presale="presale"-->
<!--      />-->
  </div>
</template>

<script>

export default {
  name: 'presale.table.presale.dashboard.views.components',
  props: { 
    presales: Array
  },
  data: () => ({
    presale: {},
  }),
  methods: {
    showPresale: function (presale) {
      this.$store.state.presale = presale;
      this.$router.push({ name: 'presale.show', params: {name: presale.name} });
    }
  }
}
</script>

<style>

</style>