import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toggleStatus } from '../helpers/toggleStatus';
import { type NewTodo, type Todo, TodoStatus } from '../types';

export const useTodoList = () => {
  const [items, setItems] = React.useState<Todo[]>(() => {
    // Initialize items from localStorage if available
    const savedItems = localStorage.getItem('@todos-state');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('@todos-state', JSON.stringify(items));
  }, [items]);

  // I could've just used the same interface with optional id, but I used a more complex approach. Why? Because I can.
  const todoExists = (item: NewTodo | Todo): item is Todo => {
    return (item as Todo).id !== undefined;
  };

  const save = (item: NewTodo | Todo) => {
    if (todoExists(item)) {
      setItems((prevState) => prevState.map((storedItem) => (storedItem.id === item.id ? item : storedItem)));
    } else {
      setItems((prevState) => [
        ...prevState,
        {
          ...item,
          id: uuidv4(),
          status: TodoStatus.WAITING,
        },
      ]);
    }
  };
  const remove = (id: Todo['id']) => setItems((prevState) => prevState.filter((item) => item.id !== id));

  const removeComplete = (ids: Todo['id'][]) => {
    if (ids.length > 0) {
      setItems((prevState) => prevState.filter(({ id }) => !ids.includes(id)));
    }
  };

  const complete = (id: Todo['id']) => {
    setItems((prevState) =>
      prevState.map((storedItem) =>
        storedItem.id === id ? { ...storedItem, status: toggleStatus(storedItem.status) } : storedItem
      )
    );
  };

  return {
    save,
    remove,
    items,
    complete,
    removeComplete,
  };
};
