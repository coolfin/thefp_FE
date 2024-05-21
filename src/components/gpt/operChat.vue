<template>
  <div class="flex mb-4 gap-x-2">
    <div
      class="w-10 h-10 overflow-hidden bg-white border-2 border-white rounded-full shrink-0"
    >
      <img
        src="@/assets/icons/gpt.svg"
        alt="gpt-chatbot-icon"
        class="object-cover w-[150%] h-[150%]"
      />
    </div>
    <div class="p-2 text-sm bg-white rounded-lg text-theme">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
});
</script>

<style scoped></style>
