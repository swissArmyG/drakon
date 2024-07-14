export const Input = ({
  autoCompletion=false,
  containerClassName="",
  inputClassName="",
  id,
  label,
  onChange,
  placeholder="",
  subLabel,
  type="text",
  value="",
  width="49%",
  ...otherAttributes
}) => {
  return <section 
    className={`Input ${containerClassName}`}
    style={{
      width: width
    }}>
    {
      label && 
      <p>
        <em>{label}</em>
        <span>{subLabel}</span>
      </p>
    }
    <input
      {...otherAttributes}
      autoComplete={autoCompletion ? "on" : "off"} 
      type={type}
      id={id}
      placeholder={placeholder}
      className={inputClassName}
      value={value}
      onChange={({ target: { value }}) => onChange(value)}
    />
  </section>
}