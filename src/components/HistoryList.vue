<script setup>
defineProps({
  expenses: Array
});

const emit = defineEmits(['delete-transaction']);
</script>

<template>
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <h3 class="mb-4 text-xl font-bold dark:text-gray-100">History</h3>
    
    <div v-if="expenses.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-10">
      No expenses yet. Start adding!
    </div>

    <ul class="space-y-3">
      <li v-for="expense in expenses" :key="expense.id" class="flex items-center justify-between p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">
        <div>
          <p class="font-bold text-gray-800 dark:text-gray-100">{{ expense.desc }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            <span class="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mr-2">{{ expense.category }}</span>
            {{ expense.date }}
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