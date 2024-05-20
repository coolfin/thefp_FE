<template>
  <button class="px-6 py-2 text-xs font-bold text-white rounded-full bg-theme">
    {{ tag }}
  </button>
</template>
<script setup>
defineProps({
  tag: String,
});
</script>
<style scoped></style>
