import React from 'react';

import { Button } from '@/components/Button/';
import { Container } from '@/components/Container/';
import { Input } from '@/components/Input/';

import { useTodoList } from '../../hooks/useTodoList';
import { type NewTodo, type Todo, type TodoActions, TodoStatus } from '../../types';
import { List } from '../List/';

import './styles.css';

export const TodoList: React.FC = () => {
  const [values, setValues] = React.useState<NewTodo | Todo | null>(null);

  const { items, save, remove, complete, removeComplete } = useTodoList();

  const completeTasks = React.useMemo(
    () => items.filter((item) => item.status === TodoStatus.COMPLETE).map(({ id }) => id),
    [items]
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onSave = () => {
    if (values) {
      save(values);
      setValues(null);
      inputRef?.current?.focus();
    }
  };

  const onEdit: TodoActions['onEdit'] = (id) => {
    const editingItem = items.find((item) => item.id === id);
    editingItem && setValues(editingItem);
    inputRef?.current?.focus();
  };

  const onRemove: TodoActions['onRemove'] = (id) => {
    if ((values as Todo)?.id === id) {
      setValues(null);
    }
    remove(id);
    inputRef?.current?.focus();
  };

  const onCheck: TodoActions['onCheck'] = (id) => {
    complete(id);
    inputRef?.current?.focus();
  };

  return (
    <Container className="todo">
      <h1 className="todo__title">Todo List</h1>
      <div>
        <Input
          ref={inputRef}
          name="taskName"
          label="Task Name"
          value={values?.name}
          onChange={({ target: { value } }) => setValues((prevState) => ({ ...prevState, name: value }))}
          onKeyDown={({ key }) => key === 'Enter' && onSave()}
        />
      </div>
      <div>
        <List items={items} onRemove={onRemove} onCheck={onCheck} onEdit={onEdit} />
      </div>
      <div className="todo__actions">
        <Button onClick={onSave} disabled={!values?.name}>
          {(values as Todo)?.id === undefined && 'Add Task'}
          {(values as Todo)?.id !== undefined && 'Save Task'}
        </Button>
        <Button
          className="todo__complete"
          onClick={() => removeComplete(completeTasks)}
          disabled={completeTasks.length === 0}
        >
          Remove all complete tasks
        </Button>
        {(values as Todo)?.id !== undefined && <Button onClick={() => setValues(null)}>Cancel edition</Button>}
      </div>
    </Container>
  );
};
