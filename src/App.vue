<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-xl font-bold text-blue-600 hover:text-blue-700">
                Invoice Generator
              </router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/invoices"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900': $route.path === '/invoices' }"
              >
                Invoices
              </router-link>
              <router-link
                to="/create"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="{ 'border-blue-500 text-gray-900': $route.path === '/create' }"
              >
                Create Invoice
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
/* No styles defined */
</style>
