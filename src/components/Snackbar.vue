<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="isOpen" :timeout="timeout">
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="close"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";

import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useState } = createNamespacedHelpers("SnackBar");

export default defineComponent({
  setup(props, context) {
    let { isOpen, message } = useState(["isOpen", "message"]);

    const data = reactive({
      timeout: -1,
    });

    const timeout = -1;

    const close = () => {
      context.emit("close", false);
    };

    return {
      close,
      data,
      timeout,
      isOpen,
      message,
    };
  },
});
</script>

function reactive(arg0: { timeout: number; }) { throw new Error("Function not
implemented."); }
