<template>
  <div>
    <h1 class="text-4xl font-extrabold text-gray-700 dark:text-gray-200">
      Socials
    </h1>
    <div class="mt-10">
      <div class="dark:bg-gray-800 bg-gray-50 px-5 py-5 rounded-lg border border-gray-200">
        <div class="block" v-for="(social, key) in socials" :key="key">
          <div class="flex">
            <div class="flex pr-5">
              <svg class="w-6 h-6 mt-3 text-gray-900 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </div>
            <div class="flex w-full">
              <input
                  type="text"
                  v-model="social.url"
                  class="w-full mt-2 mb-2 px-3 py-1 rounded-lg
                        text-gray-600 dark:text-gray-300
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent
                        bg-gray-100 dark:bg-gray-700">
            </div>
            <div class="flex">
              <a v-on:click="deleteSocial(key)" class="mt-3 pl-3 cursor-pointer">
                <svg class="w-6 h-6 text-red-500 hover:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              </a>
            </div>
          </div>
        </div>
        <div v-if="socials.length < 4" class="block text-center">
          <button v-on:click="addSocials" class="bg-yellow-500 mt-5 px-4 py-2 rounded text-white hover:bg-yellow-600">Add social</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'presale.Socials.components',
  props: {
    account: String,
    socials: Array,
  },
  data: () => ({
    error: {
      tokenAddress: '',
      tokenName: '',
      companyName: ''
    }
  }),
  methods: {
    addSocials: function() {
      this.$emit('addSocials');
    },
    deleteSocial: function(key) {
      this.$emit('deleteSocial', key);
    }
  },
  watch: {
    tokenAddress: {
      handler() {
        if (this.token.address === this.account) {
          this.error.tokenAddress = '';
          this.isValid = !this.isValid;
        } else {
          this.error.tokenAddress = 'Token address does not match your connected META MASK wallet.';
          this.isValid = !this.isValid;
        }
      },
      deep: true
    }
  }
}
</script>