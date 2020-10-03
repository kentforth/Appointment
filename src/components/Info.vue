<template>
  <div class="content">
    <form class="form">
      <!--DATE PICKER-->
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateFormatted"
            :error-messages="dateErrors"
            required
            label="Date"
            hint="MM/DD/YYYY format"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            @blur="date = parseDate(dateFormatted)"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          @input="menu = false"
        ></v-date-picker>
      </v-menu>

      <!--NAME-->
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        required
        label="Name"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>

      <!--NOTE-->
      <v-textarea
        name="input-7-1"
        label="Note"
        hint="Hint text"
        v-model="note"
      ></v-textarea>

      <v-btn class="mr-4 amber lighten-1" @click="previosPage">
        BAck
      </v-btn>
      <v-btn class="mr-4 primary" @click="nextPage">
        Next
      </v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "Info",
  mixins: [validationMixin],
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    name: "",
    note: "",
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10))
  }),

  validations: {
    date: { required },
    name: { required }
  },

  methods: {
    ...mapActions(["moveToTabTwo", "disableTabs", "changeAppointment"]),
    nextPage() {
      this.$v.$touch();
      if (this.$v.name.$error || this.$v.date.$error) {
        console.log("errors");
      } else {
        this.saveDataToLocalStorage();
        this.disableTabs();
        this.moveToTabTwo();
      }
    },
    previosPage() {
      this.$router.push("/");
    },
    saveDataToLocalStorage() {
      const appointment = {
        date: this.dateFormatted,
        name: this.name,
        note: this.note
      };

      if (
        appointment.date === "" ||
        appointment.date === null ||
        appointment.name === "" ||
        appointment.name === null
      ) {
        return;
      } else {
        localStorage.setItem("appointment", JSON.stringify(appointment));

        this.changeAppointment(appointment);
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  computed: {
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Date is required.");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    }
  },
  async mounted() {
    const savedAppointment = await localStorage.getItem("appointment");
    if (savedAppointment) {
      this.appointment = JSON.parse(savedAppointment);
      this.dateFormatted = this.appointment.date;
      this.name = this.appointment.name;
      this.note = this.appointment.note;
    }
  },

  watch: {
    date: {
      handler() {
        this.dateFormatted = this.formatDate(this.date);
        this.saveDataToLocalStorage();
      },
      deep: true
    },
    name: {
      handler() {
        this.saveDataToLocalStorage();
      },
      deep: true
    },
    note: {
      handler() {
        this.saveDataToLocalStorage();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.form {
  width: 70%;
  padding: 2em;
  margin: 0 auto;
}
</style>
