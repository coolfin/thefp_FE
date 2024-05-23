<template>
  <div class="my-20">
    <h1 class="text-3xl font-bold">THE FP 추천 금융상품</h1>

    <!-- wrapper -->
    <div
      class="flex flex-col items-center justify-between py-8 gap-y-8 md:flex-row md:gap-y-0 gap-x-12"
    >
      <RecommendItem
        v-for="product in store.products.recommend"
        :key="product.fin_prdt_nm"
        :product="product"
      />
    </div>
  </div>
</template>
<script setup>
import RecommendItem from "@/components/info/RecommendItem.vue";
import { useFpStore } from "@/stores/fp";
const store = useFpStore();
</script>
<style scoped></style>
