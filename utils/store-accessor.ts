import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import todos from '~/store/todos';

let todosStore: todos;

function initialiseStores(store: Store<any>): void {
  todosStore = getModule(todos, store);
}

export {
  initialiseStores,
  todosStore
};
