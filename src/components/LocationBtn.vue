<template>
  <button
    @click="store.changeLocation(bank)"
    class="border text-theme border-theme py-2 px-8 rounded-full shrink-0"
    :class="{
      'bg-theme text-white': store.selectedLocation.name === bank.name,
    }"
  >
    {{ bank.name }}
  </button>
</template>
<script setup>
import { useBankStore } from '@/stores/bank';

defineProps({
  bank: Object,
});

const store = useBankStore();
</script>
<style scoped></style>
