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
      <todo-edit-form
        v-if="todo"
        :value="todo"
        @save="onSave"
        @remove="onRemove"
      >
        <template #title>
          Edit TODO #{{ todoId }}
        </template>
      </todo-edit-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TodoEditForm from '../../components/TodoEditForm.vue';
import { IToDo } from '~/types/IToDo';
import { todosStore } from '~/utils/store-accessor';

@Component({
  name: 'EditTodoPage',
  components: { TodoEditForm }
})
export default class EditTodoPage extends Vue {
  get todoId(): number {
    return Number(this.$route.params.id);
  }

  get todo(): IToDo | null {
    return todosStore.todos.find(todo => todo.id === this.todoId) ?? null;
  }

  onSave(todo: IToDo): void {
    todosStore.updateTodo(todo);
    this.$router.push({ name: 'index' });
  }

  onRemove(todo: IToDo): void {
    todosStore.removeTodo(todo.id);
    this.$router.push({ name: 'index' });
  }
}
</script>

<style scoped>

</style>
