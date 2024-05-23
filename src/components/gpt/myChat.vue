<template>
  <div class="flex justify-end w-full mb-4 gap-x-2" ref="container">
    <div
      class="py-2 px-4 text-sm text-white rounded-lg max-w-full bg-[#3e6259]"
    >
      {{ text }}
    </div>
    <div
      class="w-10 h-10 overflow-hidden border-2 rounded-full bg-[#3e6259] border-[#3e6259] shrink-0"
    >
      <img
        src="/assets/icons/person.svg"
        alt="gpt-chatbot-icon"
        class="object-cover w-[100%] h-[100%]"
      />
    </div>
  </div>
</template>

<script setup>
import { useGptStore } from "@/stores/gpt";
import { watch, ref } from "vue";

const container = ref(null);
const store = useGptStore();

watch(store.getChat, () => {
  container.value.scrollIntoView({ behavior: "smooth" }, false);
});

defineProps({
  text: String,
  item: Object,
});
</script>

<style scoped></style>
