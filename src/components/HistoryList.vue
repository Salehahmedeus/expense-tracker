<script setup>
import { downloadCsvFromExpenses } from '@/utils/csv';

const props = defineProps({
  expenses: Array
});

const emit = defineEmits(['delete-transaction']);

const handleExport = () => {
  if (!props.expenses?.length) return;
  downloadCsvFromExpenses(props.expenses);
};
</script>

<template>
  <div class="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
    <div class="mb-4 flex items-center justify-between gap-3">
      <h3 class="text-xl font-bold dark:text-gray-100">History</h3>
      <button
        type="button"
        class="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        @click="handleExport"
        :disabled="expenses.length === 0"
      >
        Export CSV
      </button>
    </div>
    
    <div v-if="expenses.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-10">
      No expenses yet. Start adding!
    </div>

    <ul class="space-y-3">
      <li v-for="expense in expenses" :key="expense.id" class="flex items-center justify-between p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
        <div>
          <p class="font-bold text-gray-800 dark:text-gray-100">{{ expense.desc }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mr-1">
              {{ expense.category }}
            </span>
            <span class="opacity-80">{{ expense.date }}</span>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-bold text-red-500 dark:text-red-400">-${{ expense.amount.toFixed(2) }}</span>
          <button @click="emit('delete-transaction', expense.id)" class="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 cursor-pointer">
            &times;
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>