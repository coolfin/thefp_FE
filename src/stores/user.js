import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    //state
    const dummyUser = {
      id: 1,
      name: "홍길동",
      birth: "1990-01-01",
      email: "test@test.com",
      password: "1234",
    };

    const users = ref([dummyUser]);

    const loginUser = ref(null);
    const findUser = ref(null);

    //getter
    const isFoundUser = computed(() => {
      return findUser.value === null;
    });

    //action
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

    const findEmail = (email) => {
      const user = users.value.find((user) => user.email === email);
      if (!user) {
        throw new Error("가입되지 않은 이메일입니다.");
      }

      findUser.value = user;
      alert(findUser.value.name + "님의 이메일(" + findUser.value.email + ")로 전송하였습니다.");
    };

    const changePassword = (password) => {
      findUser.value.password = password;

      const tarUser = users.value.find((user) => user.email === findUser.value.email);
      tarUser.password = password;

      users.value = [...users.value, tarUser]
      alert(findUser.value.name + "님의 비밀번호가 변경되었습니다.");

    }

    return {
      users,
      loginUser,
      findUser,
      isFoundUser,
      login,
      signup,
      findEmail,
      changePassword,
    };
  },
  {
    persist: true,
  }
);
