<template>
  <div class="bg-white shadow-sm border rounded-lg">
    <div class="p-8">
      <!-- Header -->
      <div class="flex justify-between items-start mb-8">
        <div class="space-y-2">
          <h1 class="text-2xl font-bold text-gray-900">INVOICE</h1>
          <div class="text-sm text-gray-500"># {{ invoiceNumber || 'INV-001' }}</div>
        </div>
        <div class="text-right space-y-1">
          <div class="text-sm text-gray-500">Balance Due</div>
          <div class="text-2xl font-bold text-gray-900">
            {{ currency.symbol }}{{ calculateTotal.toFixed(2) }}
          </div>
        </div>
      </div>

      <!-- Bill From/To -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="font-medium text-gray-500 mb-2">From</h3>
          <div class="text-sm space-y-1">
            <p class="font-medium text-gray-900">Your Company Name</p>
            <p class="text-gray-600">123 Your Street</p>
            <p class="text-gray-600">Your City, ST 12345</p>
            <p class="text-gray-600">your@email.com</p>
          </div>
        </div>
        <div>
          <h3 class="font-medium text-gray-500 mb-2">Bill To</h3>
          <div class="text-sm space-y-1">
            <p class="font-medium text-gray-900">{{ client.name }}</p>
            <p class="text-gray-600">{{ client.email }}</p>
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-8 mb-8 text-sm">
        <div>
          <div class="font-medium text-gray-500 mb-2">Issue Date</div>
          <div class="text-gray-900">{{ new Date().toLocaleDateString() }}</div>
        </div>
        <div>
          <div class="font-medium text-gray-500 mb-2">Due Date</div>
          <div class="text-gray-900">{{ new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString() }}</div>
        </div>
      </div>

      <!-- Items Table -->
      <div class="mb-8">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="py-3 text-left font-medium text-gray-500">Item</th>
              <th class="py-3 text-right font-medium text-gray-500">Quantity</th>
              <th class="py-3 text-right font-medium text-gray-500">Rate</th>
              <th class="py-3 text-right font-medium text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.name" class="border-b border-gray-100">
              <td class="py-4">
                <div class="font-medium text-gray-900">{{ item.name }}</div>
                <div class="text-gray-500">{{ item.description }}</div>
              </td>
              <td class="py-4 text-right text-gray-900">
                {{ item.quantity }} {{ item.unit === 'custom' ? item.customUnit : item.unit }}
              </td>
              <td class="py-4 text-right text-gray-900">
                {{ currency.symbol }}{{ item.price.toFixed(2) }}
              </td>
              <td class="py-4 text-right text-gray-900">
                {{ currency.symbol }}{{ (item.quantity * item.price).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="flex justify-end">
        <div class="w-64 space-y-3">
          <div class="flex justify-between text-sm">
            <div class="text-gray-500">Subtotal</div>
            <div class="text-gray-900">{{ currency.symbol }}{{ calculateSubtotal.toFixed(2) }}</div>
          </div>
          <div class="flex justify-between text-sm">
            <div class="text-gray-500">Tax ({{ taxRate }}%)</div>
            <div class="text-gray-900">{{ currency.symbol }}{{ calculateTax.toFixed(2) }}</div>
          </div>
          <div class="flex justify-between font-medium pt-2 border-t border-gray-200">
            <div class="text-gray-900">Total</div>
            <div class="text-gray-900">{{ currency.symbol }}{{ calculateTotal.toFixed(2) }}</div>
          </div>
          <div class="flex justify-between text-sm">
            <div class="text-gray-500">Amount Paid</div>
            <div class="text-gray-900">{{ currency.symbol }}0.00</div>
          </div>
          <div class="flex justify-between font-medium pt-2 border-t border-gray-200">
            <div class="text-gray-900">Balance Due</div>
            <div class="text-gray-900">{{ currency.symbol }}{{ calculateTotal.toFixed(2) }}</div>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="mt-8 text-sm text-gray-500">
        <div class="font-medium mb-2">Notes</div>
        <p>Thank you for your business!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  invoiceNumber: {
    type: String,
    default: ''
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
    default: 0
  }
})

const calculateSubtotal = computed(() => {
  return props.items.reduce((total, item) => {
    return total + (item.quantity * item.price)
  }, 0)
})

const calculateTax = computed(() => {
  return calculateSubtotal.value * (props.taxRate / 100)
})

const calculateTotal = computed(() => {
  return calculateSubtotal.value + calculateTax.value
})
</script>
