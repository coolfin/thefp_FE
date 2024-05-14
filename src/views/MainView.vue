<template>
  <div>
    <nav class="p-4 font-bold flex items-center gap-x-8">
      <!-- logo -->
      <div
        class="flex items-center gap-x-2 font-bold cursor-pointer"
        @click="moveInfo"
      >
        <img src="../assets/logo.png" alt="logo" class="w-8 h-8" />
        <h1>THE FP</h1>
      </div>

      <RouterLink :to="{ name: 'info' }">상품정보</RouterLink>
      <RouterLink :to="{ name: 'exchange' }">환율</RouterLink>

      <div class="flex-1 text-sm flex items-center justify-end">
        <span class="font-bold">admin</span>
        님
      </div>
    </nav>

    <RouterView />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const moveInfo = () => {
  router.push('/main/info');
};
</script>
<style scoped></style>
