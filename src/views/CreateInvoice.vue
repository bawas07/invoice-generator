<template>
  <div class="min-h-screen bg-oxford-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-oxford-400">Create Invoice</h1>
        <div class="flex gap-4">
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
    </header>

    <!-- Main content -->
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Form Section -->
          <div class="space-y-6">
            <!-- Client Information -->
            <div class="bg-white shadow rounded-lg p-6 space-y-6">
              <h2 class="text-xl font-semibold text-oxford-400">Invoice Information</h2>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="clientName" class="block text-sm font-medium text-oxford-300">Client Name</label>
                  <input
                    type="text"
                    id="clientName"
                    v-model="invoice.client.name"
                    required
                    class="input"
                  />
                </div>
                <div>
                  <label for="clientEmail" class="block text-sm font-medium text-oxford-300">Client Email</label>
                  <input
                    type="email"
                    id="clientEmail"
                    v-model="invoice.client.email"
                    required
                    class="input"
                  />
                </div>
                <div>
                  <label for="clientAddress" class="block text-sm font-medium text-oxford-300">Client Address</label>
                  <input
                    type="text"
                    id="clientAddress"
                    v-model="invoice.client.address"
                    required
                    class="input"
                  />
                </div>
                <div>
                  <label for="currency" class="block text-sm font-medium text-oxford-300">Currency</label>
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
            <div class="bg-white shadow rounded-lg p-6 space-y-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-oxford-400">Invoice Items</h2>
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
                  class="p-4 border border-oxford-100 rounded-lg space-y-4"
                >
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label :for="'item-name-' + index" class="block text-sm font-medium text-oxford-300">Item Name</label>
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
                      <label :for="'item-description-' + index" class="block text-sm font-medium text-oxford-300">Description</label>
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
                      <label :for="'item-quantity-' + index" class="block text-sm font-medium text-oxford-300">Quantity</label>
                      <div class="grid grid-cols-2 gap-2">
                        <input
                          :id="'item-quantity-' + index"
                          type="number"
                          v-model.number="item.quantity"
                          min="1"
                          required
                          class="input"
                          @input="calculateItemSubtotal(item)"
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
                      <label :for="'item-price-' + index" class="block text-sm font-medium text-oxford-300">Unit Price</label>
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
                          @input="calculateItemSubtotal(item)"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-if="invoice.items.length > 1" class="flex justify-end">
                    <button
                      type="button"
                      @click="removeItem(index)"
                      class="text-oxford-200 hover:text-oxford-300"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preview Section -->
          <div class="lg:sticky lg:top-6 space-y-6">
            <InvoicePreview
              :client="invoice.client"
              :items="invoice.items"
              :currency="invoice.currency"
              :tax-rate="invoice.taxRate"
              :date="invoice.date"
              :due-date="invoice.dueDate"
              :number="invoice.number"
              :subtotal="subtotal"
              :tax-amount="taxAmount"
              :total="total"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InvoicePreview from '../components/InvoicePreview.vue'

const router = useRouter()

const invoice = ref({
  client: {
    name: '',
    email: '',
    address: ''
  },
  items: [
    {
      name: '',
      description: '',
      quantity: 1,
      unit: 'pcs',
      price: 0,
      customUnit: ''
    }
  ],
  currency: {
    code: 'USD',
    symbol: '$'
  },
  taxRate: 0,
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
  number: 'INV-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')
})

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' }
]

const commonUnits = [
  { value: 'pcs', label: 'Pieces' },
  { value: 'hrs', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'custom', label: 'Custom' }
]

function addItem() {
  invoice.value.items.push({
    name: '',
    description: '',
    quantity: 1,
    unit: 'pcs',
    price: 0,
    customUnit: ''
  })
}

function removeItem(index) {
  invoice.value.items.splice(index, 1)
}

function calculateItemSubtotal(item) {
  return item.quantity * item.price
}

const subtotal = computed(() => {
  return invoice.value.items.reduce((total, item) => total + calculateItemSubtotal(item), 0)
})

const taxAmount = computed(() => {
  return subtotal.value * (invoice.value.taxRate / 100)
})

const total = computed(() => {
  return subtotal.value + taxAmount.value
})

function formatCurrency(amount) {
  return `${invoice.value.currency.symbol}${amount.toFixed(2)}`
}

async function handleSubmit() {
  // TODO: Implement invoice submission
  router.push('/invoices')
}
</script>
