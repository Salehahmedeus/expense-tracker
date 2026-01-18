<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const props = defineProps({
  expenses: { type: Array, default: () => [] },
  isDark: { type: Boolean, default: false },
});

const chartColors = computed(() => {
  const style = getComputedStyle(document.documentElement);
  props.isDark; // triggers recompute on theme toggle
  const normalizeColor = (value, fallback) => {
    const cleaned = value?.trim();
    if (!cleaned) return fallback;
    return /oklch/i.test(cleaned) ? fallback : cleaned;
  };

  const getVar = (name, fallback) => normalizeColor(style.getPropertyValue(name), fallback);

  const palette = [
    getVar('--color-chart-1', '#f97316'),
    getVar('--color-chart-2', '#06b6d4'),
    getVar('--color-chart-3', '#6366f1'),
    getVar('--color-chart-4', '#84cc16'),
    getVar('--color-chart-5', '#f59e0b'),
  ];

  return {
    palette,
    text: getVar('--color-foreground', '#0f172a'),
    muted: getVar('--color-muted-foreground', '#94a3b8'),
    grid: getVar('--color-border', 'rgba(226,232,240,0.4)'),
  };
});

const chartData = computed(() => {
  const countsByCategory = props.expenses.reduce((acc, expense) => {
    const key = expense.category || 'Other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(countsByCategory);
  const values = labels.map((label) => countsByCategory[label]);

  return {
    labels,
    datasets: [
      {
        label: 'Transactions',
        data: values,
        backgroundColor: chartColors.value.palette.slice(0, labels.length || 1),
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: chartColors.value.text,
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: chartColors.value.grid,
      borderWidth: 1,
      padding: 10,
    },
  },
  scales: {
    x: {
      ticks: { color: chartColors.value.muted },
      grid: { display: false },
    },
    y: {
      ticks: { color: chartColors.value.muted, stepSize: 1 },
      grid: { color: chartColors.value.grid },
      beginAtZero: true,
      precision: 0,
    },
  },
  animation: { duration: 500 },
}));
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm h-full flex flex-col">
    <div class="p-4 pb-2 flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">Activity Mix</p>
        <h3 class="text-xl font-semibold">Transactions by Category</h3>
      </div>
      <span class="text-xs rounded-full px-3 py-1 bg-primary/10 text-primary font-semibold uppercase">Bar</span>
    </div>
    <div class="p-4 pt-0 flex-1">
      <Bar
        v-if="chartData.labels.length"
        :data="chartData"
        :options="chartOptions"
        :key="isDark ? 'bar-dark' : 'bar-light'"
        class="h-72"
      />
      <div v-else class="h-72 flex items-center justify-center text-muted-foreground text-sm">
        Categories will appear as you add expenses.
      </div>
    </div>
  </div>
</template>
