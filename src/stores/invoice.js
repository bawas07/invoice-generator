import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [],
    nextId: 1
  }),
  
  actions: {
    addInvoice(invoice) {
      const newInvoice = {
        ...invoice,
        id: this.nextId++,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
      this.invoices.push(newInvoice)
      return newInvoice
    },
    
    updateInvoice(id, updates) {
      const index = this.invoices.findIndex(inv => inv.id === id)
      if (index !== -1) {
        this.invoices[index] = { ...this.invoices[index], ...updates }
      }
    },
    
    deleteInvoice(id) {
      const index = this.invoices.findIndex(inv => inv.id === id)
      if (index !== -1) {
        this.invoices.splice(index, 1)
      }
    }
  },
  
  getters: {
    getInvoiceById: (state) => (id) => {
      return state.invoices.find(inv => inv.id === id)
    },
    totalInvoices: (state) => state.invoices.length
  }
})
