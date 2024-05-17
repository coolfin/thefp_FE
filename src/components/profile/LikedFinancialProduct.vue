<template>
  <div class="h-[80px] flex items-center shrink-0 justify-center w-full px-2">
    <!-- 은행명 -->
    <div class="flex items-center gap-x-2">
      <img
        src="@/assets/icons/banks/shinhan-logo.svg"
        alt="shinhan-logo"
        class="w-8 h-8"
      />
      <span>신한은행</span>
    </div>

    <!-- 상품명 -->
    <div class="flex-1 px-8 truncate">
      청년들의 자산형성 지원을 위해 신한은행, ‘신한 청년도약플러스적금’ 신상품
      출시
    </div>

    <!-- 삭제버튼 -->
    <div
      @click="deleteLikedProduct"
      class="bg-[#212922] cursor-pointer flex items-center text-white text-sm px-4 py-1 rounded-md"
    >
      삭제
    </div>
  </div>
</template>
<script setup>
const deleteLikedProduct = () => {
  console.log('준비 중 입니다.');
};
</script>
<style scoped></style>
