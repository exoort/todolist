<template>
  <v-card>
    <v-card-title>
      {{ todo.title }}
    </v-card-title>
    <v-card-text>
      <template v-for="contentItem in todoContent">
        <component
          :is="contentItem.component"
          :key="contentItem.content.id"
          v-bind="contentItem.content"
        />
      </template>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :to="{
          name: 'edit-id',
          params: {
            id: todo.id
          }
        }"
      >
        Edit
      </v-btn>
      <v-btn
        color="red"
        @click="remove"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
import { IToDo } from '~/types/IToDo';
import TextTodoCardContent from '~/components/TextTodoCardContent.vue';
import { IToDoContent, TodoType } from '~/types/IToDoContent';
import DrawTodoCardContent from '~/components/DrawTodoCardContent.vue';

@Component({
  name: 'TodoCard',
  components: { TextTodoCardContent }
})
export default class TodoCard extends Vue {
  @Prop({ required: true, type: Object })
  readonly todo!: IToDo;

  get todoContent(): any[] {
    if (!this.todo.content.length) {
      return [];
    }
    return this.todo.content.map(c => this.getContentComponent(c));
  }

  getContentComponent(content: IToDoContent): any {
    if (content.type === TodoType.TextTodoType) {
      return {
        component: TextTodoCardContent,
        content
      };
    } else if (content.type === TodoType.DrawTodoType) {
      return {
        component: DrawTodoCardContent,
        content
      };
    }
  }

  @Emit()
  remove(todo: IToDo): IToDo {
    return todo;
  }
}
</script>

<style scoped>

</style>
