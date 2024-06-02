import { type RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
     {
          path: "/auth",
          redirect: (to) => {
               return { name: "login" };
          },
     },
     {
          path: "/auth",
          name: "auth",
          component: () => import("@/views/auth/AuthView.vue"),
          children: [
               {
                    path: "entrar",
                    name: "login",
                    component: () => import("@/views/auth/LoginView.vue"),
               },
               {
                    path: "cadastro",
                    name: "signup",
                    component: () => import("@/views/auth/SignupView.vue"),
               },
          ],
     },
];

export default authRoutes;
