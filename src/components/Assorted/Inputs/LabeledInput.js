import { DetailedInput } from "./DetailedInput"

export const LabeledInput = ({
  className="",
  id,
  index=0,
  label,
  onChange,
  placeholder="",
  type="text",
  value="",
  ...otherAttributes
}) => {
  return (
    <section className={`LabeledInput ${className}`} index={index}>
      <label htmlFor={id}>{label}</label>
      <DetailedInput 
        {...otherAttributes}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </section>
  )
}