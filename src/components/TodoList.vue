<template>
  <v-card tile class="mt-10">
    <v-list dense>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, idx) in items"
          :key="idx"
          @click="setItem(item, idx)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TodoList",
  props: {
    items: {
      type: Array,
      default: [],
      required: true,
    },
    itemClicked: {
      type: Function,
      required: false,
    },
  },

  setup(_props, context) {
    const setItem = (item: any, index: number) => {
      context.emit("itemClicked", { ...item, index });
    };

    return {
      setItem,
    };
  },
});
</script>
