import classNames from 'classnames';
import { FormEvent } from 'react';
import { TodoItem } from '../router';
import { formData } from '../utils';
import { Cell, useStarbeam } from '../vendor/starbeam-react';

export function Todo({
  todo,
  destroy,
}: {
  todo: TodoItem;
  destroy: () => void;
}) {
  return useStarbeam(() => {
    const editing = Cell(false);

    function updateText(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const { label } = formData<{ label: string }>(event.currentTarget);
      todo.label = label;
      editing.set(false);
    }

    function updateComplete(event: FormEvent<HTMLInputElement>) {
      todo.completed = event.currentTarget.checked;
    }

    return () => (
      <li
        className={classNames({
          completed: todo.completed,
          editing: editing.current,
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={updateComplete}
          />
          <label>
            <button onClick={() => editing.update((e) => !e)}>
              {todo.label}
            </button>
          </label>
          <button onClick={destroy} className="destroy" />
        </div>
        <form key={String(editing.current)} onSubmit={updateText}>
          <input className="edit" name="label" defaultValue={todo.label} />
        </form>
      </li>
    );
  });
}
