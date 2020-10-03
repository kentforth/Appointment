<template>
  <div class="tabs">
    <v-card>
      <v-tabs
        background-color="deep-purple accent-4"
        fixed-tabs
        dark
        :value="tab"

      >
        <v-tab href="#tab-1" :disabled="isTabOneDisabled">Info</v-tab>
        <v-tab href="#tab-2" :disabled="isTabTwoDisabled">Confirmation</v-tab>
        <v-tab-item value="tab-1"><Info /></v-tab-item>
        <v-tab-item value="tab-2"><Confirmation /></v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
  import { mapState, mapActions} from 'vuex'

import Info from "./Info";
import Confirmation from "./Confirmation";
export default {
  name: "Tabs",
  components: {Confirmation, Info},
  data: () => ({}),
  mounted() {

  },
  computed: {
    ...mapState(['tab', 'isTabOneDisabled', 'isTabTwoDisabled'])
  },
  methods: {
    ...mapActions(['moveToTabTwo', 'moveToTabOne']),

  }
};
</script>

<style scoped></style>
