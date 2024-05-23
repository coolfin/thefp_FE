<template>
  <div class="flex py-4">
    <img
      src="/assets/icons/profile-icon.svg"
      alt="user-icon"
      class="w-20 h-20 mr-2"
    />

    <div class="flex flex-col flex-1">
      <h3>유저명입니다</h3>
      <div
        class="flex items-center flex-1 bg-[#ccc] px-6 py-3 rounded-full w-fit"
      >
        {{ comment.content }}
      </div>
    </div>

    <div>
      <span class="text-[#ccc] text-sm">몇시 몇분 몇초</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useFpStore } from "@/stores/fp";

const store = useFpStore();
const props = defineProps({
  comment: Object,
});

onMounted(() => {
  console.log(props.comment);
});
</script>

<style scoped></style>
