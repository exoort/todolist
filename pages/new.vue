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
        :value="todo"
        @save="onSave"
        @remove="onRemove"
      />
    </v-flex>
  </v-layout>
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
    content: []
  }

  onSave(todo: IToDo): void {
    todosStore.addTodo(todo);
    this.$router.push({ name: 'index' });
  }

  onRemove(): void {
    this.$router.push({ name: 'index' });
  }
}
</script>

<style scoped>

</style>
