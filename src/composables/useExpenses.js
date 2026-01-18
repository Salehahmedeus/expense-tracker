import { ref, computed, watch, onMounted } from 'vue';
import { storageRepository } from '../repositories/storageRepository';

export function useExpenses() {
  // State
  const expenses = ref([]);

  // Actions
  const loadExpenses = () => {
    expenses.value = storageRepository.load();
  };

  const addExpense = (expenseData) => {
    expenses.value.unshift({
      id: Date.now(),
      ...expenseData
    });
  };

  const removeExpense = (id) => {
    expenses.value = expenses.value.filter(e => e.id !== id);
  };

  // Computed Logic
  const totalSpent = computed(() => {
    return expenses.value
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toFixed(2);
  });

  const transactionCount = computed(() => expenses.value.length);

  // Persistence Watcher
  watch(expenses, (newVal) => {
    storageRepository.save(newVal);
  }, { deep: true });

  // Initial Load
  onMounted(() => {
    loadExpenses();
  });

  return {
    expenses,
    addExpense,
    removeExpense,
    totalSpent,
    transactionCount
  };
}