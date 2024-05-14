<template>
  <div class="flex h-screen">
    <LoginBanner />

    <!-- login -->
    <div class="flex flex-col items-center justify-between flex-1 py-20">
      <!-- logo -->
      <img
        src="@/assets/logo.png"
        class="w-[180px] mx-auto mb-10 shadow-lg rounded-full"
      />

      <!-- input container -->
      <div
        class="flex flex-col items-center justify-start flex-1 py-14 gap-y-4"
      >
        <!-- simple input -->
        <form
          @submit.prevent="onLogin"
          class="w-[500px] flex flex-col font-bold gap-y-4 text-theme"
        >
          <!-- 이메일 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="@/assets/icons/input-id-icon.svg"
              alt="id-icon"
              class="mr-4"
            />
            <input
              type="text"
              class="flex-1 font-normal focus:outline-none"
              placeholder="이메일"
              v-model="signUpId"
            />
          </div>

          <!-- 비밀번호 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="@/assets/icons/input-pw-icon.svg"
              alt="pw-icon"
              class="mr-4"
            />
            <input
              :type="isPwVisible ? 'text' : 'password'"
              class="flex-1 font-normal focus:outline-none"
              placeholder="비밀번호"
              v-model="signUpPw"
            />

            <!-- 비밀번호 visibility -->
            <div
              @click="handleVisible"
              class="flex items-center justify-center"
            >
              <img
                v-if="isPwVisible"
                src="@/assets/icons/visible-off-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
              <img
                v-else
                src="@/assets/icons/visible-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
            </div>
          </div>

          <!-- 비밀번호 확인 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="@/assets/icons/input-pw-icon.svg"
              alt="pw-icon"
              class="mr-4"
            />
            <input
              :type="isPwCheckVisible ? 'text' : 'password'"
              class="flex-1 font-normal focus:outline-none"
              placeholder="비밀번호 확인"
              v-model="signUpPwCheck"
            />

            <!-- 비밀번호 visibility -->
            <div
              @click="handleCheckVisible"
              class="flex items-center justify-center"
            >
              <img
                v-if="isPwCheckVisible"
                src="@/assets/icons/visible-off-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
              <img
                v-else
                src="@/assets/icons/visible-icon.svg"
                alt="pw-visible-icon"
                class="w-6 h-6 cursor-pointer opacity-70"
              />
            </div>
          </div>

          <p v-if="errText" class="font-normal text-red-500">
            {{ errText }}
          </p>

          <div class="text-theme">
            비밀번호를 잊으셨나요?
            <span
              class="underline decoration-[#294936] cursor-pointer"
              @click="findPw"
            >
              비밀번호 찾기
            </span>
          </div>
          <button type="submit" class="py-4 text-white rounded-lg bg-theme">
            로그인
          </button>
        </form>

        <!-- google login -->
        <form class="w-[500px]">
          <button
            type="submit"
            class="flex items-center justify-center w-full py-4 mt-4 transition-colors duration-500 ease-in-out border rounded-lg text-theme border-theme hover:bg-theme hover:text-white"
          >
            <img src="@/assets/google-logo.png" class="w-6 h-6 mr-2" />
            구글로 로그인
          </button>
        </form>
      </div>

      <div class="flex flex-col items-center justify-center font-bold">
        <p>아직 계정이 없으세요?</p>
        <RouterLink
          :to="{ name: 'signup' }"
          class="underline decoration-[#294936] text-theme cursor-pointer"
          >회원가입</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginBanner from "@/components/login/LoginBanner.vue";
import { ref } from "vue";

const signUpId = ref("");
const signUpPw = ref("");
const signUpPwCheck = ref("");

const isPwVisible = ref(false);
const isPwCheckVisible = ref(false);

const errText = ref("");

const handleVisible = () => {
  isPwVisible.value = !isPwVisible.value;
};

const handleCheckVisible = () => {
  isPwCheckVisible.value = !isPwCheckVisible.value;
};

const compareInput = () => {
  if (!signUpId) {
    errText.value = "이메일을 입력해주세요.";
    return false;
  } else {
    const emailRegExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!emailRegExp.test(signUpId.value)) {
      errText.value = "이메일 형식이 올바르지 않습니다.";
      return false;
    }
  }

  if (!signUpPw) {
    errText.value = "비밀번호를 입력해주세요.";
    return false;
  }
  if (signUpPw.value !== signUpPwCheck.value) {
    errText.value = "비밀번호가 일치하지 않습니다.";
    return false;
  }

  errText.value = "";
  return true;
};

const onLogin = () => {
  if (!compareInput()) {
    return;
  }
  console.log("login");
};
</script>

<style scoped></style>
