import { TodoStatus } from '../types';

export const toggleStatus = (status: TodoStatus) =>
  status === TodoStatus.WAITING ? TodoStatus.COMPLETE : TodoStatus.WAITING;
