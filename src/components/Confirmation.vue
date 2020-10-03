<template>
  <div class="content">
    <v-card color="white" dark>
      <div class="headline-title">
        <v-card-title class="headline black--text justify-center">
          Date : {{ appointment.date }}
        </v-card-title>
        <v-card-title class="headline black--text justify-center">
          Name: {{ appointment.name }}
        </v-card-title>

        <v-card-title class="headline black--text justify-center">
          Note:
        </v-card-title>
      </div>
      <v-spacer></v-spacer>
      <v-card-text class="green--text text-h5 text-center">
        {{ appointment.note }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="buttons">
          <v-btn class="mr-4 amber lighten-1 black--text" @click="previousPage">
            Back
          </v-btn>
          <v-btn class="green darken-1" @click="createAppointment">
            Create
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Confirmation",
  data: () => ({
    appointments: []
  }),
  methods: {
    ...mapActions(["moveToTabOne", "disableTabs", "saveAppointment"]),
    previousPage() {
      this.disableTabs();
      this.moveToTabOne();
    },
    createAppointment: function() {
      const newAppointment = JSON.parse(localStorage.getItem("appointment"));

      const savedAppointments = JSON.parse(
        localStorage.getItem("appointments")
      );
      if (
        savedAppointments === null ||
        savedAppointments === undefined ||
        savedAppointments.length <= 0
      ) {
        this.appointments = [];
        this.appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(this.appointments));
      } else {
        this.appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(this.appointments));
        this.$router.push("/");
        this.previousPage();
      }
    }
  },
  computed: mapState(["appointment"]),
  created() {
    this.appointments = JSON.parse(localStorage.getItem("appointments"));
  }
};
</script>

<style scoped>
.buttons {
  width: 100%;
  text-align: center;
}
</style>
