import './Input.scss';

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
}) {
  return (
    <section className='input'>
      <label htmlFor={name} className='input__label'>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`input__field ${customClass ? customClass : ''}`}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ''}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
