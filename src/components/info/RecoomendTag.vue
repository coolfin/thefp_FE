<template>
  <button
    class="px-2 py-2 text-xs font-bold text-white rounded-full 2xl:px-6 2xl:text-xs bg-theme"
  >
    {{ tag }}
  </button>
</template>
<script setup>
defineProps({
  tag: String,
});
</script>
<style scoped></style>
