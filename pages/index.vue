<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      md4
      sm8
      xs12
    >
      <v-row>
        <v-col cols="12">
          <v-toolbar color="secondary">
            <v-toolbar-title>
              TODO list
            </v-toolbar-title>
            <v-spacer />
            <v-btn
              color="green"
              :to="{ name: 'new' }"
            >
              New
            </v-btn>
          </v-toolbar>
        </v-col>
        <template v-if="todos && todos.length">
          <v-col
            v-for="todo in todos"
            :key="todo.id"
            cols="12"
          >
            <todo-card

              :todo="todo"
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
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IToDo } from '~/types/IToDo';
import { todosStore } from '~/utils/store-accessor';
import TodoCard from '~/components/TodoCard.vue';
import NoTodosFound from '~/components/NoTodosFound.vue';

@Component({
  name: 'IndexPage',
  components: { NoTodosFound, TodoCard }
})
export default class IndexPage extends Vue {
  get todos(): IToDo[] {
    return todosStore.todos;
  }

  onTodoRemove(todoId: number): void {
    todosStore.removeTodo(todoId);
  }
}
</script>

<style scoped>

</style>
