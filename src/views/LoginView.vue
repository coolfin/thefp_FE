<template>
  <div class="flex flex-col h-screen md:flex-row">
    <!-- banner -->
    <LoginBanner />

    <!-- login -->
    <div
      class="flex flex-col items-center justify-between flex-1 bg-white 2xl:py-20"
    >
      <!-- logo -->
      <img
        src="/assets/logo.png"
        class="w-[180px] mx-auto mb-10 shadow-lg rounded-full"
      />

      <!-- input container -->
      <div
        class="flex flex-col items-center justify-start flex-1 py-20 gap-y-4"
      >
        <!-- simple input -->

        <form
          @submit.prevent="onLogin"
          class="w-[500px] flex flex-col font-bold gap-y-4 text-theme"
        >
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/input-id-icon.svg"
              alt="id-icon"
              class="mr-4"
            />
            <input
              type="text"
              class="flex-1 font-normal focus:outline-none"
              placeholder="이메일을 입력하세요."
              v-model="userId"
            />
          </div>
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/input-pw-icon.svg"
              alt="pw-icon"
              class="mr-4"
            />
            <input
              :type="isPwVisible ? 'text' : 'password'"
              class="flex-1 focus:outline-none"
              placeholder="⦁⦁⦁⦁⦁⦁⦁⦁"
              v-model="userPw"
            />

            <!-- 비밀번호 visibility -->
            <div
              @click="handleVisible"
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

        <button
          @click="clickGoogleLogin"
          type="submit"
          class="flex items-center justify-center w-full py-4 mt-4 transition-colors duration-500 ease-in-out border rounded-lg text-theme border-theme hover:bg-theme hover:text-white"
        >
          <img src="/assets/google-logo.png" class="w-6 h-6 mr-2" />
          구글로 로그인
        </button>

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
  </div>
</template>

<script setup>
import LoginBanner from "@/components/login/LoginBanner.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = useRouter();

const isPwVisible = ref(false);
const userId = ref("");
const userPw = ref("");

const errText = ref("");

const store = useUserStore();

const handleVisible = () => {
  isPwVisible.value = !isPwVisible.value;
};

const findPw = () => {
  router.push({ name: "password-find" });
};

const onLogin = async () => {
  if (!userId.value || !userPw.value) {
    errText.value = "아이디와 비밀번호를 입력해주세요.";
    return;
  }
  try {
    await store.login(userId.value, userPw.value);

    router.push({ name: "main" });
  } catch (e) {
    let msg = "";
    for (let key in e.response.data) {
      msg += store.ERR_TEXT[e.response.data[key][0]] + "\n";
    }
    errText.value = msg;
    return;
  }
};

const clickGoogleLogin = () => {
  alert("구글 연동은 준비 중 입니다.");
};
</script>

<style scoped></style>
