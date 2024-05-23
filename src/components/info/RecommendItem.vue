<template>
  <div
    @click="clickRecommendProduct"
    class="w-full flex-1 hover:bg-[#eee] p-4 rounded-lg transition duration-300 ease-in-out cursor-pointer"
  >
    <div class="flex items-center justify-between py-4 gap-x-8">
      <!-- 이미지 -->
      <div class="flex items-center justify-center rounded-lg">
        <img
          class="w-16 h-16 rounded-lg md:w-20 md:h-20"
          :src="product.imgUrl"
          alt="bank"
        />
      </div>

      <!-- 텍스트 -->
      <div class="flex flex-col flex-1 gap-y-1">
        <!-- 은행명 -->
        <h1 class="text-xl font-bold">{{ product.kor_co_nm }}</h1>

        <!-- 상품명 -->
        <div class="font-bold truncate">{{ product.fin_prdt_nm }}</div>

        <!-- 태그 -->
        <div class="flex gap-x-4">
          <RecoomendTag
            v-for="tag in product.tags"
            :key="product.fin_prodt_nm + tag"
            :tag="tag"
          />
        </div>
      </div>
    </div>

    <!-- 멘트 -->
    <div class="py-2 font-bold">{{ product.text }}</div>
  </div>
</template>
<script setup>
import RecoomendTag from "@/components/info/RecoomendTag.vue";
import { useRouter } from "vue-router";
import { useFpStore } from "@/stores/fp";
const router = useRouter();
const props = defineProps({
  product: Object,
});

const store = useFpStore();
const clickRecommendProduct = async () => {
  await store.fetchDetailProduct(props.product.id);
  router.push({ name: "info-detail", params: { id: props.product.id } });
};
</script>
<style scoped></style>
