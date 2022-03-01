const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Start.vue"), meta: { requiresAuth: false } },
      { path: "feeds", component: () => import("pages/Feeds.vue"), meta: { requiresAuth: true } },
      { path: "profile", component: () => import("pages/Profile.vue"), meta: { requiresAuth: true } },
      { path: "auth", component: () => import("pages/Auth.vue"),  meta: { requiresAuth: false } }
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
