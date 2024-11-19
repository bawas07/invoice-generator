<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center">
          <img :src="invoiceIcon" alt="Invoice" class="w-8 h-8 mr-3" />
          <h1 class="text-2xl font-bold text-gray-900">Create New Invoice</h1>
        </div>
        <div class="flex space-x-3">
          <router-link
            to="/"
            class="btn btn-secondary"
          >
            Cancel
          </router-link>
          <button
            type="button"
            @click="handleSubmit"
            class="btn btn-primary"
          >
            Create Invoice
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form -->
        <div class="space-y-6">
          <!-- Client Information -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Invoice Information</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="clientName" class="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  id="clientName"
                  v-model="invoice.client.name"
                  required
                  class="input"
                />
              </div>
              <div>
                <label for="clientEmail" class="block text-sm font-medium text-gray-700">Client Email</label>
                <input
                  type="email"
                  id="clientEmail"
                  v-model="invoice.client.email"
                  required
                  class="input"
                />
              </div>
              <div>
                <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
                <select
                  id="currency"
                  v-model="invoice.currency"
                  required
                  class="input"
                >
                  <option v-for="curr in currencies" :key="curr.code" :value="curr">
                    {{ curr.code }} ({{ curr.symbol }})
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Invoice Items -->
          <div class="bg-white shadow-sm rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-900">Invoice Items</h2>
              <button
                type="button"
                @click="addItem"
                class="btn btn-secondary"
              >
                Add Item
              </button>
            </div>
            
            <div class="space-y-4">
              <div
                v-for="(item, index) in invoice.items"
                :key="index"
                class="bg-gray-50 p-4 rounded-lg space-y-4"
              >
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label :for="'item-name-' + index" class="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                      :id="'item-name-' + index"
                      type="text"
                      v-model="item.name"
                      required
                      class="input"
                      placeholder="Product or service name"
                    />
                  </div>
                  <div>
                    <label :for="'item-description-' + index" class="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      :id="'item-description-' + index"
                      type="text"
                      v-model="item.description"
                      class="input"
                      placeholder="Additional details"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label :for="'item-quantity-' + index" class="block text-sm font-medium text-gray-700">Quantity</label>
                    <div class="grid grid-cols-2 gap-2">
                      <input
                        :id="'item-quantity-' + index"
                        type="number"
                        v-model.number="item.quantity"
                        min="1"
                        required
                        class="input"
                        @input="updateItemSubtotal(item)"
                      />
                      <div>
                        <select
                          v-if="item.unit !== 'custom'"
                          v-model="item.unit"
                          class="input"
                          :id="'item-unit-' + index"
                        >
                          <option v-for="unit in commonUnits" :key="unit.value" :value="unit.value">
                            {{ unit.label }}
                          </option>
                        </select>
                        <input
                          v-else
                          type="text"
                          v-model="item.customUnit"
                          class="input"
                          :id="'item-custom-unit-' + index"
                          placeholder="Enter unit..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label :for="'item-price-' + index" class="block text-sm font-medium text-gray-700">Unit Price</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">{{ invoice.currency.symbol }}</span>
                      </div>
                      <input
                        :id="'item-price-' + index"
                        type="number"
                        v-model.number="item.price"
                        min="0"
                        step="0.01"
                        required
                        class="input pl-7"
                        @input="updateItemSubtotal(item)"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="invoice.items.length > 1" class="flex justify-end">
                  <button
                    type="button"
                    @click="removeItem(index)"
                    class="text-sm text-red-600 hover:text-red-900"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div class="sticky top-8">
          <InvoicePreview
            :client="invoice.client"
            :items="invoice.items"
            :currency="invoice.currency"
            :tax-rate="taxRate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInvoiceStore } from '../stores/invoice'
import invoiceIcon from '../assets/invoice-icon.svg'
import InvoicePreview from '../components/InvoicePreview.vue'

const router = useRouter()
const store = useInvoiceStore()
const taxRate = 10

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'INR', symbol: '₹' },
  { code: 'IDR', symbol: 'Rp' }
]

const commonUnits = [
  { value: 'hours', label: 'Hours' },
  { value: 'pieces', label: 'Pieces' },
  { value: 'kg', label: 'Kilograms' },
  { value: 'g', label: 'Grams' },
  { value: 'bottles', label: 'Bottles' },
  { value: 'boxes', label: 'Boxes' },
  { value: 'units', label: 'Units' },
  { value: 'custom', label: 'Custom...' }
]

const invoice = ref({
  client: {
    name: '',
    email: ''
  },
  currency: currencies[0], // Default to USD
  items: [
    {
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      unit: commonUnits[0].value,
      customUnit: '',
      subtotal: 0
    }
  ]
})

const addItem = () => {
  invoice.value.items.push({
    name: '',
    description: '',
    quantity: 1,
    price: 0,
    unit: commonUnits[0].value,
    customUnit: '',
    subtotal: 0
  })
}

const removeItem = (index) => {
  invoice.value.items.splice(index, 1)
}

const calculateItemSubtotal = (item) => {
  return item.quantity * item.price
}

const updateItemSubtotal = (item) => {
  item.subtotal = calculateItemSubtotal(item)
}

const calculateSubtotal = computed(() => {
  return invoice.value.items.reduce((total, item) => {
    return total + calculateItemSubtotal(item)
  }, 0)
})

const calculateTax = computed(() => {
  return calculateSubtotal.value * (taxRate / 100)
})

const calculateTotal = computed(() => {
  return calculateSubtotal.value + calculateTax.value
})

const handleSubmit = () => {
  const newInvoice = {
    ...invoice.value,
    total: calculateTotal.value
  }
  
  store.addInvoice(newInvoice)
  router.push('/invoices')
}
</script>
