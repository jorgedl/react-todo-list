import { forwardRef } from 'react';
import './styles.css';

interface Props {
  name: string;
  label: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  value?: string;
  defaultValue?: string;
  onKeyDown?(e: React.KeyboardEvent<HTMLInputElement>): void;
  ref?: React.RefObject<HTMLInputElement>;
}

const InputComponent: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label, onChange, value = '', defaultValue, onKeyDown },
  ref
) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__field"
        ref={ref}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        type="text"
        id={name}
        placeholder={label}
        required
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export const Input = forwardRef(InputComponent);
