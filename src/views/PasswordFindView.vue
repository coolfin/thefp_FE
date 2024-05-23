<template>
  <div class="flex flex-col h-screen md:flex-row">
    <FindPwBanner />
    <div class="flex flex-col items-center justify-between flex-1 py-20">
      <!-- 로고 -->
      <img
        src="/assets/logo.png"
        class="w-[180px] mx-auto mb-10 shadow-lg rounded-full"
      />

      <!-- input container -->
      <div
        class="flex flex-col items-center justify-start flex-1 pt-32 gap-y-4"
      >
        <form
          class="w-[500px] flex flex-col font-bold gap-y-4 text-theme"
          @submit.prevent="onSubmitEmail"
          v-if="store.isFoundUser"
        >
          <!-- 이름 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/input-id-icon.svg"
              alt="email-icon"
              class="mr-4"
            />
            <input
              type="text"
              class="flex-1 font-normal focus:outline-none"
              placeholder="이메일을 입력하세요."
              v-model="userEmail"
            />
          </div>

          <p v-if="errText" class="font-normal text-red-500">
            {{ errText }}
          </p>

          <button type="submit" class="py-4 text-white rounded-lg bg-theme">
            이메일 전송하기
          </button>
        </form>

        <form
          class="w-[500px] flex flex-col font-bold gap-y-4 text-theme"
          @submit.prevent="onSubmitPassword"
          v-else
        >
          <!-- 비밀번호  -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/input-pw-icon.svg"
              alt="pw-icon"
              class="mr-4"
            />
            <input
              :type="isPwVisible ? 'text' : 'password'"
              class="flex-1 font-normal focus:outline-none"
              placeholder="새 비밀번호"
              v-model="userPassword"
            />

            <!-- 비밀번호 visibility -->
            <div
              @click="handlePwVisible"
              class="flex items-center justify-center"
            >
              <img
                v-if="isPwVisible"
                src="/assets/icons/visible-off-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
              <img
                v-else
                src="/assets/icons/visible-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
            </div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/input-pw-icon.svg"
              alt="pw-icon"
              class="mr-4"
            />
            <input
              :type="isPwCheckVisible ? 'text' : 'password'"
              class="flex-1 font-normal focus:outline-none"
              placeholder="새 비밀번호 확인"
              v-model="userPasswordCheck"
            />

            <!-- 비밀번호 visibility -->
            <div
              @click="handlePwCheckVisible"
              class="flex items-center justify-center"
            >
              <img
                v-if="isPwCheckVisible"
                src="/assets/icons/visible-off-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
              <img
                v-else
                src="/assets/icons/visible-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
            </div>
          </div>
          <p v-if="errText" class="font-normal text-red-500">
            {{ errText }}
          </p>

          <button type="submit" class="py-4 text-white rounded-lg bg-theme">
            비밀번호 변경하기
          </button>
        </form>

        <div
          @click="backToLogin"
          class="flex items-center font-bold cursor-pointer text-theme underline decoration-[#294936]"
        >
          로그인으로 돌아가기
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FindPwBanner from "@/components/login/FindPwBanner.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const store = useUserStore();
const router = useRouter();

const userEmail = ref("");
const userPassword = ref("");
const userPasswordCheck = ref("");

const errText = ref("");

const backToLogin = () => {
  store.findUser = null;
  router.push({ name: "home" });
};

const onSubmitEmail = async () => {
  if (userEmail.value.trim() === "") {
    errText.value = "이메일을 입력해주세요.";
    return;
  }
  try {
    await store.findEmail(userEmail.value);
  } catch (e) {
    errText.value = "가입된 이메일이 아닙니다.";
  }
};

const onSubmitPassword = async () => {
  if (
    userPassword.value.trim() === "" ||
    userPasswordCheck.value.trim() === ""
  ) {
    errText.value = "비밀번호를 입력해주세요.";
    return;
  } else if (userPassword.value !== userPasswordCheck.value) {
    errText.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  try {
    await store.changePassword(userPassword.value);
    router.push({ name: "home" });
  } catch (e) {
    errText.value = "비밀번호 변경에 실패했습니다.";
  }
};

const isPwVisible = ref(false);
const isPwCheckVisible = ref(false);

const handlePwVisible = () => {
  isPwVisible.value = !isPwVisible.value;
};
const handlePwCheckVisible = () => {
  isPwCheckVisible.value = !isPwCheckVisible.value;
};
</script>

<style scoped></style>
