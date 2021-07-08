<template>
  <todo-edit-form
    :loaded="todo"
    @save="onSave"
    @remove="onRemove"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IToDo } from '~/types/IToDo';
import TextInput from '~/components/common/TextInput.vue';
import TodoTextInput from '~/components/common/TodoTextInput.vue';
import DrawInput from '~/components/common/DrawInput.vue';
import TodoEditForm from '~/components/TodoEditForm.vue';
import { todosStore } from '~/utils/store-accessor';

@Component({
  name: 'NewTodoPage',
  components: { TodoEditForm, DrawInput, TodoTextInput, TextInput }
})
export default class NewTodoPage extends Vue {
  todo: IToDo = {
    id: new Date().getTime(),
    title: '',
    done: false,
    content: []
  }

  onSave(todo: IToDo | false): void {
    if (!todo) {
      return;
    }
    todosStore.addTodo(todo);
    this.$router.push(this.$routes.INDEX);
  }

  onRemove(): void {
    this.$router.push(this.$routes.INDEX);
  }
}
</script>

<style scoped>

</style>
