export enum TodoStatus {
  WAITING = 'WAITING',
  COMPLETE = 'COMPLETE',
}

export interface Todo {
  name: string;
  id: string;
  status: TodoStatus;
}

export type NewTodo = Omit<Todo, 'id' | 'status'>;

export interface TodoActions {
  onRemove(id: string): void;
  onEdit(id: string): void;
  onCheck(id: string): void;
}
