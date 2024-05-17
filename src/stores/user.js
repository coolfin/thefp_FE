import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

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

    const getLoginUser = computed(() => {
      return loginUser.value;
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
    })

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

    const logout = () => {
      loginUser.value = null;
    }

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
      users.value = users.value.map((user) => {
        if (user.id === findUser.value.id) {
          user.password = password;
          alert(user.name + "님의 비밀번호가 변경되었습니다.");
          findUser.value = null;
          return user;
        }
        return user;
      });
    }

    const editLoginuserName = (name) => {
      loginUser.value.name = name;
    }

    return {
      users,
      loginUser,
      findUser,
      getLoginUser,
      isFoundUser,
      login,
      logout,
      signup,
      findEmail,
      changePassword,
      editLoginuserName,
    };
  },
  {
    persist: true,
  }
);
