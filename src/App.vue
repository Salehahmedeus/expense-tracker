<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// --- STATE ---
const expenses = ref([])

const form = ref({
  desc: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().substr(0, 10)
})

// --- LOGIC ---

// 1. Add Expense
const addExpense = () => {
  if (!form.value.desc || !form.value.amount) return alert('Please fill in fields')
  
  expenses.value.unshift({
    id: Date.now(),
    desc: form.value.desc,
    amount: parseFloat(form.value.amount),
    category: form.value.category,
    date: form.value.date
  })

  // Reset form but keep date
  form.value.desc = ''
  form.value.amount = ''
}

// 2. Delete Expense
const removeExpense = (id) => {
  expenses.value = expenses.value.filter(e => e.id !== id)
}

// 3. Computed Totals
const totalSpent = computed(() => {
  return expenses.value.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)
})

const transactionCount = computed(() => expenses.value.length)

// 4. Persistence (LocalStorage)
// Load data when app starts
onMounted(() => {
  const saved = localStorage.getItem('my-expenses')
  if (saved) {
    expenses.value = JSON.parse(saved)
  }
})

// Watch for changes and save automatically
watch(expenses, (newVal) => {
  localStorage.setItem('my-expenses', JSON.stringify(newVal))
}, { deep: true })

</script>

<template>
  <div class="min-h-screen p-8 font-sans text-gray-800">
    <div class="max-w-4xl mx-auto">
      
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-indigo-600">Monthly Tracker</h1>
        <p class="text-gray-500">No Backend | Local Storage</p>
      </header>

      <!-- Dashboard Stats Cards -->
      <div class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
        <div class="p-6 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
          <h2 class="text-sm font-semibold text-gray-500 uppercase">Total Spent</h2>
          <p class="text-3xl font-bold text-gray-800">${{ totalSpent }}</p>
        </div>
        <div class="p-6 bg-white rounded-lg shadow-md border-l-4 border-green-500">
          <h2 class="text-sm font-semibold text-gray-500 uppercase">Transactions</h2>
          <p class="text-3xl font-bold text-gray-800">{{ transactionCount }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        <!-- Left Col: Add Form -->
        <div class="md:col-span-1">
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h3 class="mb-4 text-xl font-bold">Add Expense</h3>
            <form @submit.prevent="addExpense" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <input v-model="form.desc" type="text" placeholder="e.g. Tacos" class="w-full p-2 mt-1 border rounded focus:ring-indigo-500 focus:border-indigo-500" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input v-model="form.amount" type="number" step="0.01" placeholder="0.00" class="w-full p-2 mt-1 border rounded focus:ring-indigo-500 focus:border-indigo-500" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <select v-model="form.category" class="w-full p-2 mt-1 border rounded bg-white">
                  <option>Food</option>
                  <option>Rent</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Utilities</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Date</label>
                <input v-model="form.date" type="date" class="w-full p-2 mt-1 border rounded" />
              </div>

              <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition">
                Add Transaction
              </button>
            </form>
          </div>
        </div>

        <!-- Right Col: History List -->
        <div class="md:col-span-2">
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h3 class="mb-4 text-xl font-bold">History</h3>
            
            <div v-if="expenses.length === 0" class="text-center text-gray-400 py-10">
              No expenses yet. Start adding!
            </div>

            <ul class="space-y-3">
              <li v-for="expense in expenses" :key="expense.id" class="flex items-center justify-between p-3 border-b hover:bg-gray-50 transition">
                <div>
                  <p class="font-bold text-gray-800">{{ expense.desc }}</p>
                  <p class="text-xs text-gray-500">
                    <span class="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 mr-2">{{ expense.category }}</span>
                    {{ expense.date }}
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <span class="font-bold text-red-500">-${{ expense.amount.toFixed(2) }}</span>
                  <button @click="removeExpense(expense.id)" class="text-gray-400 hover:text-red-600">
                    &times;
                  </button>
                </div>
              </li>
            </ul>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>