<template>
  <button
    @click="store.changeLocation(bank)"
    class="px-8 py-2 border rounded-full text-theme border-theme shrink-0"
    :class="{
      'bg-theme text-white': store.selectedLocation.name === bank.name,
    }"
  >
    {{ bank.name }}
  </button>
</template>
<script setup>
import { useBankStore } from "@/stores/bank";

defineProps({
  bank: Object,
});

const store = useBankStore();
</script>
<style scoped></style>
