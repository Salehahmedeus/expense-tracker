<script setup>
defineProps({
  title: String,
  value: [String, Number],
  color: String // 'indigo' or 'green'
});
</script>

<template>
  <div
    class="relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-2"
  >
    <div
      class="absolute inset-y-0 left-0 w-1.5"
      :class="color === 'green' ? 'bg-gradient-to-b from-emerald-300 to-emerald-500' : 'bg-gradient-to-b from-indigo-300 to-indigo-500'"
      aria-hidden="true"
    ></div>
    <div class="pl-3">
      <h2 class="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase">{{ title }}</h2>
      <p class="text-3xl font-extrabold leading-tight">
        <span v-if="title.includes('Spent')">$</span>{{ value }}
      </p>
    </div>
  </div>
</template>