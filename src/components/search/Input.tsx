interface Props {
  label?: string;
  value: string;
  name: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const Input = ({ label, value, name, className, placeholder, required, error, onChange, onBlur }: Props) => {
  return (
    <div className="text-center w-full py-1">
      <label className="text-md" htmlFor={name}>{label}</label>
      <input
        className={className}
        value={value}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && <p>{error}</p>}
    </div>
  );
};
