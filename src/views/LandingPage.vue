<template>
  <div class="h-full bg-gradient-to-b from-blue-50 to-white">
    <!-- Hero Section -->
    <div class="relative h-[60%] overflow-hidden">
      <div class="h-full max-w-7xl mx-auto flex items-center">
        <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Professional Invoices</span>
                <span class="block text-blue-600">Made Simple</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create beautiful, professional invoices in minutes. Keep track of your business finances with our easy-to-use invoice generator.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/create"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Create Invoice
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link
                    to="/invoices"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    View Invoices
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="h-[40%] bg-white">
      <div class="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div class="lg:text-center">
          <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage invoices
          </p>
        </div>

        <div class="mt-10">
          <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <!-- Feature 1 -->
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Easy Creation</h3>
                <p class="mt-2 text-base text-gray-500">
                  Create professional invoices in minutes with our intuitive interface.
                </p>
              </div>
            </div>

            <!-- Feature 2 -->
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Automatic Calculations</h3>
                <p class="mt-2 text-base text-gray-500">
                  Let us handle the math. Automatic calculation of subtotals, taxes, and totals.
                </p>
              </div>
            </div>

            <!-- Feature 3 -->
            <div class="relative">
              <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-16">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Invoice Management</h3>
                <p class="mt-2 text-base text-gray-500">
                  Keep track of all your invoices in one place. View, edit, and manage with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for the landing page
</script>
