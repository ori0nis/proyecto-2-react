interface Props {
  label?: string;
  value: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const Input = ({ label, value, name, placeholder, required, error, onChange, onBlur }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
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
