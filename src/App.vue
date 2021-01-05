<template>
  <div id="app" class="h-full dark:bg-gray-900">
    <div class="flex bg-white dark:bg-gray-900">
      <Sidebar />
      <!-- Main column -->
      <div class="flex flex-col w-0 flex-1">
        <router-view class="flex w-100 pb-10" />
        <Footer class="block border-t-2 bg-gray-50 dark:bg-gray-800" />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    Sidebar,
    Footer
  },
  beforeMount: function() {
    this.$store.dispatch("initTheme");
  },
}
</script>

<style lang="scss">
  .footer {
    margin-top: -120px;
  }
</style>
