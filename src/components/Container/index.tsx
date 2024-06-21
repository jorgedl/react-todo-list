import classNames from 'classnames';
import './styles.css';

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={classNames('container container--small', className)}>{children}</div>
);
