import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Appointments",
    meta: {
      title: "Appointments"
    },
    component: () =>
      import("../views/Appointments")
  },
  {
    path: "/make-appointments",
    name: "Make Appointments",
    meta: {
      title: "Make Appointments"
    },
    component: () =>
      import("../views/MakeAppointments.vue")
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
