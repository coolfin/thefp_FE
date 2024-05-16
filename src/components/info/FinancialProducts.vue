<template>
  <div>
    <!-- header -->
    <div class="flex items-center px-2 py-4 font-bold">
      <span class="w-2/12"> 금융회사 </span>

      <span class="w-1/12">타입</span>

      <span class="w-3/12">상품명</span>

      <span class="flex-1 text-start">금리</span>
    </div>

    <!-- data -->
    <div class="flex flex-col gap-y-1">
      <FinancialProductItem v-for="item in 3" :key="item" :item="item" />
    </div>
  </div>
</template>
<script setup>
import FinancialProductItem from "@/components/info/FinancialProductItem.vue";
</script>
<style scoped></style>
