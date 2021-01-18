import Vue from "vue";
import store from "./store/store";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,  
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: [
    {
      path: "/",
      redirect: "dashboards/minimal",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "Minimal",
          path: "dashboards/minimal",
          component: () => import("@/views/dashboards/Minimal"),
        },
        {
          name: "CreatorsPage",
          path: "creators",
          component: () => import("@/views/CreatorsPage"),
        },     
        {
          name: "PublishersPage",
          path: "publishers",
          component: () => import("@/views/PublishersPage"),
        },            
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/authentication/BoxedLogin"),
      meta: { guest: true }
    },
    {
      path: "/logout",
      name: "Logout",
      component: () => import("@/views/authentication/BoxedLogin"),
      meta: { guest: true },
      beforeEnter: (to, from, next) =>
      {
        store.dispatch('LogOut');
        next("/");
      }      
    },    
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/authentication/BoxedRegister"),
      meta: { guest: true },
    },    
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }  
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

router.envKeys = {
  API_URL: 'API_URL'
}

router.getEnv = function(name) {
  switch(name) {
    case router.envKeys.API_URL:
      return process.env.API_URL ?? "http://localhost:5000"
  }
};

export default router;
