import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const dummyUser = {
      id: 1,
      name: "홍길동",
      birth: "1990-01-01",
      email: "test@test.com",
      password: "1234",
    };

    const users = ref([dummyUser]);
    const loginUser = ref(null);

    const login = (email, password) => {
      const user = users.value.find((user) => user.email === email);
      if (!user) {
        throw new Error("가입되지 않은 이메일입니다.");
      }
      if (user.password !== password) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      loginUser.value = user;
      alert(loginUser.value.name + "님 환영합니다.");
    };

    const signup = (user) => {
      users.value.map((userData) => {
        if (userData.email === user.email) {
          throw new Error("이미 가입된 이메일입니다.");
        }
      });
      users.value.push({ id: users.value.length + 1, ...user });
    };

    return {
      users,
      loginUser,
      login,
      signup,
    };
  },
  {
    persist: true,
  }
);
