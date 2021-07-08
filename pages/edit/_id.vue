<template>
  <todo-edit-form
    v-if="todo"
    :loaded="todo"
    @save="onSave"
    @remove="onRemove"
  >
    <template #title>
      Edit TODO #{{ todoId }}
    </template>
  </todo-edit-form>
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

  onSave(todo: IToDo | false): void {
    if (!todo) {
      return;
    }
    todosStore.updateTodo(todo);
    this.$router.push(this.$routes.INDEX);
  }

  onRemove(todo: IToDo | false): void {
    if (!todo) {
      return;
    }
    todosStore.removeTodo(todo.id);
    this.$router.push(this.$routes.INDEX);
  }
}
</script>

<style scoped>

</style>
