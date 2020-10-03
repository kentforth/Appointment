<template>
  <v-app class="background">
    <v-app-bar app color="deep-purple lighten-1" absolute>
     <Navigation/>

    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",

  components: {Navigation},

  data: () => ({
    //
  })
};
</script>
<style>
  html {
    overflow-y: auto !important;
  }

  .container {
    width: 80% !important;
  }

.background {
  background: #C9C9C9 !important;

}
</style>

