import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import InvoiceList from '../views/InvoiceList.vue'
import CreateInvoice from '../views/CreateInvoice.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoiceList
    },
    {
      path: '/create',
      name: 'create-invoice',
      component: CreateInvoice
    }
  ]
})

export default router
