import { Action, config, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IToDo } from '~/types/IToDo';
import { ServiceTokens } from '~/services';
import { $services } from '~/utils/initServices';
import { todosStore } from '~/utils/store-accessor';

config.rawError = true;

@Module({
  name: 'todos',
  stateFactory: true,
  namespaced: true
})
export default class ToDosModule extends VuexModule {
  todos: IToDo[] = []

  @Mutation
  setTodos(todos: IToDo[]): void {
    this.todos = todos;
  }

  @Mutation
  addTodo (todo: IToDo, updateCache = true): void {
    this.todos.push(todo);
    if (updateCache) {
      $services[ServiceTokens.CacheService].saveTodos(this.todos);
    }
  }

  @Mutation
  removeTodo (todoId: number, updateCache = true): void {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    if (updateCache) {
      $services[ServiceTokens.CacheService].saveTodos(this.todos);
    }
  }

  @Mutation
  updateTodo (newTodo: IToDo, updateCache = true): void {
    const index = this.todos.findIndex(todo => todo.id === newTodo.id);
    if (!index) {
      return;
    }
    this.todos[index] = newTodo;
    if (updateCache) {
      $services[ServiceTokens.CacheService].saveTodos(this.todos);
    }
  }

  @Action
  loadTodos (): void {
    const todos = $services[ServiceTokens.CacheService].getTodos();
    this.setTodos(todos);
  }
}
