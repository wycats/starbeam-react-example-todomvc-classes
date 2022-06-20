import { Cell, Resource } from './vendor/starbeam-react';
import RouteRecognizer from 'route-recognizer';

export interface TodoItem {
  id: string;
  label: string;
  completed: boolean;
}

export type Handler = (todos: TodoItem[]) => TodoItem[];

export function all(todos: TodoItem[]) {
  return todos;
}

export function active(todos: TodoItem[]) {
  return todos.filter((todo) => todo.completed === false);
}

export function completed(people: TodoItem[]) {
  return people.filter((todo) => todo.completed === true);
}

const router = new RouteRecognizer();

router.add([{ path: '/', handler: all }]);
router.add([{ path: '/active', handler: active }]);
router.add([{ path: '/completed', handler: completed }]);

export const Router = Resource((resource) => {
  const controller = new AbortController();
  const currentHandler: Cell<Handler> = Cell(all);

  resource.on.cleanup(() => controller.abort());

  window.addEventListener('hashchange', (e) => {
    const path = location.hash.slice(1);
    const results = router.recognize(path);

    const first = results?.[0]?.handler as Handler | undefined;

    currentHandler.set(first ?? all);
  });

  return () => currentHandler.current;
});
