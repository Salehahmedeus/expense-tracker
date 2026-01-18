
<script setup>
import { ref, onMounted } from 'vue';
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

const isDark = ref(false);
const toggleDark = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};
onMounted(() => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 font-sans text-gray-800 bg-gradient-to-br from-indigo-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 transition-colors duration-300">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-10 text-center relative">
        <button @click="toggleDark" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="absolute right-0 top-0 md:right-4 md:top-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full p-2 shadow hover:scale-110 transition-transform">
          <span v-if="!isDark">🌙</span>
          <span v-else>☀️</span>
        </button>
        <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500 dark:from-indigo-300 dark:to-green-200 drop-shadow-lg mb-2">Monthly Tracker</h1>
        <p class="text-lg text-gray-500 dark:text-gray-300 tracking-wide">Clean Architecture <span class="mx-2">|</span> Local Storage</p>
      </header>

      <!-- Stats Area -->
      <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
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
      <footer class="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {{ new Date().getFullYear() }} Expense Tracker. All rights reserved.
      </footer>
    </div>
  </div>
</template>