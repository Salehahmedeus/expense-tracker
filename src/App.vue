
<script setup>
import { ref, onMounted } from 'vue';
import { useExpenses } from './composables/useExpenses';
import StatsCard from './components/StatsCard.vue';
import ExpenseForm from './components/ExpenseForm.vue';
import HistoryList from './components/HistoryList.vue';
import TotalSpentChart from './components/charts/TotalSpentChart.vue';
import TransactionsChart from './components/charts/TransactionsChart.vue';

// Use the logic composable
const { 
  expenses, 
  addExpense, 
  removeExpense, 
  totalSpent, 
  transactionCount 
} = useExpenses();

const isDark = ref(false);
const setDarkClass = (val) => {
  if (val) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
const toggleDark = () => {
  isDark.value = !isDark.value;
  setDarkClass(isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};
onMounted(() => {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const docHasDark = document.documentElement.classList.contains('dark');
  const initialDark = docHasDark || theme === 'dark' || (!theme && prefersDark);
  isDark.value = initialDark;
  setDarkClass(initialDark);
});
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 font-sans text-gray-800 bg-gradient-to-br from-indigo-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 transition-colors duration-300">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <header class="mb-10 text-center relative">
        <button
          type="button"
          role="switch"
          :aria-pressed="isDark"
          @click="toggleDark"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="absolute right-1.5 top-1.5 md:right-4 md:top-4 inline-flex items-center justify-center h-11 w-11 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:scale-110 transition-transform cursor-pointer pointer-events-auto z-20 focus:outline-none focus:ring-2 focus:ring-primary/60"
        >
          <span class="text-xl leading-none" aria-hidden="true">{{ isDark ? '☀️' : '🌙' }}</span>
        </button>
        <h1 class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500 dark:from-indigo-300 dark:to-green-200 drop-shadow-lg mb-2">Monthly Tracker</h1>
        <p class="text-lg text-gray-500 dark:text-gray-300 tracking-wide">Clean Architecture <span class="mx-2">|</span> Local Storage</p>
      </header>

      <!-- Stats Area -->
      <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
        <StatsCard title="Total Spent" :value="totalSpent" color="indigo" />
        <StatsCard title="Transactions" :value="transactionCount" color="green" />
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
        <TotalSpentChart :expenses="expenses" :is-dark="isDark" />
        <TransactionsChart :expenses="expenses" :is-dark="isDark" />
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
      <footer class="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {{ new Date().getFullYear() }} Expense Tracker. All rights reserved.
      </footer>
    </div>
  </div>
</template>