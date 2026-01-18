<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-transaction']);

const categories = [
  { value: 'Food', label: 'Food', icon: '🍽️' },
  { value: 'Groceries', label: 'Groceries', icon: '🛒' },
  { value: 'Rent', label: 'Rent', icon: '🏠' },
  { value: 'Transport', label: 'Transport', icon: '🚌' },
  { value: 'Entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'Utilities', label: 'Utilities', icon: '💡' },
  { value: 'Health', label: 'Health', icon: '💊' },
  { value: 'Travel', label: 'Travel', icon: '✈️' },
  { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'Education', label: 'Education', icon: '📚' },
  { value: 'Gifts', label: 'Gifts', icon: '🎁' },
  { value: 'Savings', label: 'Savings', icon: '💰' },
  { value: 'Other', label: 'Other', icon: '🧾' },
];

const form = ref({
  desc: '',
  amount: '',
  category: categories[0].value,
  date: new Date().toISOString().substr(0, 10)
});

const openCategory = ref(false);

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
  form.value.category = categories[0].value;
};
</script>

<template>
  <div class="p-6 rounded-xl border bg-card text-card-foreground shadow-sm h-fit">
    <h3 class="mb-4 text-xl font-semibold">Add Expense</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-muted-foreground">Description</label>
        <input
          v-model="form.desc"
          type="text"
          placeholder="e.g. Tacos"
          class="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-muted-foreground">Amount ($)</label>
        <input
          v-model="form.amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          class="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-muted-foreground">Category</label>
        <div class="relative mt-2">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary"
            @click="openCategory = !openCategory"
          >
            <span class="flex items-center gap-2">
              <span>{{ categories.find(c => c.value === form.category)?.icon }}</span>
              <span>{{ categories.find(c => c.value === form.category)?.label }}</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 text-muted-foreground">
              <path fill-rule="evenodd" d="M12 14.5a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L12 12.086l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 12 14.5Z" clip-rule="evenodd" />
            </svg>
          </button>
          <div
            v-if="openCategory"
            class="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
          >
            <ul class="max-h-64 overflow-y-auto divide-y divide-border">
              <li
                v-for="cat in categories"
                :key="cat.value"
                class="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
                @click="form.category = cat.value; openCategory = false;"
              >
                <span>{{ cat.icon }}</span>
                <span>{{ cat.label }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-muted-foreground">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="mt-2 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        class="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
      >
        Add Transaction
      </button>
    </form>
  </div>
</template>