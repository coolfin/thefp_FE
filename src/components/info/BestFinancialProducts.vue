<template>
  <div class="my-20">
    <h1 class="text-3xl font-bold">THE FP 추천 금융상품</h1>

    <!-- wrapper -->
    <div
      class="flex justify-between flex-col gap-y-8 py-8 md:flex-row md:gap-y-0 items-center gap-x-12"
    >
      <RecommendItem
        v-for="product in store.recommendProducts"
        :key="product.fin_prdt_nm"
        :product="product"
      />
    </div>
  </div>
</template>
<script setup>
import RecommendItem from '@/components/info/RecommendItem.vue';
import { useFpStore } from '@/stores/fp';
import { onMounted } from 'vue';

const store = useFpStore();

onMounted(() => {
  store.getRecommendProducts();
});
</script>
<style scoped></style>
