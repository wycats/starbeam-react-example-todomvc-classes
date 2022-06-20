import './App.css';
import '@modules/todomvc-app-css/index.css';
import { useStarbeam, ReactiveElement } from '@starbeam/react';
import { FormEvent, ReactElement } from 'react';
import classNames from 'classnames';
import { formData } from '../utils';
import { active, all, completed, Router } from '../router';
import { Todo } from '../components/Todo';
import { Todos } from '../models/todos';

function App() {
  return useStarbeam((component: ReactiveElement) => {
    const handler = component.use(Router);

    const todos = new Todos();
    const taste = todos.add('Taste Javascript');
    taste.completed = true;
    todos.add('Buy unicorn');

    function addTodo(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const { label } = formData<{ label: string }>(event.currentTarget);
      todos.add(label);
      event.currentTarget.reset();
    }

    function currentTodos() {
      return handler.current(todos.all);
    }

    function count() {
      const total = todos.all.length;
      const activeCount = active(todos.all).length;

      if (total === activeCount) {
        return `${total} active`;
      } else {
        return `${activeCount} active / ${total} total`;
      }
    }

    function Main() {
      return useStarbeam(() => () => {
        if (todos.all.length === 0) {
          return null;
        }

        return (
          <section className="main">
            <input
              onInput={(e) =>
                todos.forEach(
                  (todo) => (todo.completed = e.currentTarget.checked)
                )
              }
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {currentTodos().map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  destroy={() => todos.destroy(todo.id)}
                />
              ))}
            </ul>
          </section>
        );
      });
    }

    function Footer() {
      return useStarbeam(() => () => {
        if (todos.all.length === 0) {
          return null;
        }

        return (
          <footer className="footer">
            <span className="todo-count">
              <strong>{count()}</strong>
            </span>
            <ul className="filters">
              <li>
                <a
                  className={classNames({
                    selected: handler.current === all,
                  })}
                  href="#/"
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  className={classNames({
                    selected: handler.current === active,
                  })}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={classNames({
                    selected: handler.current === completed,
                  })}
                >
                  Completed
                </a>
              </li>
            </ul>
            {!todos.has((todo) => todo.completed) ? null : (
              <button
                className="clear-completed"
                onClick={() => todos.clear((todo) => todo.completed)}
              >
                Clear completed
              </button>
            )}
          </footer>
        );
      });
    }

    return (): ReactElement => (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <form onSubmit={addTodo}>
              <input
                className="new-todo"
                name="label"
                placeholder="What needs to be done?"
                autoFocus
              />
            </form>
          </header>
          <Main />
          <Footer />
        </section>
        <footer className="info">
          <p>Click to edit a todo</p>
          <p>
            Created by <a href="http://www.yehudakatz.com">Yehuda Katz</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </>
    );
  });
}

export default App;
