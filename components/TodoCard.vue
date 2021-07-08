<template>
  <v-card>
    <v-card-title
      :class="titleClass"
    >
      <v-chip
        v-if="todo.done"
        class="mr-2"
        color="success"
        small
      >
        Done
      </v-chip>
      <v-chip
        v-else
        class="mr-2"
        color="error"
        small
      >
        Not done
      </v-chip>
      {{ todo.title }}
    </v-card-title>
    <v-card-text v-if="fullVisibility && todoContent.length">
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
        v-if="todoContent.length"
        color="primary"
        outlined
        @click="toggleFullVisibility"
      >
        <template v-if="!fullVisibility">
          More
        </template>
        <template v-else>
          Hide
        </template>
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="!todo.done"
        color="success"
        @click="done"
      >
        Make done
      </v-btn>
      <v-btn
        :to="{
          ...$routes.EDIT,
          params: {
            id: todo.id
          }
        }"
        color="primary"
      >
        Edit
      </v-btn>
      <v-btn
        color="error"
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
  @Prop({
    required: true,
    type: Object
  })
  readonly todo!: IToDo

  fullVisibility = false

  get titleClass (): any {
    return {
      'text-body-1': true,
      truncate: !this.fullVisibility
    };
  }

  get todoContent (): any[] {
    if (!this.todo.content.length) {
      return [];
    }
    return this.todo.content.map(c => this.getContentComponent(c));
  }

  getContentComponent (content: IToDoContent): any {
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

  toggleFullVisibility (): void {
    this.fullVisibility = !this.fullVisibility;
  }

  @Emit()
  remove (todo: IToDo): IToDo {
    return todo;
  }

  @Emit()
  done (todo: IToDo): IToDo {
    return todo;
  }
}
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
