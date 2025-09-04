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
    <div className="flex flex-col items-center justify-center text-center">
      <label htmlFor={name}>{label}</label>
      <input
        className="text-center border"
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
