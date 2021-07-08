import { IToDo } from '~/types/IToDo';
import { TODO_CACHE_KEY } from '~/constants/config';

export interface ICacheService {
  getTodos(): Promise<IToDo[]>;
  saveTodos(todos: IToDo[]): void;
}

export class CacheService implements ICacheService {
  public async getTodos(): Promise<IToDo[]> {
    const todos = await new Promise((resolve) => {
      resolve(localStorage.getItem(TODO_CACHE_KEY));
    });
    if (!todos) {
      return [];
    }
    return JSON.parse(<string>todos);
  }

  public saveTodos(todos: IToDo[]): void {
    localStorage.setItem(TODO_CACHE_KEY, JSON.stringify(todos));
  }
}
