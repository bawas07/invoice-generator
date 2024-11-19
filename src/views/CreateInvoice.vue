<template>
  <div class="h-full bg-white shadow sm:rounded-lg">
    <div class="h-full px-4 py-5 sm:p-6">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div class="flex items-center mb-6">
            <img :src="invoiceIcon" alt="Invoice" class="w-8 h-8 mr-3" />
            <h2 class="text-2xl font-bold text-gray-900">Create New Invoice</h2>
          </div>
          <form @submit.prevent="handleSubmit" class="mt-5 space-y-6 h-[calc(100%-4rem)] flex flex-col">
            <div class="flex-grow space-y-6 overflow-auto pr-2">
              <!-- Client Information -->
              <div>
                <h4 class="text-md font-medium text-gray-900">Invoice Information</h4>
                <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              <div>
                <div class="flex justify-between items-center">
                  <h4 class="text-md font-medium text-gray-900">Invoice Items</h4>
                  <button
                    type="button"
                    @click="addItem"
                    class="btn btn-secondary"
                  >
                    Add Item
                  </button>
                </div>
                
                <div class="mt-3 space-y-4">
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
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                      <div class="sm:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Subtotal</label>
                        <div class="mt-1 text-lg font-medium text-gray-900 py-2">
                          {{ invoice.currency.symbol }}{{ calculateItemSubtotal(item).toFixed(2) }}
                          <span class="text-sm text-gray-500">
                            ({{ item.quantity }} {{ item.unit === 'custom' ? item.customUnit : item.unit }} × 
                            {{ invoice.currency.symbol }}{{ item.price }})
                          </span>
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

            <!-- Total and Actions -->
            <div class="flex-shrink-0 border-t border-gray-200 pt-4">
              <div class="flex justify-between items-center">
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Subtotal</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ invoice.currency.symbol }}{{ calculateSubtotal.toFixed(2) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-500">Tax ({{ taxRate }}%)</dt>
                    <dd class="text-sm font-medium text-gray-900">{{ invoice.currency.symbol }}{{ calculateTax.toFixed(2) }}</dd>
                  </div>
                  <div class="flex justify-between border-t border-gray-200 pt-2">
                    <dt class="text-base font-medium text-gray-900">Total</dt>
                    <dd class="text-base font-medium text-gray-900">{{ invoice.currency.symbol }}{{ calculateTotal.toFixed(2) }}</dd>
                  </div>
                </dl>

                <div class="flex space-x-3">
                  <router-link
                    to="/"
                    class="btn btn-secondary"
                  >
                    Cancel
                  </router-link>
                  <button
                    type="submit"
                    class="btn btn-primary"
                  >
                    Create Invoice
                  </button>
                </div>
              </div>
            </div>
          </form>
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
