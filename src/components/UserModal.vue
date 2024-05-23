<template>
  <div class="absolute z-10 bg-white top-12">
    <div class="shadow-lg rounded-md py-2 px-6 w-[200px]">
      <!-- 정보 -->
      <div class="border-b border-[#ccc] pb-2">
        <h1 class="font-bold">{{ store.getLoginUser.user.nickname }}</h1>
        <p>{{ store.getLoginUser.user.email }}</p>
      </div>

      <!-- 바로가기 -->
      <div class="flex flex-col pt-2 gap-y-1">
        <h1 class="font-bold">바로가기</h1>

        <!-- 내 프로필 -->
        <div
          @click="moveProfile"
          class="flex items-center gap-x-2 p-1 hover:bg-[#eee] cursor-pointer rounded-md"
        >
          <img
            class="w-4 h-4"
            src="/assets/icons/profile-modal-icon.svg"
            alt="profile-modal-icon"
          />
          <span class="text-sm">내 프로필</span>
        </div>

        <!-- 로그아웃 -->
        <div
          @click="logout"
          class="flex items-center gap-x-2 p-1 hover:bg-[#eee] cursor-pointer rounded-md"
        >
          <img
            src="/assets/icons/logout-modal-icon.svg"
            class="w-4 h-4"
            alt="logout-icon"
          />
          <span class="text-sm">로그아웃</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const props = defineProps({
  changeIsModalOpen: Function,
});

const router = useRouter();
const store = useUserStore();

const moveProfile = () => {
  props.changeIsModalOpen();
  router.push({ name: "profile" });
};

const logout = () => {
  store.logout();
  props.changeIsModalOpen();
  router.push({ name: "home" });
};
</script>
<style scoped></style>
