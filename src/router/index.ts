import {
  SELECT_GOVERMENT,
  SELECT_GOVERMENT_BY_ID,
  SET_TREE,
} from "./../store/mutation-types";
import store from "@/store";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    redirect: {
      name: "home.select-goverment",
    },
  },
  {
    path: "/home",
    name: "Home",
    beforeEnter: (to, from, next) => {
      if (!store.getters.tree && to.params.id) {
        store.dispatch(SET_TREE, to.params.id);
        store.dispatch(SELECT_GOVERMENT_BY_ID, to.params.id);
      }
      if (
        store.getters.GET_USER_TYPE !== "dispatcher" &&
        to.name !== "home.select-goverment"
      ) {
        return next({
          name: "home.select-goverment",
        });
      }
      next();
    },
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home/index.vue"),
    children: [
      {
        path: "constructor/:id?",
        name: "home.constructor",
        component: () =>
          import(
            /* webpackChunkName: "Constructor" */ "../views/Home/Constructor.vue"
          ),
      },
      {
        path: "attach/:id?",
        name: "home.attach",
        component: () =>
          import(/* webpackChunkName: "Attach" */ "../views/Home/Attach.vue"),
      },
      {
        path: "select-goverment/:id?",
        name: "home.select-goverment",
        component: () =>
          import(
            /* webpackChunkName: "selectGoverment" */ "../views/Home/SelectGoverment.vue"
          ),
      },
      {
        path: "time/:id?",
        name: "home.time",
        component: () =>
          import(/* webpackChunkName: "HomeTime" */ "../views/Home/Time.vue"),
      },
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
        /* webpackChunkName: "Versions-History-Index" */ "../views/History-Versions/index.vue"
      ),
    children: [
      {
        path: ":id",
        name: "versions-history.id",
        component: () =>
          import(
            /* webpackChunkName: "Versions-History-Index" */ "../views/History-Versions/History-Version.vue"
          ),
      },
      {
        path: "",
        name: "versions-history.empty",
        component: () =>
          import(
            /* webpackChunkName: "Versions-History-Index" */ "../views/History-Versions/Empty.vue"
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
