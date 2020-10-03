import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tab: "tab-1",
    isTabOneDisabled: false,
    isTabTwoDisabled: true,
    appointment: {
      date: "",
      name: "",
      note: ""
    },
    appointments: []
  },
  mutations: {
    CHANGE_TAB_TO_TWO: state => {
      state.tab = "tab-2";
    },
    CHANGE_TAB_TO_ONE: state => {
      state.tab = "tab-1";
    },
    DISABLE_TABS: state => {
      state.isTabOneDisabled = !state.isTabOneDisabled;
      state.isTabTwoDisabled = !state.isTabTwoDisabled;
    },
    CHANGE_APPOINTMENT: (state, appointment) => {
      state.appointment.date = appointment.date;
      state.appointment.name = appointment.name;
      state.appointment.note = appointment.note;
    },
    SAVE_APPOINTMENT: (state, appointment) => {
      state.appointments.push(appointment);
    }
  },
  actions: {
    moveToTabTwo: context => {
      context.commit("CHANGE_TAB_TO_TWO");
    },
    moveToTabOne: context => {
      context.commit("CHANGE_TAB_TO_ONE");
    },
    disableTabs: context => {
      context.commit("DISABLE_TABS");
    },
    changeAppointment: (context, appointment) => {
      context.commit("CHANGE_APPOINTMENT", appointment);
    },
    saveAppointment: (context, appointment) => {
      context.commit("SAVE_APPOINTMENT", appointment);
    }
  },
  getters: {
    getCurrentTab(state) {
      return state.tab;
    }
  }
});

export default store;
