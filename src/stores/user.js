import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import axios from "axios";
import Chart from "chart.js/auto";

export const useUserStore = defineStore(
  "user",
  () => {
    //state
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const ERR_TEXT = {
      "Unable to log in with provided credentials.":
        "아이디 또는 비밀번호가 일치하지 않습니다.",
      "This field may not be blank.": "모든 항목을 입력해주세요.",
      "Enter a valid email address.": "이메일 형식이 올바르지 않습니다.",
      "A user with that username already exists.": "이미 가입된 이메일입니다.",
      "A user is already registered with this e-mail address.":
        "이미 가입된 이메일입니다.",
      "This password is too common.": "비밀번호가 너무 간단합니다.",
      "This password is entirely numeric.":
        "비밀번호에 숫자만 사용할 수 없습니다.",
      "This password is too short. It must contain at least 8 characters.":
        "비밀번호는 8자 이상이어야 합니다.",
    };

    const users = ref([]);

    const loginUser = ref(null);

    const findUser = ref(null);

    const token = ref(null);

    const barChart = ref(null);
    //getter
    const isFoundUser = computed(() => {
      return findUser.value === null;
    });

    const getLoginUser = computed(() => {
      return loginUser.value;
    });

    const getLikedProducts = computed(() => {
      return loginUser.value?.product;
    });

    // 내 프로필에서 이름 변경 시, 로그인한 유저의 이름도 변경
    watch(loginUser, (newUser, oldUser) => {
      if (newUser === null) return;
      users.value = users.value.map((user) => {
        if (user.id === newUser.id) {
          return newUser;
        }
        return user;
      });
    });

    //action
    const login = async (email, password) => {
      await axios({
        method: "post",
        url: BASE_URL + "/accounts/login/",
        data: { username: email.split("@")[0], email, password },
      }).then((res) => {
        token.value = res.data.key;
      });

      await getUserInfo();
    };

    const getUserInfo = async () => {
      await axios({
        method: "get",
        url: BASE_URL + "/ac/profile/",
        headers: {
          Authorization: `Token ${token.value}`,
        },
      }).then((res) => {
        loginUser.value = res.data;
      });
    };

    const logout = () => {
      loginUser.value = null;
      token.value = null;
    };

    const signup = async (user) => {
      await axios({
        method: "post",
        url: BASE_URL + "/accounts/signup/",
        data: user,
      });
    };

    const findEmail = async (email) => {
      // const user = users.value.find((user) => user.email === email);
      // if (!user) {
      //   throw new Error("가입되지 않은 이메일입니다.");
      // }

      // findUser.value = user;
      // alert(
      //   findUser.value.name +
      //     "님의 이메일(" +
      //     findUser.value.email +
      //     ")로 전송하였습니다."
      // );

      await axios({
        method: "post",
        url: BASE_URL + "/ac/reset_pw/",
        data: { email: email },
      }).then((res) => {
        findUser.value = res.data;
      });
    };

    const changePassword = async (password) => {
      // users.value = users.value.map((user) => {
      //   if (user.id === findUser.value.id) {
      //     user.password = password;
      //     alert(user.name + "님의 비밀번호가 변경되었습니다.");
      //     findUser.value = null;
      //     return user;
      //   }
      //   return user;
      // });

      await axios({
        method: "put",
        url: BASE_URL + "/ac/reset_pw/",
        data: {
          email: findUser.value.email,
          password: password,
        },
      }).then((res) => {
        alert("비밀번호 변경 완료");
        findUser.value = null;
      });
    };

    const editLoginuserName = async (name) => {
      //loginUser.value.name = name;
      await axios({
        method: "put",
        url: BASE_URL + "/ac/profile/",
        headers: {
          Authorization: `Token ${token.value}`,
        },
        data: { nickname: name },
      }).then((res) => {
        loginUser.value.user.nickname = res.data.nickname;
      });
    };

    const delLikedProduct = async (pk) => {
      await axios({
        method: "delete",
        url: BASE_URL + `/ac/delete_product/${pk}/`,
        headers: {
          Authorization: `Token ${token.value}`,
        },
      }).then((res) => {
        getUserInfo();
      });
    };

    return {
      users,
      token,
      loginUser,
      findUser,
      getLoginUser,
      isFoundUser,
      ERR_TEXT,
      login,
      logout,
      signup,
      findEmail,
      changePassword,
      editLoginuserName,
      getUserInfo,
      getLikedProducts,
      delLikedProduct,
    };
  },
  {
    persist: true,
  }
);
