<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Snackbar from "@/components/Snackbar.vue";

export default defineComponent({
  name: "Index",
  components: {
    Snackbar,
  },
});
</script>
