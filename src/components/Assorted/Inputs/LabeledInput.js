import { DetailedInput } from "./DetailedInput"

export const LabeledInput = ({
  className,
  id,
  label,
  onChange,
  placeholder="",
  type="text",
  value,
  ...otherAttributes
}) => {
  return (
    <section className={`LabeledInput ${className}`}>
      <label htmlFor={id}>{label}</label>
      <DetailedInput 
        {...otherAttributes}
        id="painDegree"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </section>
  )
}