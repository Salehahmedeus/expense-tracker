<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

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

  return {
    primary: getVar('--color-primary', '#4f46e5'),
    surface: getVar('--color-card', '#ffffff'),
    text: getVar('--color-foreground', '#0f172a'),
    muted: getVar('--color-muted-foreground', '#94a3b8'),
    grid: getVar('--color-border', 'rgba(226,232,240,0.4)'),
  };
});

const chartData = computed(() => {
  if (!props.expenses.length) {
    return { labels: [], datasets: [] };
  }

  // Aggregate by day and fill missing dates so the line clearly shows daily spend
  const totalsByDate = props.expenses.reduce((acc, expense) => {
    const rawDate = expense.date || new Date(expense.id || Date.now()).toISOString().slice(0, 10);
    const dateKey = new Date(`${rawDate}T00:00:00`).toISOString().slice(0, 10);
    acc[dateKey] = (acc[dateKey] || 0) + (expense.amount || 0);
    return acc;
  }, {});

  const sortedKeys = Object.keys(totalsByDate).sort();
  const start = new Date(`${sortedKeys[0]}T00:00:00`);
  const end = new Date(`${sortedKeys[sortedKeys.length - 1]}T00:00:00`);

  const labels = [];
  const values = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    labels.push(key);
    const val = totalsByDate[key] || 0;
    values.push(Number(val.toFixed(2)));
  }

  return {
    labels,
    datasets: [
      {
        label: 'Total Spent',
        data: values,
        borderColor: chartColors.value.primary,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 280);
          gradient.addColorStop(0, `${chartColors.value.primary}33`);
          gradient.addColorStop(1, `${chartColors.value.primary}05`);
          return gradient;
        },
        fill: true,
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: chartColors.value.surface,
        pointBorderColor: chartColors.value.primary,
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
      mode: 'index',
      intersect: false,
      backgroundColor: chartColors.value.text,
      titleColor: chartColors.value.surface,
      bodyColor: chartColors.value.surface,
      borderColor: chartColors.value.grid,
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx) => `$${ctx.parsed.y.toFixed(2)}`,
      },
    },
  },
  scales: {
    x: {
      ticks: { color: chartColors.value.muted },
      grid: { color: chartColors.value.grid },
    },
    y: {
      ticks: {
        color: chartColors.value.muted,
        callback: (val) => `$${val}`,
      },
      grid: { color: chartColors.value.grid },
    },
  },
  interaction: { intersect: false, mode: 'index' },
  animation: { duration: 500 },
}));
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm h-full flex flex-col">
    <div class="p-4 pb-2 flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-muted-foreground">Spending Trend</p>
        <h3 class="text-xl font-semibold">Total Spent Over Time</h3>
      </div>
      <span class="text-xs rounded-full px-3 py-1 bg-primary/10 text-primary font-semibold uppercase">Line</span>
    </div>
    <div class="p-4 pt-0 flex-1">
      <Line
        v-if="chartData.labels.length"
        :data="chartData"
        :options="chartOptions"
        :key="isDark ? 'line-dark' : 'line-light'"
        class="h-72"
      />
      <div v-else class="h-72 flex items-center justify-center text-muted-foreground text-sm">
        Add expenses to see the spending curve.
      </div>
    </div>
  </div>
</template>
