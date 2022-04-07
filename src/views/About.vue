<template>
  <div class="about">
    <TodoList :items="data.items" />
  </div>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";

import TodoList from "@/components/TodoList.vue";

export default defineComponent({
  name: "About",
  components: {
    TodoList,
  },
  setup() {
    const data = reactive({
      items: [
        { text: "About-Time", icon: "mdi-clock" },
        { text: "Another one", icon: "mdi-account" },
      ],
    });

    return {
      data,
    };
  },
});
</script>
