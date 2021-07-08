<template>
  <v-form
    v-if="todo"
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-row>
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
            color="error"
            small
            @click="remove"
          >
            Delete
            <v-icon right>
              mdi-delete-outline
            </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            color="success"
            small
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
              :rules="titleRules"
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
                v-else-if="c.type === TodoType.DrawTodoType"
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
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, Ref, Vue } from 'nuxt-property-decorator';
import TextInput from './common/TextInput.vue';
import DrawInput from './common/DrawInput.vue';
import TodoTextInput from './common/TodoTextInput.vue';
import { TodoType } from '~/types/IToDoContent';
import { IToDo } from '~/types/IToDo';
import { VForm } from '~/types/VForm';
import { isRequired, lessThenSymbols } from '~/utils/validations';

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
  readonly loaded!: IToDo;

  @Ref('form')
  form!: VForm;

  todo: IToDo | null = null;

  valid = true;

  TodoType = TodoType;

  get titleRules(): Function[] {
    return [
      (value: any): boolean | string => isRequired(value),
      (value: any): boolean | string => lessThenSymbols(value, 150)
    ];
  }

  mounted (): void {
    // Hello! It is not a wrong code. We can't user spread here, because we need deep clone of the object
    this.todo = JSON.parse(JSON.stringify(this.loaded));
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
  save (): IToDo | false {
    if (!this.form.validate() || !this.todo) {
      return false;
    }
    return this.todo;
  }

  @Emit()
  remove (): IToDo | false {
    if (!this.todo) {
      return false;
    }
    return this.todo;
  }
}
</script>

<style scoped>

</style>
