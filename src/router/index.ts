import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home/index.vue"),
    children: [
      {
        path: "constructor",
        name: "home.constructor",
        component: () =>
          import(
            /* webpackChunkName: "Constructor" */ "../views/Home/Constructor.vue"
          ),
      },
      {
        path: "attach",
        name: "home.attach",
        component: () =>
          import(/* webpackChunkName: "Attach" */ "../views/Home/Attach.vue"),
      },
      {
        path: "select-goverment",
        name: "home.select-goverment",
        component: () =>
          import(
            /* webpackChunkName: "selectGoverment" */ "../views/Home/SelectGoverment.vue"
          ),
      },
      {
        path: 'time',
        name: 'home.time',
        component: () => import(
          /* webpackChunkName: "HomeTime" */ "../views/Home/Time.vue"
        ),
      }
    ],
  },
  {
    path: "/logs",
    name: "Logs",
    component: () =>
      import(/* webpackChunkName: "Logs" */ "../views/Logs/Logs.vue"),
  },
  {
    path: "/versions-history",
    name: "versions-history",
    component: () =>
      import(
        /* webpackChunkName: "Versions-History" */ "../views/History-Versions/index.vue"
      ),
    children: [
      {
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "Versions-History" */ "../views/History-Versions/Empty.vue"
          ),
      },
      {
        path: ":id",
        component: () =>
          import(
            /* webpackChunkName: "Versions-History" */ "../views/History-Versions/Empty.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
