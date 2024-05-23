<template>
  <div>
    <nav class="flex items-center p-4 gap-x-8">
      <!-- logo -->
      <div
        class="flex items-center font-bold cursor-pointer gap-x-2"
        @click="moveInfo"
      >
        <img src="/assets/logo.png" alt="logo" class="w-8 h-8" />
        <h1>THE FP</h1>
      </div>

      <RouterLink :to="{ name: 'info' }" class="font-bold">상품정보</RouterLink>
      <RouterLink :to="{ name: 'recommend' }" class="font-bold"
        >상품추천</RouterLink
      >
      <RouterLink :to="{ name: 'exchange' }" class="font-bold">환율</RouterLink>
      <RouterLink :to="{ name: 'maps' }" class="font-bold">주변은행</RouterLink>

      <div class="relative flex items-center justify-end flex-1 pr-4 text-sm">
        <img
          @click="isModalOpen = !isModalOpen"
          src="/assets/icons/profile-icon.svg"
          alt="profile-icon"
          class="w-10 h-10 cursor-pointer"
        />
        <UserModal v-if="isModalOpen" :changeIsModalOpen="changeIsModalOpen" />
      </div>
    </nav>

    <RouterView />

    <footer class="bg-footer-texture h-[550px] mt-40 flex p-20 text-white">
      <!-- 로고 및 텍스트 -->
      <div class="flex-1">
        <div class="flex items-center mb-12 gap-x-4">
          <img src="/assets/logo.png" alt="logo" class="w-16 h-16" />
          <h1 class="text-4xl font-bold">THE FP</h1>
        </div>

        <!-- text -->
        <div class="flex flex-col gap-y-2">
          <h1 class="text-4xl font-bold">Ready for take off?</h1>
          <span>여러분의 금융여정을 함께합니다! 🚀🚀 </span>
        </div>
      </div>

      <!-- about content , github ...  -->
      <div class="flex flex-col flex-1 pl-8 gap-y-8">
        <div class="flex items-center font-bold gap-x-12">
          <a
            href="https://coolfin.notion.site/THE-FP-f96e7ef615574f12a3b8201cb0f95e0b?pvs=4"
            target="_blank"
            class="cursor-pointer"
            >About</a
          >
          <a href="mailto:contact@thefp.dev" class="cursor-pointer">Contact</a>
        </div>

        <!-- icons -->
        <div class="flex items-center gap-x-8">
          <div
            @click="moveGithub"
            class="p-1 transition duration-300 ease-in-out bg-white rounded-full cursor-pointer bg-opacity-80 hover:bg-opacity-100"
          >
            <img
              src="/assets/icons/github-logo.png"
              alt="github"
              class="w-8 h-8"
            />
          </div>
          <div
            @click="moveFigma"
            class="p-1 transition duration-300 ease-in-out bg-white rounded-full cursor-pointer bg-opacity-80 hover:bg-opacity-100"
          >
            <img
              src="/assets/icons/figma-logo.png"
              alt="instagram"
              class="w-8 h-8"
            />
          </div>
        </div>

        <div
          class="flex-1 text-xs flex text-[#d9d9d9] items-end justify-end pb-10"
        >
          Ⓒ 2024 THE FP. All rights reserved.
        </div>
      </div>
    </footer>
  </div>

  <GPTModal />
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";
import UserModal from "@/components/UserModal.vue";
import GPTModal from "@/components/gpt/GPTModal.vue";

const store = useUserStore();
const router = useRouter();

const isModalOpen = ref(false);

const moveInfo = () => {
  router.push("/main/info");
};

const moveGithub = () => {
  window.location.href = "https://github.com/coolfin/thefp_FE";
};

const moveFigma = () => {
  window.location.href =
    "https://www.figma.com/design/HGKRV1IGtHBIY2Q3r2VMkL/the-fp?node-id=0%3A1&t=D2xhlxwae9DEg7Bo-1";
};

const changeIsModalOpen = () => {
  isModalOpen.value = !isModalOpen.value;
};
</script>
<style scoped></style>
