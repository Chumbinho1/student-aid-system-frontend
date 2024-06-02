import {
     createRouter,
     createWebHistory,
     type RouteRecordRaw,
} from "vue-router";
import authRoutes from "@/router/authRoutes";

const routes: RouteRecordRaw[] = [...authRoutes];

const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     routes: [
          {
               path: "/",
               redirect: "/auth",
          },
          ...routes,
     ],
});

export default router;
