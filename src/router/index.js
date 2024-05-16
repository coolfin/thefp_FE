import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignupView.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/MainView.vue"),
      redirect: { name: "info" },
      children: [
        {
          path: "info",
          name: "info",
          component: () => import("@/views/InfoView.vue"),
        },
        {
          path: "exchange",
          name: "exchange",
          component: () => import("@/views/ExchangeView.vue"),
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "404" },
    },
  ],
});

import { useUserStore } from "@/stores/user";
router.beforeEach((to, from, next) => {
  const store = useUserStore();
  if (!store.loginUser && to.name !== "home" && to.name !== "signup") {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    next({ name: "home" });
  } else if (store.loginUser && (to.name === "home" || to.name === "signup")) {
    next({ name: "info" });
  } else {
    next();
  }
});
export default router;
