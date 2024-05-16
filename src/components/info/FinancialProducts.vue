<template>
  <div class="bg-red-200">
    <!-- header -->
    <div class="flex items-center px-2 py-4 font-bold">
      <span class="w-1/12"> 금융회사 </span>

      <span class="w-1/12">타입</span>

      <span class="w-3/12">상품명</span>

      <span class="flex-1">금리</span>
    </div>

    <!-- data -->
    <FinancialProductItem v-for="item in 3" :key="item" />
  </div>
</template>
<script setup>
import FinancialProductItem from "@/components/info/FinancialProductItem.vue";
</script>
<style scoped></style>
