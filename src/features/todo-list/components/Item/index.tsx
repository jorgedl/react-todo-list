import EditIcon from '@/assets/icons/edit.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';
import { Button } from '@/components/Button/';
import classNames from 'classnames';
import { type Todo, type TodoActions, TodoStatus } from '../../types';

import './styles.css';

interface Props extends Todo, TodoActions {}

export const Item: React.FC<Props> = ({ id, name, status, onRemove, onEdit, onCheck }) => (
  <div key={id} className="task">
    <label className="task__label">
      <input type="checkbox" onChange={() => onCheck(id)} defaultChecked={status === TodoStatus.COMPLETE} />
      <span
        className={classNames('task__name', {
          'task__name--complete': status === TodoStatus.COMPLETE,
        })}
      >
        {name}
      </span>
    </label>
    <div className="task__actions">
      <Button aria-label="Edit Task" onClick={() => onEdit(id)} size="small">
        <EditIcon />
      </Button>
      <Button aria-label="Remove Task" className="task__remove" onClick={() => onRemove(id)} size="small">
        <TrashIcon />
      </Button>
    </div>
  </div>
);
