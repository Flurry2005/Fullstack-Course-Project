interface InputFieldProps {
  value?: string;
  id?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: any) => void;
  onKeyDown?: string;
  onKeyDownFunc?: () => void;
  additionalClasses?: string;
  placeholder: string;
}

function InputField({
  value,
  id,
  type,
  required,
  onChange,
  onKeyDown,
  onKeyDownFunc,
  additionalClasses,
  placeholder,
}: InputFieldProps) {
  return (
    <input
      id={id}
      value={value}
      type={type}
      onChange={onChange}
      onKeyDown={async (e) => {
        if (e.key === onKeyDown && onKeyDownFunc) {
          onKeyDownFunc();
        }
      }}
      required={required}
      placeholder={placeholder}
      className={
        "px-3 border border-(--accent-color) rounded-xl outline-none " +
        additionalClasses
      }
    />
  );
}

export default InputField;
