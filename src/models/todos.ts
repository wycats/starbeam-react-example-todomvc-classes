import { reactive } from '../vendor/starbeam-react.js';

interface Todo {
  id: string;
  label: string;
  completed: boolean;
}

export class Todos {
  #id = 0;
  #todos: Map<string, Todo> = reactive.Map();

  add(label: string): Todo {
    const todo = reactive.object({
      id: String(this.#id++),
      label,
      completed: false,
    });

    this.#todos.set(todo.id, todo);

    return todo;
  }

  get all(): Todo[] {
    return [...this.#todos.values()].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );
  }

  forEach(perform: (todo: Todo) => void): void {
    for (const todo of this.#todos.values()) {
      perform(todo);
    }
  }

  filter(filter: (todo: Todo) => boolean): Todo[] {
    return this.all.filter(filter);
  }

  has(filter: (todo: Todo) => boolean): boolean {
    return this.all.some(filter);
  }

  destroy(id: string): void {
    this.#todos.delete(id);
  }

  clear(filter: (todo: Todo) => boolean): void {
    for (const [id, todo] of this.#todos) {
      if (filter(todo)) {
        this.#todos.delete(id);
      }
    }
  }
}
