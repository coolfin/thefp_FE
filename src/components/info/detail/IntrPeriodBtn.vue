<template>
  <button
    @click="clickOption"
    class="py-4 bg-[#eee] text-[#ccc] w-[200px] text-sm font-bold"
  >
    {{ option.save_trm }}개월
  </button>
</template>

<script setup>
const props = defineProps({
  option: Object,
});

const emit = defineEmits(["click"]);

const clickOption = () => {
  emit("click", props.option);
};
</script>

<style scoped></style>
