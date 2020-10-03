<template>
  <div class="content">
    <v-container fill-height fluid>
      <v-card max-width="800" class="mx-auto">
        <v-list>
          <v-list-item
            v-for="(appointment, index) in appointments"
            :key="index"
          >
            <v-list-item-action>
              <div class="checkbox-item">
                <v-checkbox :input-value="active"></v-checkbox>
                <span class="p">Complete</span>
              </div>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="appointment.name"></v-list-item-title>

              <v-list-item-subtitle
                v-text="appointment.date"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn depressed color="error" @click.stop="showDialog(index)">
                Remove
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>

      <!--DIALOG-->
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">
            Are you sure?
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="removeAppointment()">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Appointments",
  components: {},
  data: () => ({
    active: false,
    appointments: [],
    dialog: false,
    itemIndex: ""
  }),
  created() {
    let appointments = JSON.parse(localStorage.getItem("appointments"));
    if (appointments === null) {
      this.appointments = [];
    } else {
      this.appointments = appointments;
    }
  },
  methods: {
    showDialog(index) {
      this.itemIndex = index;
      this.dialog = true;
    },
    removeAppointment() {
      this.appointments.splice(this.itemIndex, 1);
      localStorage.setItem("appointments", JSON.stringify(this.appointments));
      this.dialog = false;
    }
  }
};
</script>
<style scoped>
.checkbox-item {
  display: flex;
}
</style>
