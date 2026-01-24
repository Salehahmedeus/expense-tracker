import { ref, computed, watch, onMounted } from 'vue';
import { storageRepository } from '../repositories/storageRepository';

export function useExpenses() {
  // State
  const expenses = ref([]);
  const salary = ref(0);

  // Actions
  const loadExpenses = () => {
    expenses.value = storageRepository.load();
  };

  const loadSalary = () => {
    salary.value = storageRepository.loadSalary();
  };

  const addExpense = (expenseData) => {
    expenses.value.unshift({
      id: Date.now(),
      ...expenseData
    });
    salary.value -= expenseData.amount;
  };

  const removeExpense = (id) => {
    const expense = expenses.value.find(e => e.id === id);
    if (expense) {
      salary.value += expense.amount;
      expenses.value = expenses.value.filter(e => e.id !== id);
    }
  };

  const setSalary = (val) => {
    salary.value = parseFloat(val) || 0;
  };

  // Computed Logic
  const totalSpent = computed(() => {
    return expenses.value
      .reduce((acc, curr) => acc + curr.amount, 0)
      .toFixed(2);
  });

  const transactionCount = computed(() => expenses.value.length);

  const remainingBudget = computed(() => {
    return salary.value.toFixed(2);
  });

  // Persistence Watcher
  watch(expenses, (newVal) => {
    storageRepository.save(newVal);
  }, { deep: true });

  watch(salary, (newVal) => {
    storageRepository.saveSalary(newVal);
  });

  // Initial Load
  onMounted(() => {
    loadExpenses();
    loadSalary();
  });

  return {
    expenses,
    salary,
    addExpense,
    removeExpense,
    setSalary,
    totalSpent,
    transactionCount,
    remainingBudget
  };
}