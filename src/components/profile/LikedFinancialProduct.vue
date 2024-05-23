<template>
  <div class="h-[80px] flex items-center shrink-0 justify-center w-full px-2">
    <!-- 은행명 -->
    <div class="flex items-center w-1/4 gap-x-2">
      <img
        src="/assets/icons/banks/shinhan-logo.svg"
        alt="shinhan-logo"
        class="w-8 h-8"
      />
      <span>{{ props.item.kor_co_nm }}</span>
    </div>

    <!-- 상품명 -->
    <div class="flex-1 px-8 truncate">
      {{ props.item.fin_prdt_nm }}
    </div>

    <!-- 삭제버튼 -->
    <div
      @click="delProduct"
      class="bg-[#212922] cursor-pointer flex items-center text-white text-sm px-4 py-1 rounded-md"
    >
      삭제
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const props = defineProps({
  item: Object,
});

const delProduct = () => {
  userStore.delLikedProduct(props.item.id);
};
</script>
<style scoped></style>
