import type { Size } from '@/types/Size';
import classNames from 'classnames';
import './styles.css';

export const Button: React.FC<{
  onClick(): void;
  id?: string;
  children: string | React.ReactNode;
  disabled?: boolean;
  size?: Size;
  className?: string;
  'aria-label'?: string;
}> = ({ id, onClick, children, className: classNameProp, disabled, size = 'medium', ...props }) => {
  const className = classNames(
    'button',
    {
      'button--large': size === 'large',
      'button--medium': size === 'medium',
      'button--small': size === 'small',
    },
    classNameProp
  );

  return (
    <button
      id={id}
      className={className}
      type="button"
      onClick={onClick}
      onKeyDown={({ key }) => key === 'Enter' && onClick()}
      disabled={disabled}
      aria-label={props['aria-label']}
    >
      {children}
    </button>
  );
};
