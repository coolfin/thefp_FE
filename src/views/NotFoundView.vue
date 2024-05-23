<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-theme gap-y-8"
  >
    <img src="/assets/404-banner.png" alt="404" class="w-1/4" />
    <h1 class="text-4xl font-bold">요청하신 페이지에 연결할 수 없습니다</h1>
    <div class="flex flex-col items-center justify-center">
      <p>방문하시려는 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</p>
      <p>입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
    </div>
    <button
      class="bg-theme text-white py-4 px-12 rounded-lg hover:bg-[#3e6259] transition duration-300 ease-in-out"
      @click="moveInfo"
    >
      홈으로 돌아가기
    </button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const moveInfo = () => {
  router.push("/main/info");
};
</script>
<style scoped></style>
