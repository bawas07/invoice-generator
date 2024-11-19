<template>
  <div class="h-full bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6 h-full">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Invoices</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all your invoices.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <router-link
            to="/create"
            class="btn btn-primary"
          >
            Create Invoice
          </router-link>
        </div>
      </div>
      
      <div class="mt-8 flex flex-col h-[calc(100%-5rem)]">
        <div class="flex-grow -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Invoice #</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Client</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="invoice in invoices" :key="invoice.id">
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ invoice.id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(invoice.createdAt) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ invoice.client.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${{ invoice.total.toFixed(2) }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span :class="getStatusClass(invoice.status)">
                        {{ invoice.status }}
                      </span>
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button @click="deleteInvoice(invoice.id)" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                  <tr v-if="invoices.length === 0">
                    <td colspan="6" class="px-3 py-4 text-sm text-gray-500 text-center">No invoices found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '../stores/invoice'

const store = useInvoiceStore()
const { invoices } = storeToRefs(store)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800'
  }
  return `inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${classes[status]}`
}

const deleteInvoice = (id) => {
  if (confirm('Are you sure you want to delete this invoice?')) {
    store.deleteInvoice(id)
  }
}
</script>
