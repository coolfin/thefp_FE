<template>
  <div class="w-3/5 py-10 mx-auto">
    <!-- 추천 금융상품 -->
    <BestFinancialProducts />

    <!-- 금융상품 테이블 -->
    <FinancialProducts />
  </div>
</template>
<script setup>
import BestFinancialProducts from '@/components/info/BestFinancialProducts.vue';
import FinancialProducts from '@/components/info/FinancialProducts.vue';
</script>
<style scoped></style>
