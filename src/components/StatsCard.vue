<script setup>
defineProps({
  title: String,
  value: [String, Number],
  color: String // 'indigo' or 'green'
});
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md border-l-4" 
       :class="color === 'green' ? 'border-green-500' : 'border-indigo-500'">
    <h2 class="text-sm font-semibold text-gray-500 uppercase">{{ title }}</h2>
    <p class="text-3xl font-bold text-gray-800">
      <span v-if="title.includes('Spent')">$</span>{{ value }}
    </p>
  </div>
</template>