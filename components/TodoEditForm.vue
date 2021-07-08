<template>
  <v-row v-if="todo">
    <v-col cols="12">
      <v-toolbar color="secondary">
        <v-toolbar-title>
          <slot name="title">
            New TODO
          </slot>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          class="mx-2"
          color="red"
          @click="remove"
        >
          Delete
          <v-icon right>
            mdi-delete-outline
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          color="green"
          @click="save"
        >
          Save
          <v-icon right>
            mdi-content-save-outline
          </v-icon>
        </v-btn>
      </v-toolbar>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <text-input
            v-model="todo.title"
            label="Title"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-actions>
          <v-btn
            color="primary"
            small
            @click="addTextInput"
          >
            Add paragraph
          </v-btn>
          <v-btn
            color="primary"
            outlined
            small
            @click="addDrawInput"
          >
            Add draw
          </v-btn>
        </v-card-actions>
        <v-card-text v-if="todo.content.length">
          <template
            v-for="c in todo.content"
          >
            <todo-text-input
              v-if="c.type === TodoType.TextTodoType"
              :key="c.id"
              v-model="c.content"
              :input-id="c.id"
              @remove="onInputRemove"
            />
            <draw-input
              v-if="c.type === TodoType.DrawTodoType"
              :key="c.id"
              v-model="c.content"
              :input-id="c.id"
              @remove="onInputRemove"
            />
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import TextInput from './common/TextInput.vue';
import DrawInput from './common/DrawInput.vue';
import TodoTextInput from './common/TodoTextInput.vue';
import { TodoType } from '~/types/IToDoContent';
import { IToDo } from '~/types/IToDo';

@Component({
  name: 'TodoEditForm',
  components: {
    TodoTextInput,
    DrawInput,
    TextInput
  }
})
export default class TodoEditForm extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  readonly value!: IToDo

  todo: IToDo | null = null;

  TodoType = TodoType

  mounted (): void {
    this.todo = this.value;
  }

  addTextInput (): void {
    if (!this.todo) {
      return;
    }
    this.todo.content.push({
      type: TodoType.TextTodoType,
      id: new Date().getTime(),
      content: ''
    });
  }

  addDrawInput (): void {
    if (!this.todo) {
      return;
    }
    this.todo.content.push({
      type: TodoType.DrawTodoType,
      id: new Date().getTime(),
      content: ''
    });
  }

  onInputRemove (id: number): void {
    if (!this.todo) {
      return;
    }
    this.todo.content = this.todo.content.filter(c => c.id !== id);
  }

  @Emit()
  save (): IToDo {
    return this.todo;
  }

  @Emit()
  remove (): IToDo {
    return this.todo;
  }
}
</script>

<style scoped>

</style>
