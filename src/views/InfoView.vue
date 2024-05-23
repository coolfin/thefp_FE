<template>
  <div class="px-4 py-10 mx-auto md:w-3/5 md:px-0">
    <!-- 추천 금융상품 -->
    <BestFinancialProducts />

    <!-- 금융상품 테이블 -->
    <FinancialProducts />
  </div>
</template>
<script setup>
import BestFinancialProducts from "@/components/info/BestFinancialProducts.vue";
import FinancialProducts from "@/components/info/FinancialProducts.vue";
import { useFpStore } from "@/stores/fp";
import { onMounted } from "vue";

const store = useFpStore();

onMounted(() => {
  store.fetchAllProducts();
});
</script>
<style scoped></style>
