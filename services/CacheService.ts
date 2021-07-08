import { IToDo } from '~/types/IToDo';
import { TODO_CACHE_KEY } from '~/constants/config';

export interface ICacheService {
  getTodos(): IToDo[];
  saveTodos(todos: IToDo[]): void;
}

export class CacheService implements ICacheService {
  public getTodos(): IToDo[] {
    const todos = localStorage.getItem(TODO_CACHE_KEY);
    if (!todos) {
      return [];
    }
    return JSON.parse(todos);
  }

  public saveTodos(todos: IToDo[]): void {
    localStorage.setItem(TODO_CACHE_KEY, JSON.stringify(todos));
  }
}
