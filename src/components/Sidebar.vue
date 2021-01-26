<template>
  <div id="sidebar">
    <!-- Static sidebar for desktop -->
    <div class="h-full hidden lg:flex lg:flex-shrink-0">
      <div class="flex flex-col w-64 border-r-2 border-gray-200 pt-5 pb-4 bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center text-center flex-shrink-0 px-6">
          <img class="h-10 w-auto m-auto" src="/assets/images/logo.svg">
        </div>
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="h-0 flex-1 flex flex-col overflow-y-auto">
          <!-- Navigation -->
          <nav class="px-3 mt-6">
            <div class="space-y-1">
              <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" -->
              <router-link :to="{ name: 'dashboard'}" class="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-yellow-600 dark:hover:bg-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                <!-- Heroicon name: home -->
                <svg class="text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </router-link>
              <router-link :to="{ name: 'yield.dashboard'}" class="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-yellow-600 dark:hover:bg-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <svg class="text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Yield
              </router-link>
              <router-link :to="{ name: 'presale.create'}" class="text-gray-700 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-yellow-600 dark:hover:bg-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <svg class="text-gray-500 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Presale
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'sidebar.component'
}
</script>

<style>
.router-link-exact-active {
  background-color: #f59e0b;
  color: #6a7280;
}
</style>
