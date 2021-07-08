<template>
  <v-row>
    <v-col cols="12">
      <v-toolbar color="secondary">
        <v-toolbar-title>
          TODOs
          <v-chip
            v-if="todos.length"
            color="primary"
            label
          >
            {{ todos.length }}
          </v-chip>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          :to="$routes.NEW"
          color="primary"
        >
          New
        </v-btn>
      </v-toolbar>
    </v-col>
    <v-col cols="12">
      <v-switch
        v-model="onlyNotDone"
        inset
        label="Only not done"
      />
    </v-col>
    <template v-if="todos && todos.length">
      <v-col
        v-for="todo in todos"
        :key="todo.id"
        cols="12"
      >
        <todo-card
          :key="todo.id"
          :todo="todo"
          @done="onDone(todo)"
          @remove="onTodoRemove(todo.id)"
        />
      </v-col>
    </template>

    <v-col
      v-else
      cols="12"
    >
      <no-todos-found />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IToDo } from '~/types/IToDo';
import { todosStore } from '~/utils/store-accessor';
import TodoCard from '~/components/TodoCard.vue';
import NoTodosFound from '~/components/NoTodosFound.vue';

@Component({
  name: 'IndexPage',
  components: {
    NoTodosFound,
    TodoCard
  }
})
export default class IndexPage extends Vue {
  onlyNotDone = false;

  get todos (): IToDo[] {
    if (this.onlyNotDone) {
      return todosStore.notDoneTodos;
    }
    return todosStore.todos;
  }

  onTodoRemove (todoId: number): void {
    todosStore.removeTodo(todoId);
  }

  onDone (todo: IToDo): void {
    todosStore.makeTodoDone(todo);
  }
}
</script>

<style scoped>

</style>
