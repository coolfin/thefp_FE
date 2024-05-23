<template>
  <div class="flex py-4">
    <img
      src="/assets/icons/profile-icon.svg"
      alt="user-icon"
      class="w-20 h-20 mr-2"
    />

    <div class="flex flex-col flex-1">
      <h3>{{ comment.nickname }}</h3>
      <div
        class="flex items-center flex-1 bg-[#ccc] px-6 py-3 rounded-full w-fit"
      >
        {{ comment.content }}
      </div>
    </div>

    <div>
      <span class="text-[#ccc] text-sm"> {{ convertToDate }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  comment: Object,
});

const convertToDate = computed(() => {
  const date = new Date(props.comment.created_at);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
});
</script>

<style scoped></style>
