import { Action, config, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IToDo } from '~/types/IToDo';
import { ServiceTokens } from '~/services';
import { $services } from '~/utils/initServices';

config.rawError = true;

@Module({
  name: 'todos',
  stateFactory: true,
  namespaced: true
})
export default class ToDosModule extends VuexModule {
  todos: IToDo[] = [];

  get notDoneTodos(): IToDo[] {
    return this.todos.filter(todo => !todo.done);
  }

  @Mutation
  setTodos (todos: IToDo[]): void {
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
    const oldTodos = [...this.todos];
    const index = oldTodos.findIndex(todo => todo.id === newTodo.id);
    if (index < 0) {
      return;
    }
    oldTodos[index] = newTodo;
    this.todos = oldTodos;
    if (updateCache) {
      $services[ServiceTokens.CacheService].saveTodos(this.todos);
    }
  }

  @Action
  makeTodoDone (todo: IToDo): void {
    const updatedTodo = JSON.parse(JSON.stringify(todo));
    updatedTodo.done = true;
    this.updateTodo(updatedTodo);
  }

  @Action
  loadTodos (): void {
    const todos = $services[ServiceTokens.CacheService].getTodos();
    this.setTodos(todos);
  }
}
