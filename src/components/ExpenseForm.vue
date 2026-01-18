<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-transaction']);

const form = ref({
  desc: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().substr(0, 10)
});

const handleSubmit = () => {
  if (!form.value.desc || !form.value.amount) return;

  emit('add-transaction', {
    desc: form.value.desc,
    amount: parseFloat(form.value.amount),
    category: form.value.category,
    date: form.value.date
  });

  // Reset fields
  form.value.desc = '';
  form.value.amount = '';
};
</script>

<template>
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md h-fit">
    <h3 class="mb-4 text-xl font-bold dark:text-gray-100">Add Expense</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <input v-model="form.desc" type="text" placeholder="e.g. Tacos" class="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount ($)</label>
        <input v-model="form.amount" type="number" step="0.01" placeholder="0.00" class="w-full p-2 mt-1 border rounded focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
        <select v-model="form.category" class="w-full p-2 mt-1 border rounded bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          <option>Food</option>
          <option>Rent</option>
          <option>Transport</option>
          <option>Entertainment</option>
          <option>Utilities</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
        <input v-model="form.date" type="date" class="w-full p-2 mt-1 border rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700" />
      </div>

      <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition cursor-pointer dark:bg-indigo-700 dark:hover:bg-indigo-800">
        Add Transaction
      </button>
    </form>
  </div>
</template>