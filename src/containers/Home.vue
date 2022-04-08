<template>
  <div class="container">
    <Header :title="'Todos'" :completed="completed" />
    <TodoInput @addTodo="addTodo" />
    <TodoList
      :todos="data.todos"
      @deleteTodo="deleteTodo"
      @changeStatus="updateStatus"
      @updateTodo="updateTodo"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  watch,
  computed,
} from "@vue/composition-api";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import TodoList from "todos/TodoList.vue";
import Header from "todos/Header.vue";
import TodoInput from "todos/TodoInput.vue";
import store from "@/store";

interface Todo {
  id: any;
  title: string;
  completed: boolean;
}

interface DirtyTodo {
  userId: any;
  id: any;
  title: string;
  completed: boolean;
}

interface Todos {
  todos: Todo[];
}

export default defineComponent({
  name: "Home",

  components: {
    Header,
    TodoList,
    TodoInput,
  },

  setup() {
    const data = reactive({
      valid: true,
      todos: [],
    });

    const generateData = (data: DirtyTodo[]) => {
      return data.map((todo: DirtyTodo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }));
    };

    onMounted(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
        .then((response) => {
          data.todos = generateData(response.data);
        });
    });

    watch(
      () => _.cloneDeep(data),
      (nextState, prevState) => {
        // console.log("next", nextState);
        // console.log("prev", prevState);
        if (prevState.todos !== nextState.todos) {
          const temp = JSON.stringify(nextState.todos);
          localStorage.setItem("todos", temp);
        }
      }
    );

    const addTodo = (title: string) => {
      const newTodo: any = {
        id: uuidv4(),
        title: title,
        completed: false,
      };

      data.todos.push(newTodo);
      store.dispatch("SnackBar/OPEN", "Successfully Created Todo");
    };

    const updateStatus = (id: number | string) => {
      const todo = data.todos.find((todo: Todo) => todo.id === id);
      let status = todo.completed ? "Incomplete" : "Complete";

      data.todos = data.todos.map((todo: Todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      store.dispatch("SnackBar/OPEN", `Successfully Marked Todo as ${status}`);
    };

    const deleteTodo = (todo: any) => {
      data.todos = data.todos.filter((item: Todo) => item.id !== todo.id);
      store.dispatch("SnackBar/OPEN", `Successfully Deleted Todo`);
    };

    const updateTodo = (entry: Todo) => {
      data.todos = data.todos.map((todo: Todo) => {
        if (todo.id === entry.id) {
          return {
            ...todo,
            title: entry.title,
          };
        }
        return todo;
      });
      store.dispatch("SnackBar/OPEN", `Successfully Updated Todo`);
    };

    const completed = computed(() => {
      return data.todos.filter((todo: Todo) => todo.completed).length;
    });

    return {
      data,
      addTodo,
      updateStatus,
      deleteTodo,
      updateTodo,
      completed,
    };
  },
});
</script>
