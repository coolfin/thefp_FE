<template>
  <div class="flex flex-col h-screen md:flex-row">
    <LoginBanner />

    <!-- login -->
    <div class="flex flex-col items-center justify-between flex-1 py-10">
      <!-- logo -->
      <img
        src="/assets/logo.png"
        class="w-[180px] mx-auto mb-4 shadow-lg rounded-full"
      />

      <!-- input container -->
      <div
        class="flex flex-col items-center justify-start flex-1 2xl:py-14 gap-y-4"
      >
        <!-- simple input -->
        <form
          @submit.prevent="onSubmit"
          class="w-[500px] flex flex-col font-bold gap-y-4 text-theme"
        >
          <!-- 이름 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/name-icon.svg"
              alt="name-icon"
              class="mr-4"
            />
            <input
              type="text"
              class="flex-1 font-normal focus:outline-none"
              placeholder="이름 (또는 닉네임)"
              v-model="signUpName"
            />
          </div>

          <!-- 생년월일 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/calendar-icon.svg"
              alt="birth-icon"
              class="mr-4"
            />
            <input
              type="date"
              class="flex-1 font-normal focus:outline-none"
              placeholder="생년월일"
              v-model="signUpBirth"
            />
          </div>

          <!-- 이메일 -->
          <div class="flex p-4 border rounded-lg border-theme">
            <img
              src="/assets/icons/input-id-icon.svg"
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
              src="/assets/icons/input-pw-icon.svg"
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

          <p class="font-normal text-red-500">
            {{ errText }}
          </p>

          <div class="text-theme">
            <div class="flex items-center gap-x-2">
              <input
                type="checkbox"
                class="cursor-pointer"
                v-model="isTermChecked"
                id="term"
              />
              <label class="cursor-pointer" for="term">
                이용약관 동의 (필수)
              </label>
              <a
                href="https://coolfin.notion.site/e552e5071f59460fa924de1f0ed26d0a?pvs=4"
                target="_blank"
                class="text-sm font-normal underline cursor-pointer hover:opacity-70 decoration-theme"
              >
                보기
              </a>
            </div>
            <div class="flex items-center gap-x-2">
              <input
                type="checkbox"
                class="cursor-pointer"
                v-model="isPersonalChecked"
                id="personal"
              />
              <label class="cursor-pointer" for="personal">
                개인정보 수집 및 이용 동의 (필수)
              </label>
              <a
                href="https://coolfin.notion.site/75fccd0924d54c52ae9599698efd8cc7?pvs=4"
                target="_blank"
                class="text-sm font-normal underline cursor-pointer hover:opacity-70 decoration-theme"
              >
                보기
              </a>
            </div>
          </div>
          <button type="submit" class="py-4 text-white rounded-lg bg-theme">
            회원가입
          </button>

          <div class="flex items-center">
            이미 회원이신가요?
            <span
              class="underline decoration-[#294936] cursor-pointer"
              @click="clickLogin"
            >
              로그인
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginBanner from "@/components/login/LoginBanner.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const signUpId = ref("");
const signUpPw = ref("");
const signUpPwCheck = ref("");

const signUpName = ref("");
const signUpBirth = ref("");

const isPwVisible = ref(false);
const isPwCheckVisible = ref(false);

const isTermChecked = ref(false); // 이용약관 동의
const isPersonalChecked = ref(false); // 개인정보 수집 및 이용 동의

const errText = ref("");

const store = useUserStore();

const handleVisible = () => {
  isPwVisible.value = !isPwVisible.value;
};

const handleCheckVisible = () => {
  isPwCheckVisible.value = !isPwCheckVisible.value;
};

const compareInput = () => {
  if (!signUpName.value) {
    errText.value = "이름을 입력해주세요.";
    return false;
  }
  if (!signUpBirth.value) {
    errText.value = "생년월일을 입력해주세요.";
    return false;
  }
  if (!signUpId.value) {
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

  if (!signUpPw.value) {
    errText.value = "비밀번호를 입력해주세요.";
    return false;
  }
  if (signUpPw.value !== signUpPwCheck.value) {
    errText.value = "비밀번호가 일치하지 않습니다.";
    return false;
  }

  if (!isTermChecked.value || !isPersonalChecked.value) {
    errText.value = "필수 약관에 모두 동의해주세요.";
    return false;
  }

  errText.value = "";
  return true;
};

//temp router
import { useRouter } from "vue-router";
const router = useRouter();
const onSubmit = async () => {
  if (!compareInput()) {
    return;
  }

  const user = {
    nickname: signUpName.value,
    birth: signUpBirth.value,
    email: signUpId.value,
    password1: signUpPw.value,
    password2: signUpPw.value,
    username: signUpId.value.split("@")[0],
  };

  try {
    await store.signup(user);
    router.push({ name: "home" });
  } catch (e) {
    let msg = "";
    for (let key in e.response.data) {
      msg += store.ERR_TEXT[e.response.data[key][0]] + "\n";
    }
    errText.value = msg;
    return;
  }
  // router.push("/");
};

const clickLogin = () => {
  router.push({ name: "home" });
};
</script>

<style scoped></style>
