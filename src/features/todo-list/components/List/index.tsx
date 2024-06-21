import classNames from 'classnames';
import type { Todo, TodoActions } from '../../types';
import { Item } from '../Item/';

import './styles.css';

interface Props extends TodoActions {
  items: Todo[];
}

export const List: React.FC<Props> = ({ items, ...props }) => {
  const isEmpty = items.length === 0;
  return (
    <div
      className={classNames('todo-list', {
        'todo-list--empty': isEmpty,
      })}
    >
      {!isEmpty && items.map((item) => <Item key={item.id} {...item} {...props} />)}
      {isEmpty && 'No tasks yet.'}
    </div>
  );
};
