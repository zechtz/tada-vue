<template>
  <div class="home mx-auto" max-width="600">
    <Snackbar
      :isOpen="data.isOpen"
      :message="data.text"
      @close="closeSidebar"
    />
    <v-col>
      <v-form v-model="data.valid" @submit.prevent="addTodo">
        <v-row class="p-10">
          <v-text-field
            class="m-10"
            label="Add Todo"
            hide-details="auto"
            v-model="data.formData.text"
          />
          <v-btn elevation="2" color="primary">Submit</v-btn>
        </v-row>
      </v-form>
      <H2>Hello World</H2>
      <TodoList :items="data.items" @itemClicked="setItem" />
    </v-col>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import store from "@/store";

import TodoList from "@/components/TodoList.vue";
import Snackbar from "@/components/Snackbar.vue";
import H2 from "@/components/H2.vue";

export default defineComponent({
  name: "Home",
  components: {
    TodoList,
    Snackbar,
    H2,
  },
  setup() {
    const data = reactive({
      valid: true,
      isOpen: false,
      text: "I am a snackbar",
      index: "",
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      formData: {
        text: "",
        icon: "mdi-flag",
      },
    });

    const closeSidebar = (value: boolean) => {
      store.dispatch("SnackBar/CLOSE");
    };

    const addTodo = () => {
      if (data.index !== "") {
        const idx = parseInt(data.index);
        data.items.splice(idx, 1);
        data.items.push(data.formData);
        data.index = "";
      } else {
        data.items.push(data.formData);
      }
      data.formData = { text: "", icon: "mdi-flag" };
      store.dispatch("SnackBar/OPEN", "Successfully Created");
    };

    const setItem = (item: any) => {
      data.index = item.index;
      delete item.index;
      data.formData = item;
    };

    return {
      data,
      addTodo,
      setItem,
      closeSidebar,
    };
  },
});
</script>
