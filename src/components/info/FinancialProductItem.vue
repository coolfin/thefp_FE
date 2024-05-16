<template>
  <div class="relative">
    <div
      v-if="item === 2"
      class="absolute top-0 left-0 z-10 w-full h-full bg-opacity-80 bg-[#333] flex items-center justify-center rounded-lg"
    >
      <span class="text-2xl font-bold text-[#AEF6C7]">종료된 상품입니다.</span>
    </div>
    <div
      @click="clickFinancialProduct"
      class="flex items-center px-2 py-4 hover:bg-[#eee] rounded-lg cursor-pointer transition duration-300 ease-in-out"
    >
      <div class="flex items-center w-2/12 gap-x-4">
        <img
          class="w-10 rounded-lg"
          src="@/assets/icons/banks/nh-logo.svg"
          alt="농협은행"
        />
        <span>농협은행</span>
      </div>

      <div class="w-1/12">
        <div
          class="px-3 py-1 text-sm border rounded-full text-theme border-theme w-fit"
        >
          적금
        </div>
      </div>

      <div class="w-3/12 truncate">상품명입니다</div>

      <div class="flex-1">2.1%</div>
    </div>
  </div>
</template>

<script setup>
const clickFinancialProduct = () => {
  alert("죄송합니다. 상품 상세 페이지는 준비 중입니다.🤐");
};

defineProps({
  item: Object,
});
</script>

<style scoped></style>
