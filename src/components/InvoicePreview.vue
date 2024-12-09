<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <!-- Preview Header -->
    <div class="bg-oxford-400 text-white px-6 py-4">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">Invoice Preview</h2>
        <span class="text-oxford-100">{{ formatDate(props.date) }}</span>
      </div>
    </div>

    <!-- Preview Content -->
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-8">
        <div class="space-y-2">
          <h1 class="text-2xl font-bold text-oxford-400">INVOICE</h1>
          <div class="text-sm text-oxford-300"># {{ props.number }}</div>
        </div>
        <div class="text-right space-y-1">
          <div class="text-sm text-oxford-300">Balance Due</div>
          <div class="text-2xl font-bold text-oxford-400">
            {{ formatCurrency(props.total) }}
          </div>
        </div>
      </div>

      <!-- Bill From/To -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="font-medium text-oxford-400 mb-2">From</h3>
          <div class="text-sm space-y-1">
            <p class="font-medium text-oxford-400">{{ props.company.name || 'Your Company Name' }}</p>
            <p class="text-oxford-200">{{ props.company.address || '123 Your Street' }}</p>
            <p v-if="props.company.phone" class="text-oxford-200">{{ props.company.phone }}</p>
            <p class="text-oxford-200">{{ props.company.email || 'your@email.com' }}</p>
            <p v-if="props.company.website" class="text-oxford-200">{{ props.company.website }}</p>
            <p v-if="props.company.taxId" class="text-oxford-200">Tax ID: {{ props.company.taxId }}</p>
          </div>
        </div>
        <div>
          <h3 class="font-medium text-oxford-400 mb-2">Bill To</h3>
          <div class="text-sm space-y-1">
            <p class="font-medium text-oxford-400">{{ props.client.name }}</p>
            <p class="text-oxford-200">{{ props.client.email }}</p>
            <p class="text-oxford-200">{{ props.client.address }}</p>
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="font-medium text-oxford-400 mb-2">Issue Date</h3>
          <p class="text-sm text-oxford-200">{{ formatDate(props.date) }}</p>
        </div>
        <div>
          <h3 class="font-medium text-oxford-400 mb-2">Due Date</h3>
          <p class="text-sm text-oxford-200">{{ formatDate(props.dueDate) }}</p>
        </div>
      </div>

      <!-- Items Table -->
      <div class="mt-8">
        <table class="min-w-full divide-y divide-oxford-100">
          <thead>
            <tr>
              <th class="px-3 py-3 text-left text-xs font-medium text-oxford-300 uppercase tracking-wider">Item</th>
              <th class="px-3 py-3 text-right text-xs font-medium text-oxford-300 uppercase tracking-wider">Quantity</th>
              <th class="px-3 py-3 text-right text-xs font-medium text-oxford-300 uppercase tracking-wider">Rate</th>
              <th class="px-3 py-3 text-right text-xs font-medium text-oxford-300 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-oxford-100">
            <tr v-for="item in props.items" :key="item.name">
              <td class="px-3 py-4 text-sm text-oxford-400">
                <div class="font-medium">{{ item.name }}</div>
                <div class="text-oxford-200">{{ item.description }}</div>
              </td>
              <td class="px-3 py-4 text-sm text-oxford-300 text-right">{{ item.quantity }} {{ item.unit === 'custom' ? item.customUnit : item.unit }}</td>
              <td class="px-3 py-4 text-sm text-oxford-300 text-right">{{ formatCurrency(item.price) }}</td>
              <td class="px-3 py-4 text-sm text-oxford-300 text-right">{{ formatCurrency(item.quantity * item.price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="mt-8 border-t border-oxford-100 pt-8">
        <div class="space-y-4">
          <div class="flex justify-between text-oxford-300">
            <span>Subtotal:</span>
            <span>{{ formatCurrency(props.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-oxford-300">
            <span>Tax ({{ props.taxRate }}%):</span>
            <span>{{ formatCurrency(props.taxAmount) }}</span>
          </div>
          <div class="flex justify-between text-xl font-bold text-oxford-400 pt-4 border-t border-oxford-100">
            <span>Total:</span>
            <span>{{ formatCurrency(props.total) }}</span>
          </div>
          <div class="flex justify-between text-oxford-300">
            <span>Amount Paid:</span>
            <span>{{ formatCurrency(0) }}</span>
          </div>
          <div class="flex justify-between text-xl font-bold text-oxford-400 pt-4 border-t border-oxford-100">
            <span>Balance Due:</span>
            <span>{{ formatCurrency(props.total) }}</span>
          </div>
        </div>
      </div>

      <!-- Notes Section -->
      <div v-if="props.notes" class="mt-8 pt-8 border-t border-oxford-100">
        <h3 class="font-medium text-oxford-400 mb-2">Additional Information</h3>
        <p class="text-sm text-oxford-200 whitespace-pre-wrap">{{ props.notes }}</p>
      </div>

      <!-- Notes -->
      <div class="mt-8 text-sm text-oxford-200">
        <p>Thank you for your business!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  company: {
    type: Object,
    required: true
  },
  client: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  currency: {
    type: Object,
    required: true
  },
  taxRate: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
})

function formatCurrency(amount) {
  return `${props.currency.symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
