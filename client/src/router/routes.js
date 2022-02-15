const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Start.vue") },
      { path: "feeds", component: () => import("pages/Feeds.vue") },
      { path: "profile", component: () => import("pages/Profile.vue") },
      { path: "auth", component: () => import("pages/Auth.vue") }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
