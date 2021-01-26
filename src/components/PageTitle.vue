:<template>
  <div id="page--title">
    <div class="px-4 mt-6 sm:px-6 lg:px-8">
      <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <div class="mt-3 sm:mt-0 sm:ml-4">
          
          <label for="search_candidate" class="sr-only">Search</label>
          <div class="flex rounded-md shadow-sm">
            <div class="relative flex-grow focus-within:z-10">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <!-- Heroicon name: search -->
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input type="text" name="search_candidate" id="search_candidate" class="focus:border-blue-500 active:border-blue-500 block w-full rounded pl-10 pb-1 pt-1 border-gray-300 dark:bg-gray-800 dark:focus:border-blue-500 text-white" placeholder="Search">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagetitle.components',
  props: {
    title: String
  }
}
</script>

<style>

</style>