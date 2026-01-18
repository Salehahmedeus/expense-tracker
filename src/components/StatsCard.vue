<script setup>
defineProps({
  title: String,
  value: [String, Number],
  color: String // 'indigo' or 'green'
});
</script>

<template>
  <div class="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border-l-4" 
       :class="color === 'green' ? 'border-green-500 dark:border-green-400' : 'border-indigo-500 dark:border-indigo-300'">
    <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase">{{ title }}</h2>
    <p class="text-3xl font-bold text-gray-800 dark:text-gray-100">
      <span v-if="title.includes('Spent')">$</span>{{ value }}
    </p>
  </div>
</template>