<template>
  <div
    @click="clickRecommendProduct"
    class="w-full flex-1 hover:bg-[#eee] p-4 rounded-lg transition duration-300 ease-in-out cursor-pointer"
  >
    <div class="flex justify-between items-center gap-x-8 py-4">
      <!-- 이미지 -->
      <div class="flex items-center justify-center rounded-lg">
        <img
          class="md:w-20 md:h-20 w-16 h-16"
          src="@/assets/icons/banks/woori-logo.svg"
          alt="bank"
        />
      </div>

      <!-- 텍스트 -->
      <div class="flex-1 flex flex-col gap-y-1">
        <!-- 은행명 -->
        <h1 class="text-xl font-bold">{{ product.kor_co_nm }}</h1>

        <!-- 상품명 -->
        <div class="font-bold truncate">{{ product.fin_prdt_nm }}</div>

        <!-- 태그 -->
        <div class="flex gap-x-4">
          <RecoomendTag v-for="tag in 2" :key="tag" :tag="tag" />
        </div>
      </div>
    </div>

    <!-- 멘트 -->
    <div class="font-bold py-2">많은 사람들이 찾았어요! 🥳</div>
  </div>
</template>
<script setup>
import RecoomendTag from '@/components/info/RecoomendTag.vue';
defineProps({
  product: Object,
});

const clickRecommendProduct = () => {
  alert('죄송합니다. 상품 상세 페이지는 준비 중입니다.🤐');
};
</script>
<style scoped></style>
