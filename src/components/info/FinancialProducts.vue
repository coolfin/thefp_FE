<template>
  <div>
    <!-- header -->
    <div class="flex items-center px-2 py-4 font-bold">
      <span class="w-2/12"> 금융회사 </span>

      <span class="w-1/12">타입</span>

      <span class="w-3/12">상품명</span>

      <span class="flex flex-1 text-start">
        <span class="w-1/3">금리</span>
        <span class="flex-1">저축기간</span>
      </span>
    </div>

    <!-- data -->
    <div class="flex flex-col h-[500px] overflow-y-scroll gap-y-1">
      <FinancialProductItem
        v-for="item in store.products.display"
        :key="item"
        :item="item"
      />
    </div>
  </div>
</template>
<script setup>
import FinancialProductItem from "@/components/info/FinancialProductItem.vue";
import { useFpStore } from "@/stores/fp";

const store = useFpStore();
</script>
<style scoped></style>
