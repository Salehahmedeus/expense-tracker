<script setup>
import { useExpenses } from './composables/useExpenses';
import StatsCard from './components/StatsCard.vue';
import ExpenseForm from './components/ExpenseForm.vue';
import HistoryList from './components/HistoryList.vue';

// Use the logic composable
const { 
  expenses, 
  addExpense, 
  removeExpense, 
  totalSpent, 
  transactionCount 
} = useExpenses();
</script>

<template>
  <div class="min-h-screen p-8 font-sans text-gray-800 bg-gray-100">
    <div class="max-w-4xl mx-auto">
      
      <!-- Header -->
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-indigo-600">Monthly Tracker</h1>
        <p class="text-gray-500">Clean Architecture | Local Storage</p>
      </header>

      <!-- Stats Area -->
      <div class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
        <StatsCard title="Total Spent" :value="totalSpent" color="indigo" />
        <StatsCard title="Transactions" :value="transactionCount" color="green" />
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        
        <!-- Left: Form -->
        <div class="md:col-span-1">
          <ExpenseForm @add-transaction="addExpense" />
        </div>

        <!-- Right: List -->
        <div class="md:col-span-2">
          <HistoryList 
            :expenses="expenses" 
            @delete-transaction="removeExpense" 
          />
        </div>

      </div>
    </div>
  </div>
</template>