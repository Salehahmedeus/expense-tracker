<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialSalary: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['update-salary']);

const salaryInput = ref(props.initialSalary);

watch(() => props.initialSalary, (newVal) => {
  salaryInput.value = newVal;
});

const handleSubmit = () => {
  emit('update-salary', salaryInput.value);
};
</script>

<template>
  <div class="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-3xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
    <h3 class="flex items-center mb-6 text-xl font-bold text-gray-800 dark:text-gray-100">
      <span class="flex items-center justify-center w-8 h-8 mr-3 text-white rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-indigo-200 dark:shadow-none">
        💰
      </span>
      Monthly Salary
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="salary" class="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Enter your monthly income</label>
        <div class="relative">
          <span class="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2">$</span>
          <input
            id="salary"
            v-model.number="salaryInput"
            type="number"
            step="0.01"
            placeholder="0.00"
            class="w-full py-3 pl-8 pr-4 transition-all bg-gray-50 border-0 rounded-2xl ring-2 ring-transparent focus:ring-indigo-500/50 focus:bg-white dark:bg-gray-900 dark:focus:bg-gray-950 dark:text-gray-100 outline-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full py-3 font-semibold text-white transition-all transform bg-indigo-600 rounded-2xl hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-200 dark:shadow-none"
      >
        Update Salary
      </button>
    </form>
  </div>
</template>
