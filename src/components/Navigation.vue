<template>
    <div class="nav">
        <router-link to="/">Appointments</router-link>
        <router-link to="/make-appointments">Make Appointments</router-link>
    </div>
</template>

<script>
  export default {
    name: "Navigation"
  }
</script>

<style scoped>
    .nav {
        width: 100%;
        text-align: center;
    }

    .nav a {
        text-decoration: none;

        font-size: 1.8rem;
        margin-left: 1em;
    }

    .v-application a {
        color: white !important;
    }
</style>
